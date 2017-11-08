const digitsRE = /(\d{3})(?=\d)/g

export function currency(value, currency, decimals) {
    value = parseFloat(value)
    if (!isFinite(value) || (!value && value !== 0)) return ''
    currency = currency != null ? currency : '$'
    decimals = decimals != null ? decimals : 2
    var stringified = Math.abs(value).toFixed(decimals)
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
    var i = _int.length % 3
    var head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) : ''
    var _float = decimals ? stringified.slice(-1 - decimals) : ''
    var sign = value < 0 ? '-' : ''
    return sign + currency + head +
        _int.slice(i).replace(digitsRE, '$1,') +
        _float
}

export function getPreMonth(date) {
    const arr = date.split('-');
    const year = arr[0]; //获取当前日期的年份  
    const month = arr[1]; //获取当前日期的月份  
    const day = arr[2]; //获取当前日期的日  
    let days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数  
    let year2 = year;
    let month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    let day2 = day;
    let days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    const t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}

export function getNextMonth(date) {
    const arr = date.split('-');
    const year = arr[0]; //获取当前日期的年份  
    const month = arr[1]; //获取当前日期的月份  
    const day = arr[2]; //获取当前日期的日  
    let days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    const t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}