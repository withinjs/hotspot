
const flatten = arr => {
    return arr.reduce(function (prev, item) {
        return prev.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
}

module.exports = {
    flatten
}