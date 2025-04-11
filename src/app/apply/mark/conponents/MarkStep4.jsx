"use client";
import React from 'react';

function Step3({ formData, onSubmit, onPrev }) {
  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-6 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">ข้อมูลที่กรอก</h2>

      <div className="space-y-4">
        <p><strong>ตำแหน่งงานที่สมัคร:</strong> {formData.selectedPosition}</p>
        <p><strong>เลขบัตรประชาชน:</strong> {formData.idCard}</p>
        <p><strong>ชื่อ (ภาษาไทย):</strong> {formData.firstNameTH}</p>
        <p><strong>นามสกุล (ภาษาไทย):</strong> {formData.lastNameTH}</p>
        <p><strong>ชื่อ (ภาษาอังกฤษ):</strong> {formData.firstNameEN}</p>
      </div>

      <div className="flex justify-between">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg"
          onClick={onPrev}
        >
          ย้อนกลับ
        </button>

        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg"
          onClick={onSubmit}
        >
          ส่งใบสมัคร
        </button>
      </div>
    </div>
  );
}

export default Step3;
