const express =  require("express")
const cors = require("cors")
const router = express.Router()
router.use(cors());

const usersModel = require("../models/users");

router.post("/", function(req, res, next) {
    const { username, password } = req.body;
    usersModel.findOne({
        where: { username, password }
    })
    .then(user => {
        if (user) {
            res.status(200).send({ result: "SUCCESS", userId: user.identifier });
        } else {
            res.status(500).send({ result: "USERNAME OR PASSWORD IS INCORRECT" });
        }
    })
    .catch(err => {
        res.status(500).send({ result: "FAILED TO LOGIN" });
    })
});

module.exports=router;
