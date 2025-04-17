// /pages/api/gen-rec-id.js
import { connectDB } from '../../../../lib/mongodb';
import recRegister from '../../../../models/recRegister';
import { NextResponse } from "next/server";


export async function GET(req) {
  try {
    const now = new Date();
    const year = String(now.getFullYear()).slice(2); // '25'
    const month = String(now.getMonth() + 1).padStart(2, '0'); // '04'
    const prefix = `REC01${year}${month}`; // ผลลัพธ์จะเป็น 'REC012504'

    // ใช้ random เพื่อสุ่ม 3 ตัวท้าย
    const randomSuffix = Math.floor(Math.random() * 900) + 100; // ค่าระหว่าง 100 ถึง 999
    const newID = `${prefix}${randomSuffix}`;

    return NextResponse.json({ newID });
  } catch (error) {
    console.error('Error generating new ID:', error); // Log detailed error message
    return NextResponse.json({ error: 'ไม่สามารถสร้าง ID_Rec ได้ กรุณาลองใหม่' }, { status: 500 });
  }
}