const express = require("express");
const router = express.Router();
const { placeModel } = require("../../models/Place/place.model");

router.post("/add", async (req, res) => {
  try {
    //test
    // const placeObj = {
    //   place_name: "Statue of Liberty National Monument",
    //   location: [40.689247, -74.044502]
    // }
    placeObj = req.body;

    await placeModel.savePlace(placeObj, (status, data) => {
      if (!status) return res.send({ status: 0, msg: 'Failed!', res: data });
      return res.send({ status: 0, msg: 'Document Added', res: data });
    });
  } catch (e) {
    res.status(200).send({ status: 0, msg: 'Failed!', res: 'BUG:' + e });
  }
});

router.get("/find", async (req, res) => {
  try {
    const filters = req.query;
    await placeModel.findPlace(filters, (status, data) => {
      if (!status) return res.send({ status: 0, msg: 'Failed', res: data });
      return res.send({ status: 1, msg: 'Documents Found', res: data });
    });
  } catch (e) {
    res.status(200).send({ status: 0, msg: 'Failed', res: 'BUG:' + e });
  }
});

module.exports = router;