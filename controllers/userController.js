const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = db.users;

const signUp = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  let newPassword = bcrypt.hashSync(password, 10);

  await User.create({
    name,
    email,
    password: newPassword,
    isAdmin
  })
    .then((user) => {
      let token = jwt.sign({ user: user }, process.env.AUTH_SECRET);

      res.status(200).json({ user, token: token });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  await User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        res.status(404).json({ msg: "User not found" });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({ user: user }, process.env.AUTH_SECRET);
          res.status(200).json({ token: token, user: user });

        } else{
            res.status(401).json({ msg: ""})
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: err });
    });
};

const allUser = async (req, res) => {
  let users = await User.findAll({
    include: {
      all: true
    }
  });

  res.status(200).json(users)
}


module.exports = {
  signUp,
  signIn,
  allUser
};
