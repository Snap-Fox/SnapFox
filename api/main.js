var snapfox = {};

snapfox.version = {};

snapfox.version.get = function () {
    if (typeof SnapVersion !== 'undefined') {
        let version = SnapVersion.split('.');
        return [version[0], version[1]].join('.');
    }
    else {
        return false;
    };
};
