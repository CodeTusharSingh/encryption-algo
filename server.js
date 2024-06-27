const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 7474;

app.get('/rise', (req, res) => {
    try {
        res.send('good to go 🏇🏼');
    } catch (error) {
        console.log(error);
    }
})

app.post('/encrypt', (req, res) => {
    try {
        const text = req.body;
        // console.log('---------Encrypt------------')
        let buf = Buffer.from(text.text, 'ascii');
        let binaryArray = Array.from(buf).map(byte => byte.toString(2).padStart(8, '0'));
        // console.log(binaryArray);
        for (let i = 0; i < binaryArray.length; i++) {
            if (binaryArray[i].length === 1) {
                if (binaryArray[i] === "1") {
                    binaryArray[i] = "0";
                } else {
                    binaryArray[i] = "1";
                }
            } else {
                if (binaryArray[i].charAt(0) === '1') {
                    let str = "0";
                    str += binaryArray[i].substring(1, binaryArray[i].length);
                    binaryArray[i] = str;
                } else {
                    let str = "1";
                    str += binaryArray[i].substring(1, binaryArray[i].length);
                    binaryArray[i] = str;
                }

                if (binaryArray[i].charAt(binaryArray[i].length - 1) === '1') {
                    let str = binaryArray[i].substring(0, binaryArray[i].length - 1);
                    str += "0";
                    binaryArray[i] = str;
                } else {
                    let str = binaryArray[i].substring(0, binaryArray[i].length - 1);
                    str += "1";
                    binaryArray[i] = str;
                }
            }
        }
        // console.log(binaryArray);
        let encryptArray = Array.from(binaryArray).map(byte => String.fromCharCode(parseInt(byte, 2)));
        // console.log(encryptArray);
        let str = "";
        for (let i = 0; i < encryptArray.length; i++) {
            str += encryptArray[i];
        }
        // console.log(str);
        res.json({ encryptText: str });
    } catch (error) {
        console.log('Error')
    }
})

app.post('/decrypt', (req, res) => {
    try {
        const text = req.body;
        // console.log('-------------------Decrypt-------------------');
        // console.log(text.text);
        let buf = Buffer.from(text.text, 'ascii');
        let binaryArray = Array.from(buf).map(byte => byte.toString(2));
        // console.log(binaryArray);
        for (let i = 0; i < binaryArray.length; i++) {
            if (binaryArray[i].length === 1) {
                if (binaryArray[i] === "1") {
                    binaryArray[i] = "0";
                } else {
                    binaryArray[i] = "1";
                }
            } else {
                if (binaryArray[i].charAt(0) === '1') {
                    let str = "0";
                    str += binaryArray[i].substring(1, binaryArray[i].length);
                    binaryArray[i] = str;
                } else {
                    let str = "1";
                    str += binaryArray[i].substring(1, binaryArray[i].length);
                    binaryArray[i] = str;
                }
                if (binaryArray[i].charAt(binaryArray[i].length - 1) === '1') {
                    let str = binaryArray[i].substring(0, binaryArray[i].length - 1);
                    str += "0";
                    binaryArray[i] = str;
                } else {
                    let str = binaryArray[i].substring(0, binaryArray[i].length - 1);
                    str += "1";
                    binaryArray[i] = str;
                }
            }
        }
        // console.log(binaryArray);
        let decryptArray = Array.from(binaryArray).map(byte => String.fromCharCode(parseInt(byte, 2)));
        // console.log(decryptArray);
        let str = "";
        for (let i = 0; i < decryptArray.length; i++) {
            str += decryptArray[i];
        }
        // console.log(str);
        res.json({ decryptText: str });
    } catch (error) {
        console.log('Error')
    }
})

app.listen(PORT, () => {
    console.log('server running on port', PORT);
})