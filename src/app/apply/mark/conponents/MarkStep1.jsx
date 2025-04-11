"use client";
import React, { useEffect, useState } from 'react';

function MarkStep1({ formData, onNext }) {
  const [selectedPosition, setSelectedPosition] = useState(formData.selectedPosition || ''); // ใช้ค่า formData.selectedPosition หรือใช้ค่าว่างถ้ายังไม่ถูกตั้งค่า
  const [positions, setPositions] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState('');

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await fetch('/api/position/get');
        const data = await res.json();
        setPositions(data); // เก็บข้อมูลตำแหน่งงาน
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงตำแหน่งงาน", error);
      }
    };

    fetchPositions();
  }, []);

  const handlePositionChange = (e) => {
    const positionId = e.target.value;
    setSelectedPosition(positionId); // อัปเดต selectedPosition
    const selectedPos = positions.find((pos) => pos.ID_Position === positionId);
    setSelectedDetail(selectedPos ? selectedPos.Detail_Position : '');
  };

  const handleNext = () => {
    if (selectedPosition) {
      onNext({ selectedPosition }); // ส่ง selectedPosition ไปที่ขั้นตอนถัดไป
    } else {
      alert("กรุณาเลือกตำแหน่งงาน");
    }
  };

  return (
    <div className="w-full max-w-full bg-white p-8 space-y-6 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">เลือกตำแหน่งงาน</h2>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">ตำแหน่งงานที่ต้องการสมัคร</label>
        <select 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedPosition} // ใช้ค่า selectedPosition ที่เลือกไว้
          onChange={handlePositionChange}
        >
         <option value="">เลือกตำแหน่งงาน</option>
          {positions?.filter(p => p.Status).map(pos => (
            <option key={pos._id} value={pos.ID_Position}>
              {pos.Position_name}
            </option>
          ))}

        </select>
      </div>

      {selectedDetail && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">รายละเอียดตำแหน่ง:</h3>
          <p className="text-gray-600 mt-2 break-words whitespace-pre-wrap">
            {selectedDetail || 'ไม่มีรายละเอียด'}
          </p>
        </div>
      )}

      <button
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-xl transition duration-200"
        onClick={handleNext}
      >
        ไปหน้าถัดไป
      </button>
    </div>
  );
}

export default MarkStep1;
