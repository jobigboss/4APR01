"use client";
import React, { useState } from 'react';
import MarkStep1 from './MarkStep1';
import MarkStep2 from './MarkStep2';
import MarkStep3 from './MarkStep3';
import MarkStep4 from './MarkStep4';

function MarkMultistepForm() {
  const [currentStep, setCurrentStep] = useState(1); // เก็บขั้นตอนปัจจุบัน
  const [formData, setFormData] = useState({

  });

  // ฟังก์ชันสำหรับการไปขั้นตอนถัดไป
  const handleNext = (data) => {
    setFormData({ ...formData, ...data }); // เก็บข้อมูลจากขั้นตอนถัดไป
    setCurrentStep((prevStep) => prevStep + 1); // ไปยังขั้นตอนถัดไป
  };

  // ฟังก์ชันสำหรับย้อนกลับ
  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1); // ย้อนกลับไปขั้นตอนก่อนหน้า
  };

  // ฟังก์ชันส่งข้อมูล
  const handleSubmit = () => {
    console.log(formData);
    alert("ส่งใบสมัครเรียบร้อย");
  };

  return (
    <div>
      {currentStep === 1 && <MarkStep1 formData={formData} onNext={handleNext} />}
      {currentStep === 2 && <MarkStep2 formData={formData} setFormData={setFormData} onNext={handleNext} onPrev={handlePrev} />}
      {currentStep === 3 && <MarkStep3 formData={formData} setFormData={setFormData} onNext={handleNext} onPrev={handlePrev} />}
      {currentStep === 4 && <MarkStep4 formData={formData} onSubmit={handleSubmit} onPrev={handlePrev} />}
    </div>
  );
}

export default MarkMultistepForm;
