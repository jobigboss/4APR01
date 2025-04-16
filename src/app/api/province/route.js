import { NextResponse } from "next/server";
import { connectMongDB } from "../../../../lib/mongodb";
import Province from "../../../../models/province";

export async function GET(){
    try{
        await connectMongDB ();//เชื่อมต่อฐานข้อมูล
        const province = await Province.find({});//ดึงข้อมูลจาก collection
        console.log("Fetched province:", province);
        return NextResponse.json(province);// ส่งข้อมูล JSON กลับ
    }catch (error){
        console.error("Error fetching province:", error); // ข้อผิดพลาดในการดึงข้อมูล
        return NextResponse.json({ message: "Error fetching province", error }, { status: 500 });
    }
}