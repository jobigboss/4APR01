import { connectMongDB } from '../../../../lib/mongodb';
import recRegister from '../../../../models/recRegister';

export async function GET() {
  try {
    await connectMongDB();

    const empPrefix = "REC01";
    const today = new Date();
    const year = today.getFullYear().toString().slice(2); // '24'
    const month = String(today.getMonth() + 1).padStart(2, '0'); // '04'
    const datePart = `${year}${month}`; // 👉 ได้ '2404'

    // ปรับ query ให้ค้นหาเฉพาะตาม ID_Emp
    const regex = new RegExp(`^${empPrefix}${datePart}\\d{3}$`);

    // ค้นหาข้อมูลที่ตรงกับ regex
    const latest = await recRegister
      .find({ ID_Rec: regex }) // ค้นหาตาม ID_Rec
      .sort({ ID_Rec: -1 })  // เรียงจากรหัสล่าสุด
      .limit(1);

    let running = 1;
    if (latest.length > 0) {
      // ถ้ามีข้อมูลล่าสุด, หาค่า running number จากรหัสล่าสุด
      const lastID = latest[0].ID_Rec;
      const lastRunning = parseInt(lastID.slice(-3), 10); // ตัดเอาเลข 3 หลักสุดท้าย
      running = lastRunning + 1; // เพิ่ม 1 สำหรับรหัสถัดไป
    }

    const newID = `${empPrefix}${datePart}${String(running).padStart(3, '0')}`;  
    // รูปแบบ: REC01SF25040012404001

    return new Response(JSON.stringify({ newID }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('เกิดข้อผิดพลาดในการสร้าง newID:', err);

    return new Response(
      JSON.stringify({
        error: 'เกิดข้อผิดพลาดในการสร้าง newID',
        details: err.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
