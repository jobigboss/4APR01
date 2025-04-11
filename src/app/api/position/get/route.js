import { connectMongDB } from '../../../../../lib/mongodb';
import Position from '../../../../../models/position';
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectMongDB();// เชื่อมต่อฐานข้อมูล
        const positon = await Position.find({}); // ดึงข้อมูลจาก collection customer
        console.log("Fetched position:", positon); // ตรวจสอบข้อมูลที่ดึงมาจาก MongoDB
        return NextResponse.json(positon);// ส่งข้อมูล JSON กลับ
    }catch (error){
        console.error("Error fetching position:", error); // ข้อผิดพลาดในการดึงข้อมูล
        return NextResponse.json({ message: "Error fetching position", error }, { status: 500 });
    }
}
