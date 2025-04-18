import React from 'react';
import LogeSF from '../../../../../public/SFLogo.png';

function ThankYouCard({ formData, profileImageUrl }) {
  return (
    <div className="bg-gradient-to-r from-black to-red-600 p-6 rounded-xl max-w-md mx-auto text-white shadow-xl">
      {/* การ์ดหัว */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={LogeSF}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="text-2xl font-semibold">นาย สุรสิทธิ์ ประเสริฐศรี</p>
          <p className="text-sm">Mr.Surasit Prasertsri</p>
        </div>
      </div>

      {/* ข้อมูลเบอร์ติดต่อ */}
      <div className="mt-2 text-sm">
        <p><strong>เบอร์โทร:</strong>0632295893</p>
        <p><strong>บริษัท:</strong> Mart Samarka Auto Co., Ltd.</p>
      </div>

      {/* ขอบคุณ */}
      <div className="mt-4 text-center">
        <p className="font-semibold">ขอบคุณที่สมัครงานกับเรา!</p>
        <p>เราจะติดต่อกลับไปในเร็ว ๆ นี้</p>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-progress"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 9s linear forwards;
        }
      `}</style>
    </div>
  );
}

export default ThankYouCard;
