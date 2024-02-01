const { User, Images } = require("../Models/user.models")
const cloudinary = require("cloudinary")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const userWelcome = (req, res) => {
    res.send('Welcome to the user route')
    console.log('welcome page');
}

const signUpBtn = (req, res) => {
    let user = new User(req.body)
    console.log(user)
    user.save().then(() => {
        console.log("user saved");
        res.send({ status: true, message: "Success" })
    }).catch((err) => {
        console.log("Error occured", err);
        res.send({ status: false, message: "Not Successful  " })
    })
}


const signInBtn = (req, res) => {

    let { uname, pass } = req.body
    User.findOne({ uname: uname, pass: pass }).then((user) => {
        if (!user) return res.status(200).json({ message: "Username or password is incorrect", status: false })

        else {
            let token = jwt.sign({ id: user.id }, secret, { expiresIn: "24h" })
            res.status(200).json({ message: "Login Success", status: true, token })
        }

    })
        .catch((err) => {
            console.log("error occured", err);
        })
}


const dashboard = (req, res) => {
    // console.log(token)
    jwt.verify(req.body.token, secret, (err, resul) => {
        const myfile = req.body.file
        cloudinary.v2.uploader.upload(myfile, (err, result) => {
            if (err) {
                console.log("error");
                res.send({ message: 'Upload Fail', status: false })
            }
            else {
                const myimage = result.secure_url
                Images.create({ userId: resul.id, img: myimage }).then((result) => {
                    res.send({ message: 'Upload Successful', status: true, image: result })
                }).catch((err) => {
                    console.log(err, "something went wrong");
                    res.send({ message: 'Error Ocurred' })
                })
                // User.findOneAndUpdate(
                //     { _id: result.id },
                //     { myimage: myimage }
                // )
                //     .then((user) => {
                //         console.log("success upload");
                //     })
            }
        }).catch((err) => {
            console.log(err, "something went wrong");
            res.send({ message: 'Error Ocurred' })
        })
    })
}

const getdashboardref = (req, res) => {
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, secret, (err, result) => {
        if (err) {
            console.log("error");
            res.send({ message: 'Upload Fail', status: false })
        }
        else {
            console.log(result.headers);
            console.log(result);
            User.findOne(
                { _id: result.id }
            ).then(async (user) => {
                Images.find({ userId: result.id }).then((images) => {
                    console.log(images);
                    return res.status(200).json({ message: "Username Found", user, images, status: true })
                }).catch((err) => {
                    console.log(err, "something went wrong");
                    res.send({ message: 'Error Ocurred' })
                })
            }).catch((err) => {
                console.log(err, "something went wrong");
                res.send({ message: 'Error Ocurred' })
            })
        }
    })
}

const delectimage = async(req, res) => {
        try {
            const { imageId } = req.params;

            await Images.findByIdAndDelete(imageId);

            res.json({ success: true, message: 'Image deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
}
module.exports = { userWelcome, signUpBtn, signInBtn, dashboard, getdashboardref, delectimage }