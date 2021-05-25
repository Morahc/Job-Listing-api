import express from 'express';
import {
  postJob,
  deleteJob,
  applyForJob,
  getJobs,
  updateApplied,
  getJob,
} from '../controllers/jobCtrl.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .post(protect, postJob)
  .delete(protect, deleteJob)
  .get(protect, getJobs);
router.get('/:id', protect, getJob);
router.put('/update/:jid/:uid', protect, updateApplied);
router.put('/apply/:id', protect, applyForJob);

export default router;
