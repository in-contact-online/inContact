import moment from 'moment';
import ChartJsImage from 'chartjs-to-image';

const COLORS_GRADIENT = [
    'rgb(255,250,0)','rgb(255,210,0)','rgb(255,180,0)','rgb(255,150,0)','rgb(255,120,0)','rgb(255,90,0)',
    'rgb(255,30,0)','rgb(235,0,0)','rgb(205,0,0)','rgb(175,0,0)','rgb(155,0,0)','rgb(125,0,0)',
];

function getColorByValue(value = 0) {
    if (COLORS_GRADIENT[value]) return COLORS_GRADIENT[value];
    if (value > COLORS_GRADIENT.length - 1) return COLORS_GRADIENT[COLORS_GRADIENT.length - 1];
    return COLORS_GRADIENT[0];
}

export class DailyPolarChart {
    /**
     * @typedef {Class} TimeLine
     * @method handleStatus
     */

    #labels = [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00',
    ]

    #data = [];

    #user = null;

    /**
     * @param {String} user - user phone number
     * @param {Object} data - report data
     */
    constructor(user, data) {
        this.#user = user;
        this.#data = data;
    }

    /**
     * @method
     * @param {Array<Object>} dataset - barchart dataset
     * @returns {Object}
     */
    #config(dataset) {
        return {
            type: 'polarArea',
            data: {
                labels: this.#labels,
                datasets: dataset
            },
            options: {
                legend: {
                    display: false,
                },
                scale: {
                    display: true,
                    angleLines: {
                        display: true,
                    },
                    pointLabels: {
                        display: true,
                    },
                    ticks: {
                        min: 0,
                        max: 60
                    }
                },
                title: {
                    display: true,
                    text: this.#user
                }
            },
        }
    }

    /**
     * @method
     * @returns {Object}
     */
    #prepareReportData() {
        const labels = Object.keys(this.#data).map(date => moment(date).format('HH:mm'));
        const values = Object.values(this.#data);

        return this.#labels.reduce((memo, hour) => {
            const index = labels.indexOf(hour);
            if (index !== -1) {
                memo.data.push(values[index] * 5); // check every 5 min. value in minutes
            } else {
                memo.data.push(0);
            }
            memo.backgroundColor.push(getColorByValue(values[index])); // check every 5 min. value in minutes
            return memo;
        }, { data: [], backgroundColor: [] });
    }

    /**
     * @method
     * @returns {Promise<String>}
     */
    async data() {
        const myChart = new ChartJsImage();
        const config = this.#config([this.#prepareReportData()]);

        console.log(config);

        myChart.setConfig(config)
        myChart.setWidth(500).setHeight(300).setBackgroundColor('transparent');
        return myChart.toDataUrl();
    }
}
