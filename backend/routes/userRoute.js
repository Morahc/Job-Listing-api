import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  registerUser,
  userProfile,
  loginUser,
  editProfile,
  updateApplied,
} from '../controllers/userCtrl.js';
import { getUserJobs } from '../controllers/jobCtrl.js';

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', loginUser);
router.put('/accept/:id', protect, updateApplied);
router.get('/jobs', protect, getUserJobs);
router.route('/profile').get(protect, userProfile).put(protect, editProfile);

export default router;