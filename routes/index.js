const express = require('express');
const placeRoutes = require('./place');
const workRoutes = require('./work');
const imageRoutes = require('./image');
const {
  getEpisodesBySeason,
  getLocationByEpisode,
} = require('../controllers/work');

const router = express.Router();
// 20240829 kumjh test

// 20240829 test commit

router.use('/place', placeRoutes);
router.use('/work', workRoutes);
router.use('/image', imageRoutes);

module.exports = router;
