const crypto = require("crypto")
const Jimp = require('jimp')
const charToBinary = (c) => {
    let encodedChar = c.charCodeAt().toString(2)
    const str = new Array(8 - encodedChar.length + 1).join("0")
    return str + encodedChar
}
const binaryToChar = (bin) => {
    return String.fromCharCode(parseInt(bin, 2))
}
const convertBinaryToString = bin => {
    let str = ''
    for(let i = 0; i < bin.length; i+=8) {
        str += binaryToChar(bin.substring(i, i + 8))
    }
    return str
}
const convertStringToBinary = str => {
    let binaryString = ''
    for(let c in str) {
        binaryString += charToBinary(str[c])
    }
    return binaryString
}
const get16ByteIv = (_) => crypto.randomBytes(16)
const getIvFromBase64 = (b64) => Buffer.from(b64, "base64")
const getRandom32ByteKey = (_) => crypto.randomBytes(24).toString('base64')
const getBase64 = (buffer) => buffer.toString("base64")

const encrypt = (message, key, iv) => {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    let encrypted = cipher.update(message, "utf-8", "hex")
    encrypted += cipher.final("hex")
    encrypted = `${getBase64(iv)}.${encrypted}`
    return encrypted
}
const decrypt = (encryptedMessage, key) => {
    const [iv, message] = encryptedMessage.split('.')
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, getIvFromBase64(iv))
    let decrypted = decipher.update(message, 'hex', 'utf-8')
    decrypted += decipher.final('utf-8')
    return decrypted
}

const getStringLenInBinary = str => new Array(32 - str.length.toString(2).length + 1).join("0") + str.length.toString(2)
const getImage = (imagePath, cb) => {
    Jimp.read(imagePath, (err, image) => {
        if (err) throw err
        else return cb(image)
    })
}
const LSBDataToImage = (message) => {


}



        //     let newBuff = []
        //     let count = 0
        //     let newColor = ""
        //     for (let hex of image.bitmap.data) {
        //         if (count < 1008 * 400) {
        //             if(count % 4 === 0 || count % 4 === 3) {
        //                 newBuff.push(255)
        //             }
        //             else {
        //                 newBuff.push(0)
        //             }
        //         } else {
        //             newBuff.push(hex)
        //         }
        //         count++
        //     }
        //     const buffer = Buffer.from(newBuff)
        //     image.bitmap.data = buffer
        //     return image.write('./steg-images/as-dgd.PNG')
//Example
// const key = getRandom32ByteKey()
// const iv = get16ByteIv()
// const message = 'Hello beautiful'
// const encryptedMessage = encrypt(message, key, iv)
// console.log(encryptedMessage)
// console.log(decrypt(encryptedMessage, key))