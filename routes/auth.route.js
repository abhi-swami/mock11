const { Router } = require("express");
const { userModel } = require("../model/user.model");

const auth = Router();

auth.get("/", (req, res) => {
  res.status(200).send({ mesg: `auth Page` });
});

auth.post("/registration", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.find({ email });
    if (user.length !== 0) {
      res.send({ mesg: `user already registered` });
    } else {
      const user = new userModel({ ...req.body });
      user.save();
      res.status(200).send({ mesg: `user registered successfully` });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

auth.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const arr = await userModel.find({ email });
    console.log(arr,email)
    if (arr.length === 0) {
      res.status(400).send({
        mesg: `Unable find user with given email, please Signup first`,
      });
    } else {
      let pwd = arr.map((el) => (el.password ? el.password : null));
      if (password === pwd[0]) {
        res.status(200).send({
          mesg: `User logged in successfully`,
          user:arr,
        });
      } else {
        res.status(400).send({
          error: `Invalid password, please enter a correct password`,
        });
      }
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { auth };
