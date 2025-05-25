const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'your-very-secure-secret';

//Route:1  create a user using: Post "/api/auth/createUser". No login required
router.post('/createUser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters ').isLength({ min: 5 })
], async (req, res) => {
  let success=false;
  //If there are errors return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }


  //chech wheather the user with this email already exist
  try {

    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({success, errors: "!Email is already in use. Please enter another email" });
    }
    //create a new user
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success, authtoken })
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured! please try again")

  }

})

//Route 2:Authenticate a user using: Post "/api/auth/userLogin". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password can not be blank').exists(),
], async (req, res) => {
  let success=false;
  //If some error occured, like it does not contains or empty email,or password then error will occur
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  //destructure the details from the body: 
  const { email, password } = req.body;

  try {
    //check wheather this email exists or not
    let user = await User.findOne({ email })
    //if email does not exist return error
    if (!user) {
      return res.status(400).json({success, errors: "Please try to login with correct credentials" });
    }
    //If password does not match return the same error
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success=false;
      return res.status(400).json({success, errors: "Please try to login with correct credentials" });
    }
    //if password matches then through the authentication token
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured! please try again")
  }

});

//Route 3:Get leggedin user details using: Post "/api/auth/fetchuser". Login required

router.post('/fetchuser', fetchuser, async (req, res) => {
  try {
    // finding the id of the user
    const userId = req.user.id;
    //give all the details except password
    const user = await User.findById(userId).select("-password");
    res.send(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured! please try again")
  }

});


module.exports = router