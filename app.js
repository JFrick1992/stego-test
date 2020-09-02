const encode = c => {
    let encodedChar = (c.charCodeAt()).toString(2)
    const str = new Array(8-encodedChar.length + 1).join('0')
    return str + encodedChar
}

for(let i = 0; i < 256; i++) {
    console.log('Char Code ' + encode(String.fromCharCode(i)))
}