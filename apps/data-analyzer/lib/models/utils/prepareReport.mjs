import moment from 'moment';
import ChartJsImage from 'chartjs-to-image';

//todo: totally refactor file

// todo: write a function
const DAILY_HOURS = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00',
];

// todo: expose colors
const COLORS = ['red', 'blue', 'green', 'brown', 'cyan', 'grey'];

function getColor() {
    let index = 0;
    return () => {
        const color = COLORS[index];
        index += 1;
        return color || 'black';
    }
}

/*
* {
*   "380951465591": {
*       "2022-06-18 10:00:00": 10,
*       "2022-06-18 11:00:00": 2,
*       "2022-06-18 12:00:00": 1,
*       "2022-06-18 13:00:00": 4,
*   }
* }
* */

/**
 * @param {Object} report
 * @return {Promise<Object>}
 */
export async function prepareReport(report) {
    const base64Image = await chartToBase64(report);
    return {
        html: `<img src="cid:report_cid" />`,
        attachments: [{
            path: base64Image,
            cid: 'report_cid' //same cid value as in the html img src
        }]
    }
}

function getData(userData) {
    const labels = Object.keys(userData).map(date => moment(date).format('HH:mm'));
    const values = Object.values(userData);
    return DAILY_HOURS.map(hour => {
        const index = labels.indexOf(hour);
        if (index !== -1) return Math.round((values[index] / 12) * 100); // check every 5 min. value in perecents of hour
        return 0;
    });

}

/**
 * @param {Object} report
 * @return {Promise<String>}
 */
async function chartToBase64(report) {
    const color = getColor();
    const datasets = [];
    const users = Object.keys(report);
    for (const user of users) {
        datasets.push({
            data: getData(report[user]),
            label: user,
            backgroundColor: color()
        })
    }

    const myChart = new ChartJsImage();

    const barChartConfig = {
        type: 'bar',
        data: {
            labels: DAILY_HOURS,
            datasets
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
            hover: {
                mode: 'label'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: moment().format('YYYY-MM-DD')
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        steps: 10,
                        stepValue: 5,
                        max: 100
                    }
                }]
            },
            title: {
                display: true,
                text: 'User Activity Report'
            }
        }
    };

    myChart.setConfig(barChartConfig)

    myChart.setWidth(500).setHeight(300).setBackgroundColor('transparent');

    return myChart.toDataUrl();
}
