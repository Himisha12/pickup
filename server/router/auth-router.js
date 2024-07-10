const express =require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");


router.route("/").get(authcontrollers.home);

router.route("/signup").post(validate(signupSchema), authcontrollers.signup);

router.route("/login").post(validate(loginSchema),authcontrollers.login);

router.route("/user").get(authMiddleware, authcontrollers.user)

module.exports = router;