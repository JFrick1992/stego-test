//Contains example of modifying pixels
//pixel is a hex 32 bit hex number
//#12345678
//12 = red
//34 = green
//56 = blue
//78 = opacity

console.log("starting")
const Jimp = require('jimp')


Jimp.read('./images/as-dgd.PNG', (err, image) => {
    if (err) throw err
    else {
        let newBuff = []
        let count = 0
        let newColor = ""
        for (let hex of image.bitmap.data) {
            if (count < 1008 * 400) {
                if(count % 4 === 0 || count % 4 === 3) {
                    newBuff.push(255)
                }
                else {
                    newBuff.push(0)
                }
            } else {
                newBuff.push(hex)
            }
            count++
        }
        const buffer = Buffer.from(newBuff)
        image.bitmap.data = buffer
        return image.write('./steg-images/as-dgd.PNG')
    }
})

console.log("ending")