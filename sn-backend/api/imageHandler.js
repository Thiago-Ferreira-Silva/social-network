module.exports = app => {

    const arrayToStringChar = (image) => {
        const tipedArray = new Uint8Array(image)
        let str = ''
        tipedArray.forEach(value => str += String.fromCodePoint(value))
        return str
    }

    const pickProfilePicture = async (user_id) => {
        const picture = await app.db('profile_pictures')
            .where({ user_id })
            .first()
            .catch(err => res.status(500).send(err))

        if (picture) {
            picture.image = arrayToStringChar(picture.image)
            return picture.image
        } else {
            return null
        }
    }

    return { arrayToStringChar, pickProfilePicture }
}