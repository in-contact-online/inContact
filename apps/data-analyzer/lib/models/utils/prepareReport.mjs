import { DailyBarChart } from './DailyBarChart.mjs';
// import { DailyPolarChart } from './DailyPolarChart.mjs';

/**
 * @param {Object} report
 * @return {Promise<Object>}
 */
export async function prepareReport(report) {
    const attachments = [];
    const htmls = [];
    for (const user in report) {
        const base64BarImg = await new DailyBarChart(user, report[user]).data();
        // const base64PolarImg = await new DailyPolarChart(user, report[user]).data();
        attachments.push({
            path: base64BarImg,
            cid: `bar_report_cid_${user}`, //same cid value as in the html img src
        });
        // attachments.push({
        //     path: base64PolarImg,
        //     cid: `polar_report_cid_${user}` //same cid value as in the html img src
        // });
        htmls.push(`<img src="cid:bar_report_cid_${user}" />`);
        // htmls.push(`<img src="cid:polar_report_cid_${user}" />`);
    }

    return {
        html: `<span>${htmls.join('')}</span>`,
        attachments,
    };
}

export function trimPhone(phone = '') {
    return phone.replace('+', '');
}
