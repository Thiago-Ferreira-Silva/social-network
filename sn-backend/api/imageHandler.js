module.exports = app => {

    const arrayToStringChar = (image) => {
        const tipedArray = new Uint8Array(image)
        let str = ''
        tipedArray.forEach(value => str += String.fromCodePoint(value))
        return str
    }

    return { arrayToStringChar }
}