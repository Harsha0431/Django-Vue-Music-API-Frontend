export default function areArraysEqual(array1, array2) {
    // Convert arrays to strings and compare
    const string1 = JSON.stringify(array1.sort())
    const string2 = JSON.stringify(array2.sort())

    return string1 === string2;
}