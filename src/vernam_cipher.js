export const stringEncryptionDecription = ( text, key ) => {
    let answer = "";
    let p = 0;
 
    ([...text]).forEach(char => {
        answer += String.fromCharCode(char.charCodeAt(0) ^ (key[p]).charCodeAt(0)) 
        p += 1
        if (p == key.length)
            p = 0
    });
    
    return answer
}

