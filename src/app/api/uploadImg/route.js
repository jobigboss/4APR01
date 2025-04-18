import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(req) {
  try {
    const { base64Image, imageName } = await req.json();

    if (!base64Image || !imageName) {
      return new Response(JSON.stringify({ success: false, message: 'Missing data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const buffer = Buffer.from(base64Image, 'base64');

    // สร้าง path ของโฟลเดอร์ public/img_rec
    const uploadDir = path.join(process.cwd(), 'public', 'img_rec');

    // ถ้ายังไม่มีโฟลเดอร์ img_rec ให้สร้าง
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // กำหนด path ของไฟล์
    const filePath = path.join(uploadDir, imageName);
    await writeFile(filePath, buffer);

    // คืนค่า URL สำหรับภาพ
    return new Response(JSON.stringify({
      success: true,
      imageUrl: `/img_rec/${imageName}`,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Internal Server Error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
