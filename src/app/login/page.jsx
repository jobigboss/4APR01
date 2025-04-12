'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUser, FaLock } from 'react-icons/fa';
import Container from './conponents/Container'; // ตรวจสอบ path ให้ถูกต้อง
import LogoSF from '../../../public/SFLogo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonColor, setButtonColor] = useState('bg-green-500');
  const [showPopup, setShowPopup] = useState(false);
  const [nextPage, setNextPage] = useState('');
  const [empFullname, setEmpFullname] = useState(''); // State สำหรับเก็บชื่อเต็มของพนักงาน
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    setButtonColor('bg-gray-400');
  
    console.log('Login attempt:', { username, password });
  
    try {
      const res = await fetch('/api/emp/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
      console.log('Login response:', data);
  
      if (res.ok) {
        setEmpFullname(data.emp_Fullname); // เก็บชื่อเต็มจาก response ของ API
        if (data.emp_Roll === 'REC') {
          setNextPage('/recruitment');
          setShowPopup(true); // แสดง Popup
        } else if (data.emp_Roll === 'PRO') setNextPage('/project');
        else if (data.emp_Roll === 'CEO') setNextPage('/ceo');
        else alert('Role not recognized');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setButtonColor('bg-green-500');
      }, 10000);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // ปิด popup เมื่อคลิก "ตกลง"
    if (nextPage) {
      router.push(nextPage); // ไปหน้าถัดไปหลังจากปิด Popup
    }
  };

  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-white to-green-100 px-4">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10">
          <div className="flex justify-center mb-6">
            <Image src={LogoSF} width={180} alt="LogoSF" />
          </div>

          <h3 className="text-center text-3xl font-bold text-green-800 mb-8">Welcome</h3>

          <form onSubmit={handleLogin}>
            <div className="relative mb-5">
              <FaUser className="absolute left-3 top-3.5 text-green-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full py-2 pl-10 pr-4 rounded-xl focus:outline-none bg-white/70 border border-green-200 focus:ring-2 focus:ring-green-400 text-green-800 placeholder-green-400 shadow-md"
              />
            </div>

            <div className="relative mb-6">
              <FaLock className="absolute left-3 top-3.5 text-green-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full py-2 pl-10 pr-10 rounded-xl focus:outline-none bg-white/70 border border-green-200 focus:ring-2 focus:ring-green-400 text-green-800 placeholder-green-400 shadow-md"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-green-500 hover:text-green-700 text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>



            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-full font-semibold shadow-lg transition-all duration-300 ease-in-out ${buttonColor} ${loading ? 'cursor-not-allowed' : 'hover:bg-green-600 text-white'}`}
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-green-700 mt-6">
            © Copyright 2025 Strikeforce Thailand
          </p>
        </div>
      </div>

      {/* Popup ยินดีต้อนรับ */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-96 bg-white p-8 rounded-xl shadow-lg animate__animated animate__zoomIn animate__delay-1s">
            <h3 className="text-center text-2xl font-bold text-green-800">ยินดีต้อนรับ</h3>
            <h3 className="text-center text-2xl font-bold text-green-800">{empFullname}!</h3>
            <p className="text-center text-green-700 mt-4">เข้าสู่ระบบสำเร็จแล้ว</p>
            <div className="flex justify-center mt-6">
              <button
                onClick={closePopup}
                className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
              >
                ตกลง
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default LoginPage;
