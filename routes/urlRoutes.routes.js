import express from 'express'
import { authenticateJWT } from '../middlewares/auth.js';

import { getAllUrls, generateShortUrl } from '../controllers/url.controller.js'
import { handleLogin, handleLogout } from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/admin/urls', authenticateJWT, getAllUrls);
router.post('/auth/login', handleLogin)
router.post('/admin/logout',handleLogout)
router.post('/shorten', generateShortUrl);

router.get('/auth/status', authenticateJWT, (req, res) => {
    // If authenticateJWT passes, req.user will be populated
    res.status(200).json({
        message: "User is authenticated",
        user: req.user
    });
});


export default router;