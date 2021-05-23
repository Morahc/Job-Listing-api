import express from 'express';
import { postJob, deleteJob, applyForJob} from '../controllers/jobCtrl.js'
import { protect } from '../middleware/auth.js'

const router = express.Router();

router.route('/').post(protect, postJob).delete(protect, deleteJob)
router.put('/apply/:id', protect,applyForJob)


export default router;
