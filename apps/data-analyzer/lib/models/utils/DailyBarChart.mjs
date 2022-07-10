import moment from 'moment';
import ChartJsImage from 'chartjs-to-image';
import randomColor from 'randomcolor';
import { secsToMin } from './timeUtils.mjs';

export class DailyBarChart {
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
            type: 'bar',
            data: {
                labels: this.#labels,
                datasets: dataset
            },
            options: {
                responsive: true,
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: `${moment().format('YYYY-MM-DD')} (UTC+0)`,
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Время активности, мин'
                        },
                        ticks: {
                            beginAtZero: true,
                            steps: 10,
                            stepValue: 5,
                            max: 60
                        }
                    }]
                },
                title: {
                    display: true,
                    text: `Статистика активности пользователя ${this.#user}`
                }
            }
        }
    }

    /**
     * @method
     * @returns {Array<Object>}
     */
    #prepareReportData() {
        const labels = Object.keys(this.#data).map(date => moment(date).format('HH:mm'));
        const values = Object.values(this.#data);
        return this.#labels.map(hour => {
            const index = labels.indexOf(hour);
            if (index !== -1) {
                return secsToMin(values[index]);
            }
            return 0;
        });
    }

    /**
     * @method
     * @returns {Promise<String>}
     */
    async data() {
        const myChart = new ChartJsImage();
        const config = this.#config([{
            data: this.#prepareReportData(),
            backgroundColor: randomColor()
        }]);

        myChart.setConfig(config)
        myChart.setWidth(500).setHeight(300).setBackgroundColor('transparent');
        return myChart.toDataUrl();
    }
}
