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

        const user = await app.db('users')
            .select('name')
            .where({ id: user_id })
            .first()

        if (picture) {
            picture.image = arrayToStringChar(picture.image)
            return [picture.image, user.name]
        } else {
            return null
        }
    }

    return { arrayToStringChar, pickProfilePicture }
}