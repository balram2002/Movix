import User from "../models/UserModel.js";


export const addUserDetails = async (req, res) => {
    try {
        const { email, username, name, dob, language, genre, job, country, profile } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ msg: "User Already Exists." })
        }
        const newUser = new User({
            email,
            username,
            name,
            dob,
            language,
            genre,
            job,
            country,
            profile,
        })

        await newUser.save()
        return res.json({ msg: "Record Registered...." })

    } catch (error) {
        return res.json({ msg: "Error adding details." });
    }
};

export const getDetails = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ msg: "success", username: user.username, name: user.name, dob: user.dob, language: user.language, genre: user.genre, job: user.job, country: user.country, profile: user.profile });
        }
        else {
            return res.json({ msg: "User with given email not found." });
        }
        return res.json({ msg: "Record Accessed...." });

    } catch (error) {
        return res.json({ msg: "Error Fetching detasils." });
    }
};
