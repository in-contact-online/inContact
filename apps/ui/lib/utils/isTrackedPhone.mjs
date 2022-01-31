export function isTrackedPhone(phone, trackedPhones, allPhones) {
    if (trackedPhones.includes(phone)) return 'TRACKED';
    else if (allPhones.includes(phone)) return 'NOT_TRACKED';
    return 'NOT_IN_DB';
}
