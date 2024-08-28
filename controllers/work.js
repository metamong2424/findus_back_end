// const db = require('../models');
// const { Op } = require('sequelize');
//
//
// const reverseWorkNameMap = {
//   '러브라이브 선샤인': 'sunshine',
//   '러브라이브 니지가사키': 'nijigasaki',
//   '러브라이브 슈퍼스타': 'superstar',
//   '러브라이브 하스노소라': 'hasnosora',
//   '봇치더락': 'bocchi'
// };
//
// const getAllWorks = async (req, res) => {
//   try {
//     const works = await db.Work.findAll({
//       attributes: ['work_name'],
//       group: ['work_name'],
//       where: {
//         work_name: {
//           [Op.in]: Object.keys(reverseWorkNameMap)
//         }
//       }
//     });
//
//     const uniqueWorks = works.map(work => ({
//       work_name: work.work_name,
//       work_key: reverseWorkNameMap[work.work_name] || work.work_name
//     }));
//
//     res.json(uniqueWorks);
//   } catch (error) {
//     console.error('Error fetching works:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
//
// const getWorkById = async (req, res) => {
//   try {
//     const workId = req.params.id;
//     const work = await db.Work.findOne({ where: { work_id: workId } });
//
//     if (!work) {
//       return res.status(404).json({ message: 'Work not found' });
//     }
//
//     res.json(work);
//   } catch (error) {
//     console.error('Error fetching work:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
//
// const getWorkDetails = async (req, res) => {
//   try {
//     const { workKey } = req.params;
//     const koreanWorkName = workNameMap[workKey];
//
//     if (!koreanWorkName) {
//       return res.status(404).json({ error: '작품을 찾을 수 없습니다.' });
//     }
//
//     const work = await db.Work.findOne({
//       where: { work_name: koreanWorkName },
//       attributes: ['work_name', 'description', 'poster']
//     });
//
//     if (!work) {
//       return res.status(404).json({ error: '작품 정보를 찾을 수 없습니다.' });
//     }
//
//     const seasons = await db.Work.findAll({
//       where: { work_name: koreanWorkName },
//       attributes: ['work_season'],
//       group: ['work_season']
//     });
//
//     const processedSeasons = seasons.map(season => {
//       let displayName;
//       switch(season.work_season.toLowerCase()) {
//         case 'movie':
//           displayName = '극장판';
//           break;
//         case 'ova':
//           displayName = 'OVA';
//           break;
//         case 'pv':
//           displayName = 'PV';
//           break;
//         default:
//           displayName = `${season.work_season}기`;
//       }
//       return {
//         season: season.work_season,
//         season_key: season.work_season,
//         display_name: displayName
//       };
//     });
//
//     res.json({
//       work: {
//         ...work.toJSON(),
//         work_key: workKey
//       },
//       seasons: processedSeasons
//     });
//   } catch (error) {
//     console.error('Error fetching work details:', error);
//     res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
//   }
// };
//
// const getSeasonEpisodes = async (req, res) => {
//   try {
//     const { workKey, seasonKey } = req.params;
//     const koreanWorkName = workNameMap[workKey];
//     const koreanSeason = seasonMap[seasonKey] || seasonKey;
//
//     const episodes = await db.Work.findAll({
//       where: {
//         work_name: koreanWorkName,
//         work_season: koreanSeason
//       },
//       attributes: ['work_ep', 'description', 'poster'],
//       include: [{
//         model: db.Place,
//         attributes: ['place_name', 'marker_img'],
//         limit: 1  // 각 에피소드당 하나의 장소만 가져옵니다 (썸네일용)
//       }]
//     });
//
//     res.json(episodes.map(episode => ({
//       ...episode.toJSON(),
//       thumbnail: episode.Places[0]?.marker_img || episode.poster
//     })));
//   } catch (error) {
//     console.error('Error fetching season episodes:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
//
//
// const getAllSeasonsForWork = async (req, res) => {
//   try {
//     const { workKey } = req.params;
//     const koreanWorkName = workNameMap[workKey];
//
//     if (!koreanWorkName) {
//       return res.status(404).json({ error: '작품을 찾을 수 없습니다.' });
//     }
//
//     const seasons = await db.Work.findAll({
//       where: { work_name: koreanWorkName },
//       attributes: ['work_season'],
//       group: ['work_season'],
//       order: [['work_season', 'ASC']]
//     });
//
//     const processedSeasons = seasons.map(season => ({
//       season: season.work_season,
//       season_key: season.work_season,
//       display_name: getSeasonDisplayName(season.work_season)
//     }));
//
//     res.json(processedSeasons);
//   } catch (error) {
//     console.error('Error fetching seasons:', error);
//     res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
//   }
// };
//
// const getSeasonDisplayName = (season) => {
//   switch(season.toLowerCase()) {
//     case 'movie': return '극장판';
//     case 'ova': return 'OVA';
//     case 'pv': return 'PV';
//     default: return `${season}기`;
//   }
// };
//
// module.exports = {
//
//   getWorkById,
//   getAllWorks,
//   getWorkDetails,
//   getSeasonEpisodes,
//   getAllSeasonsForWork,
// };

