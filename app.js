
const crypto = require('crypto')

const charToBinary = c => {
    let encodedChar = (c.charCodeAt()).toString(2)
    const str = new Array(8-encodedChar.length + 1).join('0')
    return str + encodedChar
}
const binaryToChar = bin => {
    return String.fromCharCode(parseInt(bin, 2))
}

const getIv = _ => crypto.randomBytes(16)
const getIvFromBase64 = b64 => Buffer.from(b64, 'base64')
const getRandomKey = _ => crypto.randomBytes(32).toString('base64')
const getBase64 = iv => iv.toString('base64')


// //const buff = Buffer.from(s)
// console.log(iv)
// const secret_message = "this is a secret message"
// let key = '1234567812345678123456781234567g'
// let cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
// let encrypted = cipher.update(secret_message, 'utf-8', 'hex')
// encrypted += cipher.final('hex')
// const b64 = iv.slice(0,iv.length).toString('base64')
// console.log(b64)
// const buff = Buffer.from(b64, 'base64')
// console.log(buff)
// console.log('encrypted: ' + encrypted)

// let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
// let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
// decrypted += decipher.final('utf-8');

// console.log('decrypted: ' + decrypted)