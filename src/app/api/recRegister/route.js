// app/api/register/route.js
import { connectMongDB } from '../../../../lib/mongodb';
import recRegister from '../../../../models/recRegister'; // เปลี่ยน path ตามโครงสร้างโปรเจกต์ของคุณ

export async function POST(req) {
  try {
    await connectMongDB(); // เชื่อมต่อ DB

    const body = await req.json(); // รับข้อมูล JSON

    const newRec = await recRegister.create(body); // สร้างข้อมูลใหม่

    return new Response(JSON.stringify({ success: true, data: newRec }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
    });
  }
}
