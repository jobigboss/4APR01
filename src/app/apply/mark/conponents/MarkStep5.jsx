"use client"
import React, { useState } from 'react';

function MarkStep5({ formData, onSubmit, onPrev }) {
  const [agreed, setAgreed] = useState(false); // การยอมรับเงื่อนไข
  const [fileInputRef, setFileInputRef] = useState(null); // เก็บที่อยู่ไฟล์
  const [generatedID, setGeneratedID] = useState(null);

  // ฟังก์ชันการอัปโหลดไฟล์
  const handleSubmit = async () => {
    if (!agreed) {
      alert('กรุณายืนยันว่าคุณได้อ่านและยินยอมตามเงื่อนไข');
      return;
    }
  
    try {
      const res = await fetch('/api/gen-rec-id');
  
      // ตรวจสอบว่า response สถานะโอเคหรือไม่
      if (!res.ok) {
        // พยายามดึงข้อความจาก API หรือ JSON หากมี
        let errorDetails = 'Unknown error';
        try {
          // ลองดึงข้อมูลในรูป JSON ถ้าเป็นไปได้
          const jsonError = await res.json();
          errorDetails = JSON.stringify(jsonError);
        } catch (jsonError) {
          // ถ้าไม่สามารถดึง JSON ได้ ลองดึงเป็นข้อความธรรมดา
          try {
            errorDetails = await res.text();
          } catch (textError) {
            errorDetails = 'Unable to extract error details from response';
          }
        }
  
        console.error('API error:', errorDetails);  // แสดงข้อความ error ของ API
        throw new Error('Error generating ID');
      }
  
      // ตรวจสอบการตอบกลับจาก API ว่ามีข้อมูลใหม่ที่สร้างขึ้นหรือไม่
      const data = await res.json();
      if (!data || !data.newID) {
        console.error('Invalid response structure:', data);
        throw new Error('No new ID returned from the server');
      }
  
      const newID = data.newID;
      setGeneratedID(newID); // เก็บ ID ที่สร้างขึ้นใหม่
      console.log('Generated ID:', newID);
  
      const applicationData = {
        ID_Rec: newID, // ใช้ newID ทันทีจาก response
        rec_Date: new Date(),
        ID_Emp: "SF2504001",
        ID_Position: formData.ID_Position,
        recID_Card: formData.recID_Card,
        recPrefix: formData.recPrefix,
        recFirst_Name_TH: formData.recFirst_Name_TH,
        recLast_Name_TH: formData.recLast_Name_TH,
        recFirst_Name_EN: formData.recFirst_Name_EN,
        recLast_Name_EN: formData.recLast_Name_EN,
        recNick_Name: formData.recNick_Name,
        recDate_of_Birth: formData.recDate_of_Birth,
        recAge: formData.recAge,
        recGender: formData.recGender,
        recWeight: formData.recWeight,
        recHeight: formData.recHeight,
        recRace: formData.recRace,
        recNationality: formData.recNationality,
        recReligion: formData.recReligion,
        recPhysical_Ipairment: formData.recPhysical_Ipairment,
        recPhysical_Ipairment_other: formData.recPhysical_Ipairment_other,
        recCongenital_Dseases: formData.recCongenital_Dseases,
        recCongenital_Dseases_other: formData.recCongenital_Dseases_other,
        recCriminal_Rcord: formData.recCriminal_Rcord,
        recCriminal_Rcord_other: formData.recCriminal_Rcord_other,
        recTattoo: formData.recTattoo,
        recTattoo_other: formData.recTattoo_other,
        recMotorcycle: formData.recMotorcycle,
        recMotorcycleLicense: formData.recMotorcycleLicense,
        recCar: formData.recCar,
        recCarLicense: formData.recCarLicense,
        fileInputRef: fileInputRef,
        recEducation: formData.recEducation,
        recWorkHistory: formData.recWorkHistory,
        recWorkExperience: formData.recWorkExperience,
        recTel: formData.recTel,
        recEmail: formData.recEmail,
        recLine: formData.recLine,
        recFacebook: formData.recFacebook,
        recProvice: formData.recProvice,
        recDistrict: formData.recDistrict,
        recSubDistrict: formData.recSubDistrict,
        recPostcode: formData.recPostcode,
        recAddrees1: formData.recAddrees1,
        recInterview1: false,
        recInterview2: false,
        ID_Req: null,
        recWSD: null,
        recED: null,
        recActuality: false,
        proSignature: null,
        ID_Payroll: null,
      };
  
      // ส่งข้อมูลไปยังขั้นตอนต่อไป
      onSubmit(applicationData);
  
    } catch (err) {
      console.error('Error generating ID:', err);
      alert('ไม่สามารถสร้าง ID_Rec ได้ กรุณาลองใหม่');
    }
  };
  
  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-6 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">ตรวจสอบข้อมูล</h2>

      <div className="space-y-4">
        <p><strong>ตำแหน่งงานที่สมัคร :</strong> {formData.selectedPosition}</p>
        <p><strong>ชื่อ-สกุล :</strong> {formData.recFirst_Name_TH} {formData.recLast_Name_TH}</p>
        <p><strong>ชื่อเล่น :</strong> {formData.recNick_Name}</p>
        <p><strong>เบอร์โทร :</strong> {formData.recTel}</p>

        {/* ✅ เงื่อนไขและข้อตกลง (PDPA) */}
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

      </div>

      <div className="flex justify-between">
        <button className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg" onClick={onPrev}>
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
