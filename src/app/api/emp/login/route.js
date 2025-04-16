// /app/api/emp/login/route.ts
import { NextResponse } from 'next/server';
import { connectMongDB } from '../../../../../lib/mongodb';
import Employee from '../../../../../models/employee';

export async function POST(req) {
    try {
      const { username, password } = await req.json(); // รับข้อมูล JSON จาก client
      console.log('Login attempt:', username, password); // ตรวจสอบค่าที่รับมาจากฟอร์ม
  
      await connectMongDB(); // เชื่อมต่อกับฐานข้อมูล
      const user = await Employee.findOne({ ID_Emp: username }); // ค้นหาผู้ใช้ตาม username
  
      console.log('Found user:', user); // ตรวจสอบข้อมูลที่ได้จากฐานข้อมูล
  
      if (!user || user.emp_Pass !== password) {
        console.log('Invalid credentials'); // หากไม่พบผู้ใช้หรือรหัสผ่านไม่ตรง
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      }
  
      if (!user.emp_Action) {
        console.log('User not active'); // หากผู้ใช้ไม่ได้รับการเปิดใช้งาน
        return NextResponse.json({ message: 'User not active' }, { status: 403 });
      }
  
      return NextResponse.json(user); // ส่งข้อมูลของผู้ใช้กลับไป
    } catch (error) {
      console.error('Login error:', error); // ข้อผิดพลาดในการเข้าสู่ระบบ
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
