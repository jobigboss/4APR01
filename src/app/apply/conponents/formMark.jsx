import React from 'react';
import Container from './Container';

function FormMark() {
  return (
    <form className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-6 mx-auto">
        <div>
            <label className="block text-gray-700 font-medium mb-2">เลขบัตรประชาชน</label>
            <input 
            type="text" 
            name="idCard" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="กรอกเลขบัตรประชาชน"
            />
        </div>
        <div>
            <label className="block text-gray-700 font-medium mb-2">ชื่อ (ภาษาไทย)</label>
            <input 
            type="text" 
            name="firstNameTH" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="กรอกชื่อภาษาไทย"
            />
        </div>
        <div>
            <label className="block text-gray-700 font-medium mb-2">นามสกุล (ภาษาไทย)</label>
            <input 
            type="text" 
            name="lastNameTH" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="กรอกนามสกุลภาษาไทย"
            />
        </div>
        <div>
            <label className="block text-gray-700 font-medium mb-2">ชื่อ (ภาษาอังกฤษ)</label>
            <input 
            type="text" 
            name="firstNameEN" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="กรอกชื่อภาษาอังกฤษ"
            />
        </div>
        <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-xl transition duration-200"
        >
            ส่งใบสมัคร
        </button>
    </form>

  );
}

export default FormMark;
