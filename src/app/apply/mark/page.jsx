import React from 'react';
import Container from '../conponents/Container';
import Image from 'next/image';
import MarkMultistepForm from './conponents/MarkMultistepForm';

function MarkRecruitmentPang() {
  return (
    <Container>
    {/* ส่วนที่แสดงโลโก้และชื่อ */}
    <div className="flex flex-col justify-center items-center mt-15">
      <div className="flex items-center justify-center mb-6">
        <Image 
          src="/SFLogo.png" // รูปภาพใน public
          alt="SF Logo" 
          width={350} // ระบุความกว้างของภาพ
          height={38} // ระบุความสูงของภาพ
          className="shadow-xl"
          layout="intrinsic" // ให้ภาพปรับขนาดตามอัตราส่วน
        />
      </div>
        <h1 className="text-3xl sm:text-5xl font-medium text-black">ใบสมัครงาน</h1>

        <div className="w-full h-auto flex justify-center items-center mt-5">
          <div className="w-full max-w-lg bg-white  rounded-xl shadow-lg space-y-6">
            <MarkMultistepForm />
          </div>
      </div>
    </div>
  
    
  </Container>
  
  );
}

export default MarkRecruitmentPang;
