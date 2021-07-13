import mongoose from 'mongoose';

const applicantSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  isAccepted: { type: Boolean, default: false },
});

const jobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    jobName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ['Part-time', 'Full-time', 'Temporal', 'Internship'],
      required: true,
    },
    category: {
      type: String,
      enum: ['health-care', 'construction', 'transportation', 'food & food services', 'finance', 'industry', 'IT', 'others'],
      required: true,
    },
    desc: {
      description: { type: String, required: true },
      requirements: [{ type: String, required: true }],
      qualification: [{ type: String, required: true }],
    },
    deadline: {
      type: Date,
      required: true
    },
    applicants: [applicantSchema],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

export default Job;
