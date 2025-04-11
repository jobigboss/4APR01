// models/position.js
import mongoose from 'mongoose';

const positionSchema = new mongoose.Schema({
  ID_Position: { type: String, required: true },
  Position_name: { type: String, required: true },
  Detail_Position: { type: String, required: true },
  Status: { type: Boolean, default: true },
  ID_Emp: { type: String, required: true },
});

// 👇 ระบุ collection ที่ชัดเจนว่าใช้ "position" ไม่ใช่ "positions"
const Position = mongoose.models.Position || mongoose.model("Position", positionSchema, "position");

export default Position;
