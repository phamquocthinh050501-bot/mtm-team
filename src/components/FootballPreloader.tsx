import { useEffect, useState } from "react";

export const FootballPreloader = () => {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1. Sau 1.8 giây, bắt đầu kích hoạt hiệu ứng mờ dần (Fade out)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    // 2. Sau 2.3 giây (khi hiệu ứng mờ kết thúc), xóa hoàn toàn Component khỏi DOM
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 2300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 bg-blue-950 z-[9999] flex flex-col items-center justify-center font-sans text-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* KHỐI BIỂU TƯỢNG CHIẾN THUẬT & ÁO ĐẤU */}
      <div className="relative w-16 h-16 mb-5 flex items-center justify-center select-none">
        {/* Vòng tròn quỹ đạo sơ đồ chạy xung quanh (Xoay chậm) */}
        <div className="absolute inset-0 border border-dashed border-blue-800 rounded-full animate-spin [animation-duration:8s]"></div>

        {/* Điểm nhấn chấm chiến thuật trên vòng tròn */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/40 rounded-full"></div>

        {/* Chiếc áo đấu MTM mini màu Trắng ở lõi (Chuyển động nẩy nhẹ) */}
        <div className="w-6 h-8 bg-white rounded-b-sm flex items-center justify-center relative shadow-lg border border-slate-200 animate-bounce">
          {/* Cổ áo vát chữ V nhỏ tinh tế */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-1 bg-blue-950 rounded-b-sm"></div>
          {/* Chữ M đại diện cho MTM in mono siêu nhỏ */}
          <span className="text-[11px] font-bold text-blue-950 font-mono mt-1">
            M
          </span>
        </div>
      </div>

      {/* CHỮ THƯƠNG HIỆU ĐẬP KHỐI KHOẺ KHOẮN */}
      <div className="text-center space-y-1">
        <h1 className="text-sm font-bold tracking-[0.3em] text-white uppercase">
          MTM FOOTBALL
        </h1>
        <p className="text-[11.5px] tracking-[0.4em] text-blue-300/40 font-mono uppercase">
          LOADING SYSTEM
        </p>
      </div>

      {/* BA CHẤM ĐỘNG LỰC HỌC THỂ THAO */}
      <div className="flex gap-1.5 mt-5">
        <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};
