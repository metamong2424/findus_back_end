// const express = require('express');
// const { Work } = require('../models');
// const {
//     getWorkById,
//   getAllWorks,
//   getWorkDetails,
//   getSeasonEpisodes,
//   getAllSeasonsForWork } = require('../controllers/workController');
//
// const router = express.Router();
//
// // 영어 -> 한국어 매핑 사전
// const workNameMap = {
//     'sunshine': '러브라이브 선샤인',
//     'nijigasaki': '러브라이브 니지가사키',
//     'superstar': '러브라이브 슈퍼스타',
//     'hasnosora': '러브라이브 하스노소라',
//     'bocchi': '봇치더락'
// };
//
// // 한국어 -> 영어 매핑 사전
// const reverseWorkNameMap = Object.fromEntries(
//   Object.entries(workNameMap).map(([key, value]) => [value, key])
// );
//
// const seasonMap = {
//     '1': '1',
//     '2': '2',
//     'movie': '극장판',
//     'pv': 'PV',
//     '103': '103기',
//     '104': '104기',
//     '103fes': '103기 페스라이브',
//     '104fes': '104기 페스라이브'
// };
//
// // 모든 작품 목록 가져오기
// router.get('/all', getAllWorks);
//
// // 특정 작품의 소개 및 시즌 목록 가져오기
// router.get('/:workKey', async (req, res) => {
//     const englishWorkKey = req.params.workKey;
//     const koreanWorkName = workNameMap[englishWorkKey];
//     if (!koreanWorkName) {
//         return res.status(404).json({ message: '작품을 찾을 수 없습니다.' });
//     }
//     try {
//         const workInfo = await Work.findOne({
//             where: { work_name: koreanWorkName }
//         });
//         const seasons = await Work.findAll({
//             where: { work_name: koreanWorkName },
//             attributes: ['work_season'],
//             group: ['work_season']
//         });
//         res.json({
//             workInfo: { ...workInfo.toJSON(), work_key: englishWorkKey },
//             seasons
//         });
//     } catch (error) {
//         console.error('Error fetching work info:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
//
// // 특정 작품과 시즌의 정보를 가져오는 라우트
// router.get('/:workKey/:seasonKey', async (req, res) => {
//     const englishWorkKey = req.params.workKey;
//     const englishSeasonKey = req.params.seasonKey;
//     const koreanWorkName = workNameMap[englishWorkKey];
//     const koreanSeason = seasonMap[englishSeasonKey] || englishSeasonKey;
//
//     if (!koreanWorkName) {
//         return res.status(404).json({ message: '작품명을 찾을 수 없습니다.' });
//     }
//
//     try {
//         const result = await Work.findAll({
//             where: {
//                 work_name: koreanWorkName,
//                 work_season: koreanSeason,
//             }
//         });
//
//         if (result.length === 0) {
//             return res.status(404).json({ message: '해당 시즌의 작품을 찾을 수 없습니다.' });
//         }
//
//         const resultWithKeys = result.map(item => ({
//             ...item.toJSON(),
//             work_key: englishWorkKey,
//             season_key: englishSeasonKey
//         }));
//
//         res.json(resultWithKeys);
//     } catch (error) {
//         console.error('Error fetching work:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
//
// // 특정 작품, 시즌, 에피소드의 정보를 가져오는 라우트
// router.get('/:workKey/:seasonKey/:episodeKey', async (req, res) => {
//     const englishWorkKey = req.params.workKey;
//     const englishSeasonKey = req.params.seasonKey;
//     const episodeKey = req.params.episodeKey;
//     const koreanWorkName = workNameMap[englishWorkKey];
//     const koreanSeason = seasonMap[englishSeasonKey] || englishSeasonKey;
//
//     if (!koreanWorkName) {
//         return res.status(404).json({ message: '작품명을 찾을 수 없습니다.' });
//     }
//
//     try {
//         const result = await Work.findOne({
//             where: {
//                 work_name: koreanWorkName,
//                 work_season: koreanSeason,
//                 work_ep: episodeKey
//             }
//         });
//
//         if (!result) {
//             return res.status(404).json({ message: '해당 에피소드를 찾을 수 없습니다.' });
//         }
//
//         const resultWithKeys = {
//             ...result.toJSON(),
//             work_key: englishWorkKey,
//             season_key: englishSeasonKey
//         };
//
//         res.json(resultWithKeys);
//     } catch (error) {
//         console.error('Error fetching episode:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
//
// router.get('/all', getAllWorks);
// router.get('/:workKey', getWorkDetails);
// router.get('/:workKey/:seasonKey', getSeasonEpisodes);
// router.get('/:workKey/seasons', getAllSeasonsForWork);
//
//
//
// module.exports = router;
//클로드

//gpt
const express = require("express");
const { Work } = require("../models");
const {
  getWorkById,
  getAllWorks,
  getWorkDetails,
  getSeasonEpisodes,
  getAllSeasonsForWork,
  getSeasonDetails,
} = require("../controllers/work");

const router = express.Router();

// 영어 -> 한국어 매핑 사전
const workNameMap = {
  sunshine: "러브라이브 선샤인",
  nijigasaki: "러브라이브 니지가사키",
  superstar: "러브라이브 슈퍼스타",
  hasnosora: "러브라이브 하스노소라",
  bocchi: "봇치더락",
};

// 모든 작품 목록 가져오기
router.get("/all", getAllWorks);

// 특정 작품의 소개 및 시즌 목록 가져오기
router.get("/:workKey", getWorkDetails);

// 특정 시즌의 에피소드 목록 가져오기
router.get("/:workKey/season/:seasonKey", getSeasonEpisodes);

// 특정 작품의 모든 시즌 목록 가져오기
router.get("/:workKey/seasons", getAllSeasonsForWork);

// 특정 시즌의 세부 정보 가져오기
router.get("/:workKey/season/:seasonKey/details", getSeasonDetails);

module.exports = router;
