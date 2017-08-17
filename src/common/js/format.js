export function formatDateFn (time, format) {
    let dateObj = new Date(time);

    let o = {
        'yyyy': dateObj.getFullYear(),
        'MM': dateObj.getMonth() + 1,
        'dd': dateObj.getDate(),
        'hh': dateObj.getHours(),
        'mm': dateObj.getMinutes()
    };

    for (let k in o) {
        format = format.replace(new RegExp(k), (o[k]) < 10 ? '0' + o[k] : o[k]);
    }

    return format;
}
