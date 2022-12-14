
// Returning encrypted text
export const stringEncryption = (text, key) => {
    console.log(text, key);
    // Initializing cipherText
    let cipherText = '';

    // which stores the sum of corresponding no.'s of plainText and key.
    let cipher = [];

    for (let i = 0; i < key.length; i++) {
        cipher[i] = text.charAt(i) - 'A' + key.charAt(i) - 'A';
        console.log(cipher[i]);
    }

    // If the sum is greater than 25
    // subtract 26 from it
    // and store that resulting value
    for (let i = 0; i < key.length; i++) {
        if (cipher[i] > 25) {
            cipher[i] = cipher[i] - 26;
        }
    }

    // Converting the no.'s into integers

    // Convert these integers to corresponding
    // characters and add them up to cipherText
    for (let i = 0; i < key.length; i++) {
        let x = cipher[i] + 'A';
       // cipherText += (char)x;
    }

    // Returning the cipherText
    return cipherText;
}


// Returning plain text
const stringDecryption = (s, key) => {
    // Initializing plain text
    let plainText = "";

    // Initializing integer array of key length
    // which stores difference
    // of corresponding no.'s of
    // each character of cipherText and key
    let plain = [];

    // Running for loop for each character
    // subtracting and storing in the array
    for (let i = 0; i < key.length; i++) {
        plain[i]
            = s.charAt(i) - 'A'
            - (key.charAt(i) - 'A');
    }

    // If the difference is less than 0
    // add 26 and store it in the array.
    for (let i = 0; i < key.length; i++) {
        if (plain[i] < 0) {
            plain[i] = plain[i] + 26;
        }
    }

    // Converting int to corresponding char
    // add them up to plainText
    for (let i = 0; i < key.length; i++) {
        let x = plain[i] + 'A';
        // plainText += (char)x;
    }

    // Returning plainText
    return plainText;
}
