const express = require("express");
const { getAllPlaces, getPlaceById } = require("../controllers/place");

const router = express.Router();

// GET /api/place - 모든 Place 데이터 가져오기
router.get("/", getAllPlaces);

// GET /api/place/:id - 특정 ID의 Place 데이터 가져오기
router.get("/:id", getPlaceById);

module.exports = router;
