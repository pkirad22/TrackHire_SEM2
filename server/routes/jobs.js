const express = require('express');

const router = express.Router();

const Job = require('../models/Job');

const jwt = require('jsonwebtoken');

const Trash = require('../models/Trash');

// ─────────────────────────────────────────────
// AUTH MIDDLEWARE
// ─────────────────────────────────────────────

const auth = require('../middleware/auth');

// ─────────────────────────────────────────────
// GET ALL JOBS
// ─────────────────────────────────────────────

router.get('/', auth, async (req, res) => {

  try {

    const jobs = await Job.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(jobs);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
});

// ─────────────────────────────────────────────
// ADD JOB
// ─────────────────────────────────────────────

router.post('/', auth, async (req, res) => {

  try {

    const newJob = new Job({

      ...req.body,

      userId: req.user.id
    });



    const savedJob =
      await newJob.save();

    res.status(201).json(savedJob);

  } catch (err) {

    console.log('ERROR:', err);

    res.status(500).json({
      message: err.message
    });
  }
});

// ─────────────────────────────────────────────
// UPDATE JOB
// ─────────────────────────────────────────────

router.put('/:id', auth, async (req, res) => {

  try {

    const updatedJob = await Job.findOneAndUpdate(

      {
        _id: req.params.id,
        userId: req.user.id
      },
      {

      $set: req.body,
      },

      { returnDocument: 'after' }
    );

    res.json(updatedJob);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
});

// ─────────────────────────────────────────────
// DELETE JOB
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// DELETE JOB (Moves to Trash automatically)
// ─────────────────────────────────────────────
router.delete('/:id', auth, async (req, res) => {
  try {
    // 1. Find the job first to ensure it belongs to the user
    const jobToTrash = await Job.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!jobToTrash) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // 2. Create a new entry in the Trash collection using the job's data
    const trashedJob = new Trash({
      userId: jobToTrash.userId,
      company: jobToTrash.company,
      role: jobToTrash.role,
      hrName: jobToTrash.hrName,
      status: jobToTrash.status,
      dateApplied: jobToTrash.dateApplied,
      resumeName: jobToTrash.resumeName,
      location: jobToTrash.location,
      jobType: jobToTrash.jobType,
      deletedAt: new Date() // Sets the time it was moved to trash
    });

    await trashedJob.save();

    // 3. Delete the original job from the active jobs collection
    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Job moved to trash successfully',
      trashedJob
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;