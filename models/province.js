import mongoose from 'mongoose';

const provinceSchema = new mongoose.Schema({
  postcode: { type: Number, required: true },
  sub_district: { type: String, required: true },
  district: { type: String, required: true },
  province: { type: String, required: true },
});

const Province = mongoose.models.Province || mongoose.model("Province", provinceSchema, "province");

export default Province;
