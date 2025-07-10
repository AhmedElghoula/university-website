function transformNumberToString(number) {
    // Convert number to string
    let numString = number.toString();

    // Determine the length of the string
    let length = numString.length;

    // Pad the string with zeros if necessary
    while (length < 4) {
        numString = "0" + numString;
        length++;
    }

    // Concatenate '#' to the padded string
    return "#" + numString;
}

module.exports = transformNumberToString;
