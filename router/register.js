const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users= require('../data/userModel');

router.post('/', async (req, res) => {
    try{
        let user = req.body;
        console.log(user);
        const hash = bcrypt.hashSync(user.password, 3);
        user.password = hash;
        console.log(user.username, user.password, user.phone, user.email );
        if(user.username && user.password && user.phone && user.email){
            console.log(user);
            const user1 = await Users.add(user);

            if(user1){
              console.log(user1);
              res.status(201).json({message: "Registration Successful", user1})
            }

        } else {
            res.status(402).json({error: 'Please provide a Username, Password, Email and Phone number'})
        }
    } catch(error) {
        res.status(500).json({ error: "Unable to Register, try again"});
    }
});

module.exports = router;
