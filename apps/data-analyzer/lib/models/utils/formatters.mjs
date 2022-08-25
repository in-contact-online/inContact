import moment from 'moment';

/**
 * @function
 * @param {String[]} activitiesList - list of start and stop talk timestamps
 * @return {Object}
 */
export function getActivityPeriodsMap(activitiesList) {
    const result = {};
    for (let i = 0; i < activitiesList.length; i += 1) {
        if (i % 2 !== 0) {
            const hash = activityHash([activitiesList[i - 1], activitiesList[i]]);
            result[hash] = hash;
        }
    }
    return result;
}

/**
 * @function
 * @param {String[]} activityPeriod - start and stop talk timestamps
 * @return {String}
 */
function activityHash(activityPeriod) {
    //
    const start = moment(activityPeriod[0]).startOf('minute').format('YYYY-MM-DD HH:mm:ss');
    const stop = moment(activityPeriod[1]).startOf('minute').format('YYYY-MM-DD HH:mm:ss');

    return `${start}/${stop}`;
}

/**
 * @function
 * @param {Object} one - activities map
 * @param {Object} two - activities map
 * @return {String[]|null}
 */
function compareMaps(one, two) {
    const result = [];
    for (const key in one) {
        if (two[key]) result.push(key);
    }
    if (result.length) {
        return result;
    }
    return null;
}

/**
 * @function
 * @param {Object} usersMap - users activities map
 * @return {String[]}
 */
export function defineInContact(usersMap) {
    const users = Object.keys(usersMap);
    const result = [];

    if (users.length < 2) return result;

    for (let i = 1; i < users.length; i += 1) {
        for (let j = i; j < users.length; j += 1) {
            const communicated = compareMaps(usersMap[users[i - 1]], usersMap[users[j]]);
            if (communicated) {
                result.push({
                    userOne: users[i - 1],
                    userTwo: users[j],
                    communicated,
                });
            }
        }
    }
    return result;
}