// 클로드
// const db = require('../models');
// const { Op } = require('sequelize');
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
// const getWorkById = async (req, res) => {
//   try {
//     const workId = req.params.id;
//     const work = await db.Work.findOne({ where: { work_id: workId } });
//
//     if (!work) {
//       return res.status(404).json({ message: 'Work not found' });
//     }
//
//     res.json(work);
//   } catch (error) {
//     console.error('Error fetching work:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
//
// const getAllWorks = async (req, res) => {
//   try {
//     const works = await db.Work.findAll({
//       attributes: ['work_name'],
//       group: ['work_name']
//     });
//     const worksWithKeys = works.map(work => ({
//       ...work.toJSON(),
//       work_key: Object.keys(workNameMap).find(key => workNameMap[key] === work.work_name) || work.work_name
//     }));
//     res.json(worksWithKeys);
//   } catch (error) {
//     console.error('Error fetching works:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
//
// const getWorkDetails = async (req, res) => {
//   try {
//     const { workKey } = req.params;
//     console.log('Requested workKey:', workKey);
//     const koreanWorkName = workNameMap[workKey];
//     console.log('Mapped Korean work name:', koreanWorkName);
//
//     if (!koreanWorkName) {
//       console.log('Work not found in workNameMap');
//       return res.status(404).json({ message: '작품을 찾을 수 없습니다.' });
//     }
//
//     const work = await db.Work.findOne({
//       where: { work_name: koreanWorkName },
//       attributes: ['work_name', 'description', 'poster', 'start_date', 'end_date']
//     });
//     console.log('Found work:', work);
//
//     if (!work) {
//       console.log('Work not found in database');
//       return res.status(404).json({ message: '작품 정보를 찾을 수 없습니다.' });
//     }
//
//     res.json({
//       ...work.toJSON(),
//       work_key: workKey
//     });
//   } catch (error) {
//     console.error('Error in getWorkDetails:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
//
// const getSeasonEpisodes = async (req, res) => {
//   try {
//     const { workKey, seasonKey } = req.params;
//     const koreanWorkName = workNameMap[workKey];
//
//     if (!koreanWorkName) {
//       return res.status(404).json({ message: '작품을 찾을 수 없습니다.' });
//     }
//
//     const episodes = await db.Work.findAll({
//       where: {
//         work_name: koreanWorkName,
//         work_season: seasonKey
//       },
//       attributes: ['work_id', 'work_name', 'work_season', 'work_ep', 'description', 'poster'],
//       order: [['work_ep', 'ASC']]
//     });
//
//     if (episodes.length === 0) {
//       return res.status(404).json({ message: '해당 시즌의 에피소드를 찾을 수 없습니다.' });
//     }
//
//     res.json(episodes);
//   } catch (error) {
//     console.error('Error fetching season episodes:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
//
// const getAllSeasonsForWork = async (req, res) => {
//   try {
//     const { workKey } = req.params;
//     const koreanWorkName = workNameMap[workKey];
//
//     if (!koreanWorkName) {
//       return res.status(404).json({ error: '작품을 찾을 수 없습니다.' });
//     }
//
//     const seasons = await db.Work.findAll({
//       where: { work_name: koreanWorkName },
//       attributes: ['work_season'],
//       group: ['work_season'],
//       order: [['work_season', 'ASC']]
//     });
//
//     const processedSeasons = seasons.map(season => ({
//       season: season.work_season,
//       season_key: season.work_season,
//       display_name: getSeasonDisplayName(season.work_season)
//     }));
//
//     res.json(processedSeasons);
//   } catch (error) {
//     console.error('Error fetching seasons:', error);
//     res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
//   }
// };
//
// const getSeasonDisplayName = (season) => {
//   switch(season.toLowerCase()) {
//     case 'movie': return '극장판';
//     case 'ova': return 'OVA';
//     case 'pv': return 'PV';
//     default: return `${season}기`;
//   }
// };
//
// module.exports = {
//   getWorkById,
//   getAllWorks,
//   getWorkDetails,
//   getSeasonEpisodes,
//   getAllSeasonsForWork
// };


const db = require('../models');
const { Op } = require('sequelize');

