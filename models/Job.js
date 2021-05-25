import mongoose from 'mongoose';

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
      required: true,
    },
    desc: {
      description: { type: String, required: true },
      requirements: [{ type: String, required: true }],
      qualification: [{ type: String, required: true }],
    },
    applicants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        isAccepted: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

export default Job;
