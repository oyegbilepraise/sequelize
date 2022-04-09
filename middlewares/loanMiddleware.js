const db = require("../models");


const User = db.users
const verifyAdmin = async (req, res, next) => {
    const {loan_id, status, login_id} = req.body;

    let user = await User.findOne({where: { id: login_id }})

    if(user.isAdmin === true) {
        next()
    } else res.status(403).json({message: 'You are not authorized'})
}

module.exports = { verifyAdmin }