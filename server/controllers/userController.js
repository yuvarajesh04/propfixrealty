const User = require('../models/userModel');

const userController = {

    // Register a new client
    registerClient: (req, res) => {
        const {name, email, mobile, message} = req.body;

        if (!name || !email || !mobile) {
            res.status(400).json({
                success: false,
                message: 'Name, Email, Mobile fields are mandatory'
            })
        }

        const newUser = new User({ name, email, mobile, message });

        const user = newUser.save()

        if (user) {
            res.status(201).json({
                success: true,
                message: 'Client registered successfully',
            })

        } else {
            res.status(500).json({ message: 'Failed to register client', success: false });
        }
    }
}

module.exports = userController;