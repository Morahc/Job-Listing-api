import express from 'express';
import {
  postJob,
  deleteJob,
  applyForJob,
  getAllJobs,
  getJob,
  bookmarkJob,
  removeBookmark
} from '../controllers/jobCtrl.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .post(protect, postJob)
  .get(getAllJobs);
router.route('/:id').get(getJob).delete(protect, deleteJob);
router.route('/bookmark/:id').put(protect, bookmarkJob).delete(protect, removeBookmark)
router.put('/apply/:id', protect, applyForJob);

export default router;