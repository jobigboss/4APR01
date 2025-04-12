import { connectMongDB } from '../../../../../lib/mongodb';
import Employee from '../../../../../models/employee';
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectMongDB();//เชื่อมต่อฐานข้อมูล
        const employee = await Employee.find({});//ดึงข้อมูลจาก collection
        console.log("Fetched position:", employee); // ตรวจสอบข้อมูลที่ดึงมาจาก MongoDB
        return NextResponse.json(employee);// ส่งข้อมูล JSON กลับ
    }catch (error){
        console.error("Error fetching employee:", error); // ข้อผิดพลาดในการดึงข้อมูล
        return NextResponse.json({ message: "Error fetching employee", error }, { status: 500 });
    }
}
