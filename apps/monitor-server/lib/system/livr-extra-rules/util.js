module.exports = {
    isPrimitiveValue(value) {
        if (typeof value === 'string') return true;
        if (typeof value === 'number' && isFinite(value)) return true;
        if (typeof value === 'boolean') return true;
        return false;
    },

    isNoValue(value) {
        return value === undefined || value === null || value === '';
    },
};
