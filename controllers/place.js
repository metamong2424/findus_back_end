// const db = require('../models');
//
// // 모든 Place 가져오기
// const getAllPlaces = async (req, res) => {
//   try {
//     const places = await db.Place.findAll();
//     res.json(places);
//   } catch (error) {
//     console.error('Error fetching places:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
//
// // 특정 ID의 Place 가져오기
// const getPlaceById = async (req, res) => {
//   try {
//     const placeId = req.params.id;
//     const place = await db.Place.findOne({ where: { place_id: placeId } });
//
//     if (!place) {
//       return res.status(404).json({ message: 'Place not found' });
//     }
//
//     res.json(place);
//   } catch (error) {
//     console.error('Error fetching place:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
//
// module.exports = {
//   getAllPlaces,
//   getPlaceById,
// };


const db = require('../models');

// 모든 Place 가져오기
const getAllPlaces = async (req, res) => {
  try {
    const places = await db.Place.findAll();
    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 특정 ID의 Place와 관련된 Work 및 Image 가져오기
const getPlaceById = async (req, res) => {
  try {
    const placeId = req.params.id;
    const place = await db.Place.findOne({
      where: { place_id: placeId },
      include: [
        {
          model: db.Work,
          attributes: ['work_name', 'work_season', 'work_ep'],
        },
        {
          model: db.Image,
          attributes: ['image_url'],
        },
      ],
    });

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.json(place);
  } catch (error) {
    console.error('Error fetching place with related data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  getAllPlaces,
  getPlaceById,
};




