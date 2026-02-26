const bycrpyt = require ("bcrypt"); 
const router = require("express").Router(); 
const {User} = require("../models"); 

router.post("/", async (req, res) => {
    try {
        const {username, name, password} = req.body; 
        const passwordHash = await bcrypt.hash(password, 10); 
        const user = await User.create({username, name, password: passwordHash}); 
        res.status(201).json({
            name: user.name, 
            id: user.id, 
            username: user.username,
        })
    } catch (error) {
      res.status(400).json({error: error.message}); 
    }
})
module.exports = router; 