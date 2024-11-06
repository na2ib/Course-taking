import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    const token = req.headers.authorization
    // console.log(req.headers.authorization);

    if (!token) {
        return res.status(401).json({ message: 'No Token Given' })
    }

    const data = jwt.verify(token, process.env.JWT_SECRET)

    req.user = data

    console.log(`Auth User: `, req.user);

    next()
}