"use client";
import React, { useState, useEffect ,useRef } from "react";
import { RiCameraAiLine } from "react-icons/ri";

function MarkStep4({ onNext, onPrev, formData, setFormData }) {
    const [capturedImage, setCapturedImage] = useState(null);
    const fileInputRef = useRef(null); // Create ref for file input
    const [imageError, setImageError] = useState(""); // Initialize the state for imageError


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    onNext();
  };

  const showOtherInput =
    formData.recPhysical_Ipairment === "อื่น ๆ" ||
    formData.recPhysical_Ipairment === "อื่นๆ";

  const showCongenitalDiseaseInput = formData.recCongenital_Dseases === "มี";

  const showCriminalRecordInput = formData.recCriminal_Rcord === "มี";

  const showTattooInput = formData.recTattoo === "มี";
  
  const handleCapture = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Check file size (limit to 3MB)
      if (file.size > 3 * 1024 * 1024) {
        setImageError("ขนาดไฟล์ต้องไม่เกิน 3MB");
        setCapturedImage(null); // Reset captured image
        return;
      }

      setImageError(""); // Clear any previous error

      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click(); // เรียกใช้ input file เมื่อกดปุ่มถ่ายภาพ
  };

  useEffect(() => {
    if (capturedImage) {
      setFormData((prev) => ({
        ...prev,
        recCapturedImage: capturedImage, // หรือเปลี่ยนชื่อ key ตามที่ต้องการ
      }));
    }
  }, [capturedImage]);

  
 

  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-6 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        ประวัติเพิ่มเติม
      </h2>

      {/* ความบกพร่องทางร่างกาย */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          ความบกพร่องทางร่างกาย
        </label>
        <div className="space-y-2">
          <select
            name="recPhysical_Ipairment"
            value={formData.recPhysical_Ipairment}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">เลือกความบกพร่องทางร่างกาย</option>
            <option value="ไม่มี">ไม่มี</option>
            <option value="บกพร่องทางการมองเห็น">บกพร่องทางการมองเห็น</option>
            <option value="บกพร่องทางการได้ยิน">บกพร่องทางการได้ยิน</option>
            <option value="บกพร่องทางด้านอารมณ์">บกพร่องทางด้านอารมณ์</option>
            <option value="อื่น ๆ">อื่น ๆ</option>
          </select>

          {/* ช่องกรอก "อื่น ๆ" */}
          {showOtherInput && (
            <input
              type="text"
              name="recPhysical_Ipairment_other"
              value={formData.recPhysical_Ipairment_other || ""}
              onChange={handleChange}
              placeholder="กรุณาระบุเพิ่มเติม"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
        </div>
      </div>

      {/* ท่านมีโรคประจำตัวหรือไม่ */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          ท่านมีโรคประจำตัวหรือไม่
        </label>
        <div className="space-y-2">
          <select
            name="recCongenital_Dseases"
            value={formData.recCongenital_Dseases}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">เลือก</option>
            <option value="ไม่มี">ไม่มี</option>
            <option value="มี">มี</option>
          </select>

          {/* ช่องกรอกโรคประจำตัว */}
          {showCongenitalDiseaseInput && (
            <input
              type="text"
              name="recCongenital_Dseases_other"
              value={formData.recCongenital_Dseases_other || ""}
              onChange={handleChange}
              placeholder="กรุณาระบุโรคประจำตัว"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
        </div>
      </div>

      {/* ท่านมีประวัติอาชญากรรมหรือไม่ */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          ท่านมีประวัติอาชญากรรมหรือไม่
        </label>
        <div className="space-y-2">
          <select
            name="recCriminal_Rcord"
            value={formData.recCriminal_Rcord}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">เลือก</option>
            <option value="ไม่มี">ไม่มี</option>
            <option value="มี">มี</option>
          </select>

          {/* ช่องกรอกประวัติอาชญากรรม */}
          {showCriminalRecordInput && (
            <input
              type="text"
              name="recCriminal_Rcord_other"
              value={formData.recCriminal_Rcord_other || ""}
              onChange={handleChange}
              placeholder="กรุณาระบุประวัติอาชญากรรม"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
        </div>
      </div>

      {/* ท่านมีรอยสักนอกร่มผ้าหรือไม่ */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          ท่านมีรอยสักนอกร่มผ้าหรือไม่
        </label>
        <div className="space-y-2">
          <select
            name="recTattoo"
            value={formData.recTattoo}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">เลือก</option>
            <option value="ไม่มี">ไม่มี</option>
            <option value="มี">มี</option>
          </select>

          {/* ช่องกรอกรอยสัก */}
          {showTattooInput && (
            <input
              type="text"
              name="recTattoo_other"
              value={formData.recTattoo_other || ""}
              onChange={handleChange}
              placeholder="กรุณาระบุรอยสัก"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
        </div>
      </div>

      {/* ท่านมีรถจักรยานยนต์หรือไม่ */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          ท่านมีรถจักรยานยนต์หรือไม่
        </label>
        <select
          name="recMotorcycle"
          value={formData.recMotorcycle}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">เลือก</option>
          <option value="ไม่มี">ไม่มี</option>
          <option value="มี">มี</option>
        </select>
      </div>

      {/* ท่านมีใบอนุญาตขับขี่รถจักรยานยนต์หรือไม่ */}

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            ท่านมีใบอนุญาตขับขี่รถจักรยานยนต์หรือไม่
          </label>
          <select
            name="recMotorcycleLicense"
            value={formData.recMotorcycleLicense}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">เลือก</option>
            <option value="ไม่มี">ไม่มี</option>
            <option value="มี">มี</option>
          </select>
        </div>


      {/* ท่านมีรถยนต์หรือไม่ */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          ท่านมีรถยนต์หรือไม่
        </label>
        <select
          name="recCar"
          value={formData.recCar}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">เลือก</option>
          <option value="ไม่มี">ไม่มี</option>
          <option value="มี">มี</option>
        </select>
      </div>

      {/* ท่านมีใบอนุญาตขับขี่รถยนต์หรือไม่ */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            ท่านมีใบอนุญาตขับขี่รถยนต์หรือไม่
          </label>
          <select
            name="recCarLicense"
            value={formData.recCarLicense}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">เลือก</option>
            <option value="ไม่มี">ไม่มี</option>
            <option value="มี">มี</option>
          </select>
        </div>

           {/* ถ่ายภาพยืนยันตัวตน */}
      <div className="flex flex-col items-center">
        <label className="block text-gray-700 font-medium mb-2">
          ถ่ายภาพยืนยันตัวตน
        </label>
        <div className="flex items-center space-x-4">
          {/* ปุ่มถ่ายภาพ */}
          {!capturedImage ? (
            <button
              type="button"
              onClick={handleCameraClick}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 flex items-center"
            >
              <RiCameraAiLine className="mr-2" />
              ถ่ายภาพ
            </button>
          ) : (
            <div className="relative">
              <img
                src={capturedImage}
                alt="Captured"
                className="w-40 h-40 object-cover rounded-lg shadow"
              />
              <button
                type="button"
                onClick={() => setCapturedImage(null)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-sm hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}

          {/* input ซ่อน */}
          <input
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleCapture}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
      </div>

      {/* ปุ่มนำทาง */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-xl transition duration-200"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={handleNext}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-xl transition duration-200"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}

export default MarkStep4;
