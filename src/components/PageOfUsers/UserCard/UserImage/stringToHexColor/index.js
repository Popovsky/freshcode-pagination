function stringToHexColor(str) {
    return "#" + intToARGB(hashCode(str));
}

// Hash any string into an integer value
// Then we'll use the int and convert to hex.
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

// Convert an int to hexadecimal with a max length
// of six characters.
function intToARGB(i) {
    let hex =
        ((i >> 24) & 0xff).toString(16) +
        ((i >> 16) & 0xff).toString(16) +
        ((i >> 8) & 0xff).toString(16) +
        (i & 0xff).toString(16);
    // Sometimes the string returned will be too short so we
    // add zeros to pad it out, which later get removed if
    // the length is greater than six.
    hex += "000000";
    return hex.substring(0, 6);
}

export default stringToHexColor;
