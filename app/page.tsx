"use client";

import { useState } from 'react';
import data from './data.json';

export default function Home() {
  // สร้าง State สำหรับเก็บหมวดหมู่ที่ถูกเลือก (ค่าเริ่มต้นคือ "All")
  const [activeCategory, setActiveCategory] = useState('All');

  // ดึงชื่อหมวดหมู่ทั้งหมดจาก data มาทำให้ไม่ซ้ำกัน (Unique)
  const categories = ['All', ...Array.from(new Set(data.map(item => item.category)))];

  // กรองข้อมูลสินค้าตามหมวดหมู่ที่เลือก
  const filteredData = activeCategory === 'All' 
    ? data 
    : data.filter(item => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-gray-50 p-4 font-sans pb-10">
      <div className="max-w-md mx-auto">
        
        {/* Header ของร้าน */}
        <header className="text-center mb-6 pt-6">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Khong-Dee</h1>
          <p className="text-gray-500 text-sm mt-2 font-medium mb-5">
            คัดไอเทมเด็ด อัปเกรดชีวิตเด็กหอสายมินิมอล และไอเทมล้ำๆ
          </p>
          
          {/* Social Media Links */}
          <div className="flex justify-center gap-4">
            <a href="https://facebook.com/ลิงก์เพจของคุณ" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white rounded-full shadow-sm text-blue-600 hover:bg-blue-50 transition-colors border border-gray-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </a>
            <a href="https://tiktok.com/@ยูสเซอร์ของคุณ" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white rounded-full shadow-sm text-gray-900 hover:bg-gray-100 transition-colors border border-gray-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
            </a>
          </div>
        </header>

        {/* Categories Filter (Scrollable) */}
        <div className="flex overflow-x-auto pb-4 mb-2 hide-scrollbar gap-2 snap-x">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors snap-start ${
                activeCategory === category
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category === 'All' ? 'ทั้งหมด' : category}
            </button>
          ))}
        </div>

        {/* ลูปแสดงรายการสินค้า (ที่ถูกกรองแล้ว) */}
        <div className="space-y-5">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-transform hover:scale-[1.02]">
                <div className="w-full h-56 bg-gray-100 relative">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md w-fit mb-3 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h2 className="text-[15px] font-semibold text-gray-800 line-clamp-2 leading-snug mb-2">
                    {item.name}
                  </h2>
                  <p className="text-lg font-bold text-orange-600 mt-auto mb-4">
                    ฿{item.price_range}
                  </p>
                  <a href={item.affiliateUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-gray-900 hover:bg-gray-800 text-white text-center py-3 rounded-xl font-semibold transition-colors text-sm shadow-md">
                    ดูรายละเอียดใน Shopee
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              ไม่พบสินค้าในหมวดหมู่นี้
            </div>
          )}
        </div>

      </div>
    </main>
  );
}