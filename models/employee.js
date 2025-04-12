import mongoose from "mongoose";

const empSchema = new mongoose.Schema({
    ID_Emp :{ type: String, required: true },
    emp_Pass :{type:String, required:true},
    emp_Fullname : { type: String, required: true },
    emp_Positon :{ type: String, required: true },
    emp_Tel :{type:String, required:true},
    emp_Company :{ type: String, required: true },
    emp_Roll :{ type: String, required: true },
    emp_Action :{ type: Boolean, default: true },
});

// 👇 ระบุ collection ที่ชัดเจนว่าใช้ "position" ไม่ใช่ "positions"
const Employee = mongoose.models.Employee || mongoose.model("Employee", empSchema, "employee");

export default Employee;