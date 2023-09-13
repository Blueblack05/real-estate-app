import User from "../mongoDB/models/user.js";

const getAllUsers = async (req, res) => {};

const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    console.log(req.body);

    const userExist = await User.findOne({ email });

    if (userExist) return res.status(200).json(userExist);

    const newUser = await User.create({ name, email, avatar });

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserInfoByID = async (req, res) => {};

export { getUserInfoByID, getAllUsers, createUser };
