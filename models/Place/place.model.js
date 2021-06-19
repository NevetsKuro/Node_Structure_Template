const mongoose = require("mongoose");
const { Schema } = mongoose;

const placeSchema = new Schema(
  {
    placeId: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    place_name: {
      type: String,
      required: true,
      default: "XXXX",
    },
    location: {
      type: Array,
      required: true,
      default: []
    },
    created_on: {
      type: Date,
      required: true,
      default: Date.now()
    },
  },
  { collection: "place" }
);

placeSchema.statics.savePlace = async function (obj, cb) {
  try {
    let Place = this;
    var PlaceObject = new Place(obj);

    await PlaceObject
      .save()
      .then(data => {
        console.log("Document Added")
        console.log(data);
        if (!data) {
          return cb(false, data)
        }
        return cb(true, data)
      })
      .catch(error => {
        console.error("Document Not Added  " + error)
        return cb(false, error)
      });
  } catch (e) {
    console.log("Error:", e)
    return cb(false, 'data')
  }
};

placeSchema.statics.findPlace = async function (filters, cb) {
  try {
    let Place = this;

    await Place
      .find({ $or: [{ place_name: filters.place_name }, { location: [parseFloat(filters.longitude), parseFloat(filters.latitude)] }] })
      .then(data => {
        console.log("Document Added")
        console.log(data);
        if (!data) {
          return cb(false, data)
        }
        //sign in to firebase
        return cb(true, data)
      })
      .catch(error => {
        console.error("Document Not Added  " + error)
        return cb(false, error)
      });
  } catch (e) {
    console.log("Error:", e)
    return cb(false, 'data')
  }
}

placeSchema.statics.removePlace = async function (id, cb) {

}

const placeModel = mongoose.model("placeSchema", placeSchema);

module.exports = { placeModel };