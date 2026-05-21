const express = require('express');

const router = express.Router();

const Trash = require('../models/Trash');

const jwt = require('jsonwebtoken');

const Job = require('../models/Job');

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────

const authMiddleware = require('../middleware/auth');

// ─────────────────────────────────────────────
// GET TRASH
// ─────────────────────────────────────────────

router.get('/', authMiddleware, async (req, res) => {

  try {

    const trash = await Trash.find({

      userId: req.user.id

    }).sort({ deletedAt: -1 });

    res.json(trash);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
});

// ─────────────────────────────────────────────
// ADD TO TRASH
// ─────────────────────────────────────────────

router.post('/', authMiddleware, async (req, res) => {

  try {

    const trashJob = new Trash({

      ...req.body,

      userId: req.user.id
    });

    const savedTrash = await trashJob.save();

    res.status(201).json(savedTrash);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
});

// ─────────────────────────────────────────────
// RESTORE JOB FROM TRASH
// ─────────────────────────────────────────────
router.post('/:id/restore', authMiddleware, async (req, res) => {
  try {
    // 1. Find the trashed item
    const trashedJob = await Trash.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!trashedJob) {
      return res.status(404).json({ message: 'Trashed item not found' });
    }

    // 2. Re-create it back in the Job collection
    const restoredJob = new Job({
      userId: trashedJob.userId,
      company: trashedJob.company,
      role: trashedJob.role,
      hrName: trashedJob.hrName,
      status: trashedJob.status,
      dateApplied: trashedJob.dateApplied,
      resumeName: trashedJob.resumeName,
      location: trashedJob.location,
      jobType: trashedJob.jobType,
      createdAt: new Date() // Resets the active tracking window
    });

    await restoredJob.save();

    // 3. Remove it permanently from trash
    await Trash.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Job restored successfully',
      restoredJob
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// ─────────────────────────────────────────────
// DELETE PERMANENTLY
// ─────────────────────────────────────────────

router.delete('/:id', authMiddleware, async (req, res) => {

  try {

    await Trash.findOneAndDelete({

      _id: req.params.id,

      userId: req.user.id
    });

    res.json({
      message: 'Deleted permanently'
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;