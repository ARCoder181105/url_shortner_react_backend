import { getToken } from '../middlewares/auth.js';
import { Admin } from '../models/admin.models.js';

export const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username: username });


        if (!admin) {
            return res.status(404).json({ message: 'User not found' });
        }


        if (admin.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        console.log(admin);
        const token = getToken(admin);
        console.log(token);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true, 
            sameSite: 'None' 
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const handleLogout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });

}