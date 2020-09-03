const encode = c => {
    let encodedChar = (c.charCodeAt()).toString(2)
    const str = new Array(8-encodedChar.length + 1).join('0')
    return str + encodedChar
}
const decode = bin => {
    return String.fromCharCode(parseInt(bin, 2))
}
