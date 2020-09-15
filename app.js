//requires
const crypto = require("crypto")
const Jimp = require('jimp')

//Converts a single character to an 8-bit binary code
const charToBinary = (c) => {
    let encodedChar = c.charCodeAt().toString(2)
    return new Array(8 - encodedChar.length + 1).join("0") + encodedChar
}

//Converts 8-bit binary code to a single character
const binaryToChar = (bin) => String.fromCharCode(parseInt(bin, 2))

//Converts a binary string, thats length%8===0, to a string  
const convertBinaryToString = bin => {
    let str = ''
    for (let i = 0; i < bin.length; i += 8) {
        str += binaryToChar(bin.substring(i, i + 8))
    }
    return str
}
//Loops over a string and converts it to binary, and returns binary string
const convertStringToBinary = str => {
    let binaryString = ''
    for (let c in str) {
        binaryString += charToBinary(str[c])
    }
    return binaryString
}

//Gets a random 16 Byte IV for encryption
const get16ByteIv = (_) => crypto.randomBytes(16)

//Converts a base64 string to an IV, used to reverse IV stored on encrypted message
const getIvFromBase64 = (b64) => Buffer.from(b64, "base64")

//Returns a random base64 string thats 32 bytes long, alternate to using hashed password
const getRandom32ByteKey = (_) => crypto.randomBytes(24).toString('base64')

//Converts buffer to base64 string
const getBase64 = (buffer) => buffer.toString("base64")

//Takes in message, a key, and iv (key and iv should be as random as possible) and uses aes-256-cbc encryption algorithm to encrypt message
const encrypt = (message, key, iv) => {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    let encrypted = cipher.update(message, "utf-8", "hex")
    encrypted += cipher.final("hex")
    encrypted = `${getBase64(iv)}.${encrypted}`
    return encrypted
}

//Takes in the encrypted message and the key, and decrypts the message, using aes-256-cbc encryption algorithm
const decrypt = (encryptedMessage, key) => {
    const [iv, message] = encryptedMessage.split('.')
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, getIvFromBase64(iv))
    let decrypted = decipher.update(message, 'hex', 'utf-8')
    decrypted += decipher.final('utf-8')
    return decrypted
}

//Gets length of string and converts to binary string 32-bits in length
const getStringLenInBinary = str => new Array(32 - str.length.toString(2).length + 1).join("0") + str.length.toString(2)


const getImage = (imagePath, cb) => {

}
const encodeMessageLength = (buffer, message) => {
    const length = getStringLenInBinary(message)
    for (let i = 0, j = 0; i < 16; i++, j += 2) {
        let hex = buffer[i].toString(2)
        hex = new Array(8 - hex.length + 1).join("0") + hex
        buffer[i] = parseInt((hex.substring(0, 6) + length.substring(j, j + 2)), 2)
    }
    return buffer
}
const LSBDataToImage = (encryptedMessage, imagePath) => {
    Jimp.read(imagePath, (err, image) => {
        if (err) throw err
        else {
            let buffer = image.bitmap.data
            buffer = encodeMessageLength(buffer.slice(0, 16), encryptedMessage)

        }
    })
}
const getSHA256Hash = str => Buffer.from(crypto.createHash('sha256').update(str).digest('hex'), 'hex')


// const key = getRandom32ByteKey()
// const iv = get16ByteIv()
// const message = 'Hello beautiful you are so gorgeous'
// const encryptedMessage = encrypt(message, key, iv)
// LSBDataToImage(encryptedMessage, './images/as-dgd.PNG')
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