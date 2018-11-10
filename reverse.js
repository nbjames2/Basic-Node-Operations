const input = "Swarthy pirates need more swagger";
let reverseString = (inputString) => {
    array = input.split('');
    tempArray = [];
    array2 = [];
    count = 0;
    array.forEach((currentItem, key, array) => {
        if (currentItem === " ") {
            tempArray.reverse();
            let joined = tempArray.join('');
            array2.push(joined);
            tempArray.length = 0;
        } else if (Object.is(array.length -1, key)) {
            tempArray.push(currentItem);
            tempArray.reverse();
            let joined = tempArray.join('');
            array2.push(joined);
        } else {
            tempArray.push(currentItem);
        }
    });
    result = array2.join(' ');
    return result;
}
console.log(reverseString(input));