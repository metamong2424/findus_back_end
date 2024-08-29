const express = require('express');
const { getImagesByPlaceId, getImageById } = require('../controllers/image');

const router = express.Router();
// 20240829 kumjh test

// GET /api/image/place/:place_id - 특정 Place의 모든 이미지 가져오기
router.get('/place/:place_id', getImagesByPlaceId);

// GET /api/image/:id - 특정 ID의 이미지 가져오기
router.get('/:id', getImageById);

module.exports = router;
