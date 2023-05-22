const UserServices = require('../service/user.server');

exports.register = async (req, res, next) => {
    try {
        // console.log("---req body---", req.body);
        const { email, password } = req.body;

        const successRes = await UserServices.registerUser(email, password);
        
        res.json({ status: true, success: 'User registered successfully' });
    } catch (error) {
        throw error;
    }
}