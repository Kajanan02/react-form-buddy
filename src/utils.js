export function isEmpty(obj) {
    if (!obj) return true;
    for (let prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

export function isFunction(functionToCheck) {
    return (
        functionToCheck &&
        {}.toString.call(functionToCheck) === '[object Function]'
    );
}
