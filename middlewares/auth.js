import jwt from 'jsonwebtoken';


export const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded; 
        next(); 
    } catch (err) {
        console.log("JWT Verification Error:", err.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
}

export const getToken = (admin) => {
    const { _id, username } = admin;
    const token = jwt.sign(
        { id: _id, username: username }, 
        process.env.SECRET, 
        { expiresIn: '1h' }
    );
    return token;
}