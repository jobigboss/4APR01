"use client";
import React, { useEffect, useState } from 'react';

function MarkStep5({ formData, onSubmit, onPrev }) {
  const [positions, setPositions] = useState([]);
  const [agreed, setAgreed] = useState(false); // ✅ สถานะ checkbox

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await fetch('/api/position/get');
        const data = await res.json();
        setPositions(data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงตำแหน่งงาน", error);
      }
    };

    fetchPositions();
  }, []);

  const selectedPositionName = positions.find(
    (pos) => pos.ID_Position === formData.selectedPosition
  )?.Position_name || formData.selectedPosition;

  const handleSubmit = () => {
    if (!agreed) {
      alert("กรุณายืนยันว่าคุณได้อ่านและยินยอมตามเงื่อนไข");
      return;
    }
    onSubmit();
  };

  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-6 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">ตรวจสอบข้อมูล</h2>

      <div className="space-y-4">
        <p><strong>ตำแหน่งงานที่สมัคร :</strong> {selectedPositionName}</p>
        <p><strong>ชื่อ-สกุล :</strong> {formData.regFrish_Name_TH} {formData.regLast_Name_TH}</p>
        <p><strong>ชื่อเล่น :</strong> {formData.regNick_Name}</p>
        <p><strong>เบอร์โทร :</strong> {formData.regTel}</p>
      </div>

      {/* ✅ เงื่อนไขและข้อตกลง */}
      <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
        <h3 className="font-semibold mb-2">เงื่อนไขและข้อตกลง (PDPA)</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            ข้าพเจ้าตกลงและยินยอมให้บริษัทผู้ว่าจ้าง เก็บ รวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้า
            รวมถึงเอกสารประกอบการสมัครงาน เพื่อวัตถุประสงค์ในการพิจารณาคัดเลือก เข้าทำงาน และวัตถุประสงค์อื่นที่เกี่ยวข้อง
            ตามที่กฎหมายว่าด้วยการคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 กำหนด
          </li>
          <li>
            ข้าพเจ้าขอยืนยันว่าข้อมูลที่ให้ไว้ทั้งหมดเป็นความจริง หากตรวจสอบภายหลังพบว่าข้อมูลเป็นเท็จ
            บริษัทมีสิทธิ์ปฏิเสธการสมัครงานหรือเลิกจ้างโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
          </li>
        </ol>

        {/* ✅ Checkbox */}
        <div className="mt-4 flex items-start gap-2">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="agree" className="text-sm">
            ข้าพเจ้าได้อ่านและยินยอมตามเงื่อนไขและข้อตกลงข้างต้น
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg"
          onClick={onPrev}
        >
          ย้อนกลับ
        </button>

        <button
          className={`py-3 px-4 rounded-lg text-white ${agreed ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}`}
          onClick={handleSubmit}
          disabled={!agreed}
        >
          ส่งใบสมัคร
        </button>
      </div>
    </div>
  );
}

export default MarkStep5;
