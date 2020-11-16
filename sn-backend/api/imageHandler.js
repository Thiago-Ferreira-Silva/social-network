module.exports = app => {

    const arrayToStringChar = (image) => {
        const tipedArray = new Uint8Array(image)
        return String.fromCharCode.apply(null, tipedArray)
    }

    return { arrayToStringChar }
}