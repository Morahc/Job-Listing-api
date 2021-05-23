import express from 'express';
import { protect } from '../middleware/auth.js'
import {
  registerUser,
  userProfile,
  loginUser,
  editProfile
} from '../controllers/userCtrl.js';

const router = express.Router();

router.route('/').post(registerUser)
router.post('/login', loginUser);
router.route('/profile').get(protect, userProfile).put(protect, editProfile)

export default router;
