var crypto = require('crypto');
const fs = require('fs');

function getAlgorithm(keyBase64) {

    var key = Buffer.from(keyBase64, 'base64');
    switch (key.length) {
        case 16:
            return 'aes-128-cbc';
        case 32:
            return 'aes-256-cbc';

    }

    throw new Error('Invalid key length: ' + key.length);
}


function encrypt(plainText, keyBase64, ivBase64) {

    const key = Buffer.from(keyBase64, 'base64');
    const iv  = Buffer.from(ivBase64, 'base64');

    const cipher  = crypto.createCipheriv(getAlgorithm(keyBase64), key, iv.slice(0, 16));
    let encrypted = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

function decrypt(messagebase64, keyBase64, ivBase64) {

    const key = Buffer.from(keyBase64, 'base64');
    const iv  = Buffer.from(ivBase64, 'base64');

    const decipher = crypto.createDecipheriv(getAlgorithm(keyBase64), key, iv.slice(0, 16));
    let decrypted  = decipher.update(messagebase64, 'base64');
    decrypted += decipher.final();
    return decrypted;
}


var keyBase64 = "DWIzFkO22qfVMgx2fIsxOXnwz10pRuZfFJBvf4RS3eY=";
var ivBase64  = '!hunesion@SecK';

var plainText = 'DAEwvHeJRDZOxSLQ2OQuK8J0YVGlbrnUPgzih2HK8zp1dFZXNRoDcLUvqTlo7O42iq2SJkjTvToaunTETPAc1sIA8iImFMH7%2FI6j1ONZxvcpbd0oJS3acCVYB%2BFm7ZwbY9bLjiPW43Qz6slJsyWDIM7J3KT02yhCSd6zetqnrjmw8vrFZ2p0ibmAQXCREG9RENEenb9ZFICZAav6hjpFGSGsZ5l8%2FSGUK1k6%2BFU0i8K2vAc%2FTYutiJ10Q0CaXcK9lY1tfcSFiEU1H9mn%2F9pfHljrLCz1TriRdBv96WtNYnpvmepg22VfmK3GhYRvc3VbNnxHnozeIqjNHW1FbD8dYYH9B80MbyqvtEZKNylRDsU9sHU%2B1ohVL0oM9SDuxRBUSnhiWhEGaHhnMx2eQPQLNQ9AhdcnCqkRlW492d%2BjU0nPaWr4hx4nRj2odDcG%2Bdc1CH21XeotEEJJH7bTv89P8wPP3jZLAE04Y5PY3pdFgJ7bv%2BLdl90J1oLkQeTufC8o3sZFFF9f%2Bl8dxjgarm7QaS2jQrGV1aiIsdSWEfJMENftZw4PxKltT9OVEvbPyDzQgq28V1QyVzC6vW7nXiwRuOIwau68I7POWIhehmXsmO6MBcWZsRW%2Fjr18Mf0H2OC9Umaz3E5%2BlU6tGtpD2rcyjB1rd64tz13%2FgmOpz28F5W1U%2F%2Fo%2FdyqncZtyzgN%2F7uORMZ5MOfS3aizw%2Fd7KhA8n090KKxyCq8OsJW%2Ft6F5ptEDQcLt6q9%2Fe4K2QgzTNspdI10ocqZ%2BJHNt2XLrbCr9yX%2F9YVTz3fJ5UZpjGvpvscgA%3D';
var aa = decodeURIComponent(plainText);

//console.log(aa);

var cipherText          = aa;
//var decryptedCipherText = decrypt(cipherText, keyBase64, ivBase64);

console.log('Algorithm: ' + getAlgorithm(keyBase64));
console.log('Plaintext: ' + plainText);
console.log('Ciphertext: ' + cipherText);
console.log('Decoded Ciphertext: ' + decryptedCipherText);
