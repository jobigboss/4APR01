"use client";
import React, { useState, useEffect } from 'react';
import { DatePicker } from "antd";
import dayjs from 'dayjs'; // Import dayjs instead of moment

function MarkStep2({ onNext, onPrev, formData, setFormData }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Log when an input value changes
    console.log(`Changed field: ${name}, new value: ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    const formattedDate = date ? date.format('YYYY-MM-DD') : null;
    console.log("Changed Date:", formattedDate);
    setFormData({
      ...formData,
      regDate_of_Birth: formattedDate,
    });
  };

  const handleSelectChange = (name) => (e) => {
    const value = e.target.value;
    console.log(`Select Changed field: ${name}, new value: ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    console.log("Form data before validation:", formData);
  
    const isValid = Object.values(formData).every(value => {
      if (typeof value === 'string') {
        return value && value.trim() !== "";
      }
      // For non-string values, you can simply check if they are truthy
      return value;
    });
    
    if (isValid) {
      console.log("Validation successful. Moving to the next step with data:", formData);
      onNext(formData);
    } else {
      console.log("Validation failed. Some fields are missing or empty.");
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };
  
  
  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-6 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">ข้อมูลส่วนบุคคล</h2>

      <div>
        <label className="block text-gray-700 font-medium mb-2">เลขบัตรประชาชน</label>
        <input 
          type="text" 
          name="recID_Card" 
          value={formData.recID_Card || ''}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="กรอกเลขบัตรประชาชน"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">คำนำหน้า</label>
        <select
          name="recPrefix"
          value={formData.recPrefix || ''}
          onChange={handleSelectChange('regPrefix')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">เลือกคำนำหน้า</option>
          <option value="นาย">นาย (Mr.)</option>
          <option value="นางสาว">นางสาว (Miss)</option>
          <option value="นาง">นาง (Mrs.)</option>
        </select>
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-gray-700 font-medium mb-2">ชื่อ (ภาษาไทย)</label>
          <input 
            type="text" 
            name="recFirst_Name_TH" 
            value={formData.recFirst_Name_TH || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="กรอกชื่อภาษาไทย"
          />
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 font-medium mb-2">นามสกุล (ภาษาไทย)</label>
          <input 
            type="text" 
            name="recLast_Name_TH" 
            value={formData.recLast_Name_TH || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="กรอกนามสกุลภาษาไทย"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-gray-700 font-medium mb-2">Frish Name (ภาษาอังกฤษ)</label>
          <input 
            type="text" 
            name="recFirst_Name_EN" 
            value={formData.recFirst_Name_EN || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="กรอกชื่อภาษาอังกฤษ"
          />
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 font-medium mb-2">Last Name (ภาษาอังกฤษ)</label>
          <input 
            type="text" 
            name="recLast_Name_EN" 
            value={formData.recLast_Name_EN || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="กรอกนามสกุลภาษาอังกฤษ"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">ชื่อเล่น (Nick Name)</label>
        <input 
          type="text" 
          name="recNick_Name" 
          value={formData.recNick_Name || ''}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="กรอกชื่อเล่น (Nick Name)"
        />
      </div>

      <div className="flex space-x-4 justify-center">
        <div className="w-1/3">
          <label className="block text-gray-700 font-medium mb-2">วันเกิด</label>
          <DatePicker
            value={formData.recDate_of_Birth ? dayjs(formData.recDate_of_Birth) : null}
            onChange={handleDateChange}
            maxDate={dayjs("2010-12-31")}
            className="w-full h-12 px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="w-1/4">
          <label className="block text-gray-700 font-medium mb-2">อายุ</label>
          <input
            type="number"
            name="recAge"
            value={formData.recAge || ''}
            onChange={handleChange}
            className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="อายุ"
          />
        </div>

        <div className="w-1/3">
          <label className="block text-gray-700 font-medium mb-2">เพศ (Gender)</label>
          <select
            name="recGender"
            value={formData.recGender || ''}
            onChange={handleSelectChange('regGender')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">กรุณาระบุเพศ</option>
            <option value="ชาย">เพศชาย</option>
            <option value="หญิง">เพศหญิง</option>
            <option value="LGPTQA+">LGPTQA+</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-4 justify-center">
        <div className="w-1/2">
          <label className="block text-gray-700 font-medium mb-2">น้ำหนัก</label>
          <input
            type="number"
            name="recWeight"
            value={formData.recWeight || ''}
            onChange={handleChange}
            className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="น้ำหนัก"
          />
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 font-medium mb-2">ส่วนสูง</label>
          <input
            type="number"
            name="recHeight"
            value={formData.recHeight || ''}
            onChange={handleChange}
            className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="ส่วนสูง"
          />
        </div>
      </div>

      <div className="flex space-x-4 justify-center">
        <div className="w-1/3">
          <label className="block text-gray-700 font-medium mb-2">เชื้อชาติ</label>
          <input
            type="text"
            name="recRace"
            value={formData.recRace || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="กรุณาระบุเชื้อชาติ"
          />
        </div>

        <div className="w-1/3">
          <label className="block text-gray-700 font-medium mb-2">สัญชาติ</label>
          <input
            type="text"
            name="recNationality"
            value={formData.recNationality || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="กรุณาระบุสัญชาติ"
          />
        </div>

        <div className="w-1/3">
          <label className="block text-gray-700 font-medium mb-2">ศาสนา</label>
          <input
            type="text"
            name="recReligion"
            value={formData.recReligion || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="กรุณาระบุศาสนา"
          />
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
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg"
          onClick={handleNext}
        >
          ไปหน้าถัดไป
        </button>
      </div>
    </div>
  );
}

export default MarkStep2;
