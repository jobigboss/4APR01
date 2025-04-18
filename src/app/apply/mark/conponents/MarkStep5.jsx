"use client"
import React, { useState } from 'react';
import Card from '../conponents/Crad';

function MarkStep5({ formData, onSubmit, onPrev }) {
  const [agreed, setAgreed] = useState(false); // การยอมรับเงื่อนไข
  const [fileInputRef, setFileInputRef] = useState(null); // เก็บที่อยู่ไฟล์
  const [generatedID, setGeneratedID] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // สถานะการเปิด/ปิด Popup
  
  const handleSubmit = async () => {
    let newID;
    try {
      // ✅ STEP 1: ขอ newID จาก API
      try {
        const idRes = await fetch('/api/gen-rec-id-mark');

        if (!idRes.ok) {
          throw new Error(`API Error: ${idRes.status} ${idRes.statusText}`);
        }

        const resJson = await idRes.json();
        newID = resJson.newID;

        console.log('✅ newID ได้รับ:', newID);

      } catch (err) {
        // จัดการข้อผิดพลาดหากไม่สามารถเรียก API ได้
        console.error('เกิดข้อผิดพลาดในการขอ newID:', err);
        alert('ไม่สามารถขอ newID ได้ กรุณาลองใหม่อีกครั้ง');
      }   

      // ✅ STEP 2: อัปโหลดรูปภาพ ไปเก็บ /public/img_rec โดยค่า จะส่งมาจาก formData.capturedImage
      // STEP 2: อัปโหลดรูปภาพ
      let savedImageUrl = '';
      console.log(formData.recCapturedImage);
      
      // ตรวจสอบว่า formData.recCapturedImage มีค่า
      if (formData.recCapturedImage) {
        const imageName = `${newID}.png`; // สร้างชื่อไฟล์จาก newID
        try {
          // ถ้า base64 มี prefix 'data:image/png;base64,' ให้ลบออก
          const base64Image = formData.recCapturedImage.split(',')[1]; // ลบ header
      
          // อัปโหลดภาพไปยัง API
          const imageRes = await fetch('/api/uploadImg', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              base64Image: base64Image, // ส่งเฉพาะ base64 data
              imageName: imageName,
            }),
          });
      
          const imageData = await imageRes.json();
          if (!imageData.success) throw new Error('Failed to save image');
          savedImageUrl = imageData.imageUrl; // เก็บ URL ของภาพที่อัปโหลด
          console.log('📸 Image saved at:', savedImageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      } else {
        console.log('No captured image found.');
      }
      
      
      // ตรวจสอบค่าของ savedImageUrl และ formData.fileInputRef
      const fileInputRefValue = savedImageUrl || formData.fileInputRef || ''; // ใช้ค่าจาก savedImageUrl หากมี หรือ formData.fileInputRef ถ้าไม่มีก็จะใช้ค่าว่าง
      
      console.log('File Input Reference Value:', fileInputRefValue);     
  

        // ตรวจสอบว่า recEducation และ recWorkHistory เป็น array หรือไม่
        const recEducationArray = Array.isArray(formData.recEducation)
          ? formData.recEducation  // ถ้าเป็น array แล้วไม่ต้องแปลง
          : JSON.parse(formData.recEducation);  // ถ้าเป็น string ให้แปลงเป็น array

        const recWorkHistoryArray = Array.isArray(formData.recWorkHistory)
          ? formData.recWorkHistory  // ถ้าเป็น array แล้วไม่ต้องแปลง
          : JSON.parse(formData.recWorkHistory);  // ถ้าเป็น string ให้แปลงเป็น array

        // ตรวจสอบว่า recEducationArray และ recWorkHistoryArray เป็น Array
        if (!Array.isArray(recEducationArray)) {
          console.error("recEducationArray is not an array");
          return;
        }

        if (!Array.isArray(recWorkHistoryArray)) {
          console.error("recWorkHistoryArray is not an array");
          return;
        } 

          // แปลง Array เป็น String
          const recEducationString = recEducationArray
            .map(item => `${item.school} ${item.degree} ${item.year}`)
            .join("\n");

          const recWorkHistoryString = recWorkHistoryArray
            .map(item => `${item.company} ${item.position} ${item.years}`)
            .join("\n");

          console.log(recEducationString);
          console.log(recWorkHistoryString);

      // ✅ STEP 3: สร้างข้อมูลใบสมัคร และส่งไป MongoDB
      const applicationData = {
        ID_Rec: newID,
        rec_Date: new Date(),
        ID_Emp: "SF2504001",
        ID_Position: formData.selectedPosition || "",
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
        fileInputRef: fileInputRefValue || '', // ป้องกัน undefined
        recEducation: recEducationString,
        recWorkHistory: recWorkHistoryString,
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

      const saveRes = await fetch('/api/recRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      });

      const saveResult = await saveRes.json();
      if (saveResult.success) {
        setIsPopupOpen(true);  // เปิด Popup
        // รีเฟรชหน้าหลังจากแสดง Popup
        setTimeout(() => {
          window.location.reload();
        }, 10000);  // รอ 10 วินาทีเพื่อให้เห็น Popup ก่อนหน้าโหลดใหม่
      } else {
        alert('ส่งข้อมูลไม่สำเร็จ');
      }
    } catch (err) {
      console.error('เกิดข้อผิดพลาด:', err);
    } finally {
      setIsLoading(false); // หยุดการโหลดเมื่อเสร็จสิ้น
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false); // ปิด Popup
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

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <Card />
          <button onClick={closePopup} className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full">X</button>
        </div>
      )}
      
    </div>
  );
}

export default MarkStep5;
