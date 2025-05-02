const User = require("../models/user");
const { setUser, getUser } = require("../service/auth");

async function handleSignUp(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields required" });
    }
    const mailExists = await User.findOne({ email });
    if (mailExists) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    await User.create({
      username,
      email,
      password,
    });
    return res
      .status(201)
      .json({ success: true, msg: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, msg: err });
  }
}

async function handleSignIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid credentials" });
    }

    const token = setUser(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ success: true, msg: "Logged in successfully", token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, msg: err });
  }
}

async function handleLogout(_, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function handleGetUserProfile(req,res){
  try {
    const user = req.user;
    return res.status(200).json({username : user.username , email : user.email})
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  handleSignUp,
  handleSignIn,
  handleLogout,
  handleGetUserProfile
};