// 영어 -> 한국어 매핑 사전
const workNameMap = {
    'sunshine': '러브라이브 선샤인',
    'nijigasaki': '러브라이브 니지가사키',
    'superstar': '러브라이브 슈퍼스타',
    'hasnosora': '러브라이브 하스노소라',
    'bocchi': '봇치더락'
};

const getWorkById = async (req, res) => {
  try {
    const workId = req.params.id;
    const work = await db.Work.findOne({ where: { work_id: workId } });

    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }

    res.json(work);
  } catch (error) {
    console.error('Error fetching work:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllWorks = async (req, res) => {
  try {
    const works = await db.Work.findAll({
      attributes: ['work_name'],
      group: ['work_name']
    });
    const worksWithKeys = works.map(work => ({
      ...work.toJSON(),
      work_key: Object.keys(workNameMap).find(key => workNameMap[key] === work.work_name) || work.work_name
    }));
    res.json(worksWithKeys);
  } catch (error) {
    console.error('Error fetching works:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getWorkDetails = async (req, res) => {
  try {
    const { workKey } = req.params;
    const koreanWorkName = workNameMap[workKey];

    if (!koreanWorkName) {
      return res.status(404).json({ message: '작품을 찾을 수 없습니다.' });
    }

    const work = await db.Work.findOne({
      where: { work_name: koreanWorkName },
      attributes: ['work_name', 'description', 'poster', 'start_date', 'end_date']
    });

    if (!work) {
      return res.status(404).json({ message: '작품 정보를 찾을 수 없습니다.' });
    }

    const seasons = await db.Work.findAll({
      where: { work_name: koreanWorkName },
      attributes: ['work_season'],
      group: ['work_season'],
      order: [['work_season', 'ASC']]
    });

    const processedSeasons = seasons.map(season => ({
      season: season.work_season,
      season_key: season.work_season,
      display_name: getSeasonDisplayName(season.work_season)
    }));

    res.json({
      work: { ...work.toJSON(), work_key: workKey },
      seasons: processedSeasons
    });
  } catch (error) {
    console.error('Error in getWorkDetails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getSeasonEpisodes = async (req, res) => {
  try {
    const { workKey, seasonKey } = req.params;
    const koreanWorkName = workNameMap[workKey];

    if (!koreanWorkName) {
      return res.status(404).json({ message: '작품을 찾을 수 없습니다.' });
    }

    const episodes = await db.Work.findAll({
      where: {
        work_name: koreanWorkName,
        work_season: seasonKey
      },
      attributes: ['work_id', 'work_name', 'work_season', 'work_ep', 'description', 'poster'],
      order: [['work_ep', 'ASC']]
    });

    if (episodes.length === 0) {
      return res.status(404).json({ message: '해당 시즌의 에피소드를 찾을 수 없습니다.' });
    }

    res.json(episodes);
  } catch (error) {
    console.error('Error fetching season episodes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllSeasonsForWork = async (req, res) => {
  try {
    const { workKey } = req.params;
    const koreanWorkName = workNameMap[workKey];

    if (!koreanWorkName) {
      return res.status(404).json({ error: '작품을 찾을 수 없습니다.' });
    }

    const seasons = await db.Work.findAll({
      where: { work_name: koreanWorkName },
      attributes: ['work_season'],
      group: ['work_season'],
      order: [['work_season', 'ASC']]
    });

    const processedSeasons = seasons.map(season => ({
      season: season.work_season,
      season_key: season.work_season,
      display_name: getSeasonDisplayName(season.work_season)
    }));

    res.json(processedSeasons);
  } catch (error) {
    console.error('Error fetching seasons:', error);
    res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
  }
};

const getSeasonDisplayName = (season) => {
  switch(season.toLowerCase()) {
    case 'movie': return '극장판';
    case 'ova': return 'OVA';
    case 'pv': return 'PV';
    default: return `${season}`;
  }
};
const getSeasonDetails = async (req, res) => {
  try {
    const { workKey, seasonKey } = req.params;
    const koreanWorkName = workNameMap[workKey];

    const seasonDetails = await db.Work.findOne({
      where: {
        work_name: koreanWorkName,
        work_season: seasonKey
      },
      attributes: ['work_name', 'work_season', 'description', 'poster', 'start_date', 'end_date']
    });

    if (!seasonDetails) {
      return res.status(404).json({ message: '해당 시즌 정보를 찾을 수 없습니다.' });
    }

    res.json(seasonDetails);  // 여기서 poster URL을 수정하지 않고 그대로 반환합니다.
  } catch (error) {
    console.error('Error fetching season details:', error);
    res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
  }
};

module.exports = {
  getWorkById,
  getAllWorks,
  getWorkDetails,
  getSeasonEpisodes,
  getAllSeasonsForWork,
  getSeasonDetails,
};
