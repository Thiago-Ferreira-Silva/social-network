module.exports = app => {
    const sigin= async (req, res) => {
        const user = await app.db('users')
                        .where({ email: req.body.email })
                        .first()
    }
}