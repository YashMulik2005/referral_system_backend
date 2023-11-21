const express = require("express");
const router = express.Router();
const userModel = require("../model/user");

router.post("/signup", async (req, res) => {
  try {
    const { username, password, email, referredby } = req.body;

    const checkuser = await userModel.findOne({ username: username });

    if (checkuser) {
      return res.status(200).json({
        data: { sucess: false },
      });
    }

    if (referredby.length > 0) {
      const refferduser = await userModel.findOne({ referralcode: referredby });
      if (!refferduser) {
        return res.status(200).json({
          data: { error: "Invalid refferal code" },
        });
      }

      const r = await userModel.updateOne(
        { username: refferduser.username },
        { $set: { points: refferduser.points + 10 } }
      );
    }

    const user = new userModel({
      username: username,
      password: password,
      email: email,
      referredby: referredby,
      referralcode: "",
    });

    await user.save();

    return res.status(200).json({
      data: { sucess: true },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username: username });

    if (!user) {
      return res.status(200).json({
        data: { sucess: false },
      });
    }

    if (user.password == password) {
      return res.status(200).json({
        data: { sucess: true },
      });
    }

    return res.status(200).json({
      data: { sucess: false },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/generate", async (req, res) => {
  try {
    const { username } = req.body;

    const user = await userModel.findOne({ username: username });
    if (user?.referralcode) {
      return res.status(200).json({
        data: { referralcode: user.referralcode },
      });
    }

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    code += Date.now();

    const updateuser = await userModel.updateOne(
      { username: username },
      { $set: { referralcode: code } }
    );

    if (updateuser) {
      return res.status(200).json({
        data: { referralcode: code },
      });
    }

    return res.status(200).json({
      data: { error: "something went wrong" },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/getdata", async (req, res) => {
  try {
    const { username } = req.body;

    const user = await userModel.findOne({ username: username });

    return res.status(200).json({
      data: { data: user },
    });
  } catch (err) {
    console.log(err);
    return re.status(400).json({
      data: { error: err },
    });
  }
});

module.exports = router;
