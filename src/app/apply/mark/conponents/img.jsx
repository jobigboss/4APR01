'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export default function SelfieCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    };

    const loadModels = async () => {
      const MODEL_URL = '/models'; // ต้องมีโฟลเดอร์ /public/models
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);
      setIsReady(true);
    };

    loadModels();
    startVideo();
  }, []);

  useEffect(() => {
    if (!isReady || captured) return;

    const interval = setInterval(async () => {
      if (!videoRef.current) return;

      const detections = await faceapi.detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (detections) {
        const box = detections.box;
        const video = videoRef.current;

        const centerX = video.videoWidth / 2;
        const centerY = video.videoHeight / 2;

        const inFrame =
          box.x > centerX - 100 &&
          box.x + box.width < centerX + 100 &&
          box.y > centerY - 150 &&
          box.y + box.height < centerY + 150;

        if (inFrame) {
          // ถ่ายภาพอัตโนมัติ
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);

          const base64 = canvas.toDataURL('image/png');
          setCaptured(true);
          onCapture(base64); // ส่งออกไป
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isReady, captured]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="rounded-lg w-full object-cover"
        style={{ height: '400px' }}
      />
      <canvas ref={canvasRef} className="hidden" />
      {/* กรอบ Overlay */}
      <div
        className="absolute border-4 border-green-500 rounded-lg pointer-events-none"
        style={{
          top: '25%',
          left: '25%',
          width: '50%',
          height: '50%',
        }}
      ></div>
      {!captured && (
        <p className="text-center text-sm text-gray-600 mt-2">
          กรุณาอยู่ในกรอบเพื่อถ่ายภาพอัตโนมัติ
        </p>
      )}
      {captured && (
        <p className="text-center text-green-600 mt-2">📸 ถ่ายภาพเรียบร้อยแล้ว!</p>
      )}
    </div>
  );
}
