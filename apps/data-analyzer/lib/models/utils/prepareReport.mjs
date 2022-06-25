import { DailyBarChart } from './DailyBarChart.mjs';

// {
//     "380951465591": {
//         "2022-06-18 10:00:00": 10,
//         "2022-06-18 11:00:00": 2,
//         "2022-06-18 12:00:00": 1,
//         "2022-06-18 13:00:00": 4,
// }
// }
/**
 * @param {Object} report
 * @return {Promise<Object>}
 */
export async function prepareReport(report) {
    const attachments = [];
    const htmls = [];
    for (const user in report) {
        const base64Img = await new DailyBarChart(user, report[user]).data();
        attachments.push({
            path: base64Img,
            cid: `report_cid_${user}` //same cid value as in the html img src
        });
        htmls.push(`<img src="cid:report_cid_${user}" />`);
    }

    return {
        html: `<span>${htmls.join('')}</span>`,
        attachments,
    }
}

export function trimPhone(phone = '') {
    return phone.replace('+', '');
}
