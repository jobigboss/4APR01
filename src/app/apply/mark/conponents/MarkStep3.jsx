"use client";
import React from "react";

// Sample address data for cascading dropdowns
const addressData = {
  "กรุงเทพมหานคร": {
    districts: {
      "พระนคร": {
        subDistricts: {
          "พระบรมมหาราชวัง": "10200",
          "วังบูรพาภิรมย์": "10200"
        }
      },
      "ดุสิต": {
        subDistricts: {
          "ดุสิต": "10300",
          "วชิรบรรเทส": "10300"
        }
      }
    }
  },
  "ชลบุรี": {
    districts: {
      "เมืองชลบุรี": {
        subDistricts: {
          "ชลบุรี": "20000",
          "บางละมุง": "20150"
        }
      },
      "บ้านบึง": {
        subDistricts: {
          "บ้านบึง": "20110"
        }
      }
    }
  }
};

function MarkStep3({ onNext, onPrev, formData, setFormData }) {
  // ----- Education Section Handlers -----
  const handleAddEducation = () => {
    const newEdu = { school: "", degree: "", year: "" };
    setFormData({
      ...formData,
      regEducation: [...(formData.regEducation || []), newEdu],
    });
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = (formData.regEducation || []).filter(
      (_, idx) => idx !== index
    );
    setFormData({
      ...formData,
      regEducation: updatedEducation,
    });
  };

  const handleEduChange = (index, field, value) => {
    const updated = [...(formData.regEducation || [])];
    updated[index][field] = value;
    setFormData({ ...formData, regEducation: updated });
  };

  // ----- Work History Section Handlers -----
  const handleAddWork = () => {
    const newWork = { company: "", position: "", years: "" };
    setFormData({
      ...formData,
      regWorkHistory: [...(formData.regWorkHistory || []), newWork],
    });
  };

  const handleRemoveWork = (index) => {
    const updatedWork = (formData.regWorkHistory || []).filter(
      (_, idx) => idx !== index
    );
    setFormData({
      ...formData,
      regWorkHistory: updatedWork,
    });
  };

  const handleWorkChange = (index, field, value) => {
    const updated = [...(formData.regWorkHistory || [])];
    updated[index][field] = value;
    setFormData({ ...formData, regWorkHistory: updated });
  };

  const handleWorkExperienceChange = (e) => {
    setFormData({
      ...formData,
      regWorkExperience: e.target.value,
    });
  };

  // ----- Contact & Address Handlers -----
  // Generic handler for fields like regTel, regEmail, regLine, regFacebook, etc.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Address handlers with cascading dropdowns
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setFormData({
      ...formData,
      regProvice: province,
      regDistrict: "",
      regSubDistrict: "",
      regPostcode: ""
    });
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setFormData({
      ...formData,
      regDistrict: district,
      regSubDistrict: "",
      regPostcode: ""
    });
  };

  const handleSubDistrictChange = (e) => {
    const subDistrict = e.target.value;
    let postcode = "";
    const province = formData.regProvice;
    const district = formData.regDistrict;
    if (
      addressData[province] &&
      addressData[province].districts[district] &&
      addressData[province].districts[district].subDistricts[subDistrict]
    ) {
      postcode = addressData[province].districts[district].subDistricts[subDistrict];
    }
    setFormData({
      ...formData,
      regSubDistrict: subDistrict,
      regPostcode: postcode
    });
  };

  // Create options for the dropdowns
  const provinceOptions = Object.keys(addressData);
  const districtOptions = formData.regProvice
    ? Object.keys(addressData[formData.regProvice].districts)
    : [];
  const subDistrictOptions =
    formData.regProvice && formData.regDistrict
      ? Object.keys(addressData[formData.regProvice].districts[formData.regDistrict].subDistricts)
      : [];

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg space-y-6 mx-auto">
      {/* Education Section */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        ประวัติการศึกษา
      </h2>
      {(formData.regEducation || []).map((edu, idx) => (
        <div key={idx} className="grid grid-cols-4 gap-4 items-center">
          <input
            type="text"
            placeholder="สถาบัน"
            value={edu.school}
            onChange={(e) => handleEduChange(idx, "school", e.target.value)}
            className="border px-4 py-2 rounded col-span-1"
          />
          <input
            type="text"
            placeholder="วุฒิ"
            value={edu.degree}
            onChange={(e) => handleEduChange(idx, "degree", e.target.value)}
            className="border px-4 py-2 rounded col-span-1"
          />
          <input
            type="text"
            placeholder="ปีที่จบ"
            value={edu.year}
            onChange={(e) => handleEduChange(idx, "year", e.target.value)}
            className="border px-4 py-2 rounded col-span-1"
          />
          <button 
            onClick={() => handleRemoveEducation(idx)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 col-span-1"
          >
            ลบ
          </button>
        </div>
      ))}
      <button
        onClick={handleAddEducation}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        + เพิ่มการศึกษา
      </button>

      {/* Work History Section */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        ประวัติการทำงาน
      </h2>
      {(formData.regWorkHistory || []).map((work, idx) => (
        <div key={idx} className="grid grid-cols-4 gap-4 items-center">
          <input
            type="text"
            placeholder="ชื่อบริษัท"
            value={work.company}
            onChange={(e) => handleWorkChange(idx, "company", e.target.value)}
            className="border px-4 py-2 rounded col-span-1"
          />
          <input
            type="text"
            placeholder="ตำแหน่ง"
            value={work.position}
            onChange={(e) => handleWorkChange(idx, "position", e.target.value)}
            className="border px-4 py-2 rounded col-span-1"
          />
          <input
            type="text"
            placeholder="ระยะเวลา"
            value={work.years}
            onChange={(e) => handleWorkChange(idx, "years", e.target.value)}
            className="border px-4 py-2 rounded col-span-1"
          />
          <button 
            onClick={() => handleRemoveWork(idx)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 col-span-1"
          >
            ลบ
          </button>
        </div>
      ))}
      <button
        onClick={handleAddWork}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        + เพิ่มประสบการณ์ทำงาน
      </button>

      {/* Work Experience Text Area */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          เล่าประสบการณ์การทำงาน
        </label>
        <textarea
          name="regWorkExperience"
          value={formData.regWorkExperience || ""}
          onChange={handleWorkExperienceChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="เล่าประสบการณ์การทำงานของคุณ"
          rows={4}
        />
      </div>

      {/* Contact Information Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          ช่องทางการติดต่อ
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              เบอร์โทร (ต้องกรอก)
            </label>
            <input
              type="text"
              name="regTel"
              value={formData.regTel || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="กรอกเบอร์โทรศัพท์"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email (ถ้ามี)
            </label>
            <input
              type="email"
              name="regEmail"
              value={formData.regEmail || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="กรอก Email ของคุณ"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              LINE (ถ้ามี)
            </label>
            <input
              type="text"
              name="regLine"
              value={formData.regLine || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="กรอก LINE ID"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Facebook (ถ้ามี)
            </label>
            <input
              type="text"
              name="regFacebook"
              value={formData.regFacebook || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="กรอก Facebook ของคุณ"
            />
          </div>
        </div>
      </div>

      {/* Address Section with Cascading Dropdowns */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          ที่อยู่
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              จังหวัด
            </label>
            <select
              name="regProvice"
              value={formData.regProvice || ""}
              onChange={handleProvinceChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">เลือกจังหวัด</option>
              {provinceOptions.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              อำเภอ
            </label>
            <select
              name="regDistrict"
              value={formData.regDistrict || ""}
              onChange={handleDistrictChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={!formData.regProvice}
            >
              <option value="">เลือกอำเภอ</option>
              {districtOptions.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ตำบล
            </label>
            <select
              name="regSubDistrict"
              value={formData.regSubDistrict || ""}
              onChange={handleSubDistrictChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={!formData.regDistrict}
            >
              <option value="">เลือกตำบล</option>
              {subDistrictOptions.map((subDist) => (
                <option key={subDist} value={subDist}>
                  {subDist}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              รหัสไปรษณีย์
            </label>
            <input
              type="text"
              name="regPostcode"
              value={formData.regPostcode || ""}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 shadow-sm focus:outline-none"
              placeholder="รหัสไปรษณีย์จะถูกดึงมาให้โดยอัตโนมัติ"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ที่อยู่
            </label>
            <input
              type="text"
              name="regAddrees1"
              value={formData.regAddrees1 || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="กรอกที่อยู่"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={handleNext}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}

export default MarkStep3;
