export const stringEncryptionDecription = ( text, key ) => {
    let answer = "";
    let p = 0;
 
    console.log(text);
    ([...text]).forEach(char => {
        answer += String.fromCharCode(char.charCodeAt(0) ^ (key[p]).charCodeAt(0)) 
        p += 1
        if (p == key.length)
            p = 0
    });
    
    return answer
}

