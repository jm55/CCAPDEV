/**
 * USED FOR TESTING AUTHENTICATION IN MCO
 */

console.log("HASHING...");

var sampleKeys = [{"username":"dlsu","password":"manila"},{"username":"leni","password":"robredo"}];

function execute(){
    for(s of sampleKeys)
        console.log(s["username"] + ": " + s["password"] + "=>" + hash(s["password"]));
}

/**
 * Simple Hash Function (for emulation purposes)
 * Reference: https://gist.github.com/iperelivskiy/4110988
 * @param {string} s String to be hashed
 * @returns Numeric hash string equivalent of s
 */
 function hash(s) {
    /* Simple hash function. */
    var a = 1, c = 0, h, o;
    if (s) {
        a = 0;
        /*jshint plusplus:false bitwise:false*/
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = (a<<6&268435455) + o + (o<<14);
            c = a & 266338304;
            a = c!==0?a^c>>21:a;
        }
    }
    return String(a);
}

execute();