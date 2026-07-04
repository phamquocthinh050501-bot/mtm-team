import { useEffect, useState } from "react";

interface GoalProps {
  scorerName: string;
  assistName?: string;
  minute: number;
  onClose: () => void;
}

export const GoalCelebration = ({
  scorerName,
  assistName,
  minute,
  onClose,
}: GoalProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1. Giữ hiệu ứng hiển thị trong 3.5 giây, sau đó bắt đầu mờ dần
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3500);

    // 2. Sau 4 giây (kết thúc hiệu ứng mờ), xóa hẳn popup khỏi màn hình
    const removeTimer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  return (
    // Lớp phủ nền tối nhẹ, chặn thao tác click tạm thời
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isFadingOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Background flash mờ */}
      <div className="absolute inset-0 bg-blue-950/30"></div>

      {/* THẺ BROADCAST HIỂN THỊ GHI BÀN */}
      <div
        className={`relative flex flex-col items-center justify-center bg-blue-950 text-white min-w-[300px] px-8 py-6 rounded-lg shadow-[0_20px_50px_rgba(30,58,138,0.5)] border-y-2 border-white overflow-hidden transform transition-all duration-500 ease-out ${
          isFadingOut ? "scale-95 translate-y-10" : "scale-100 translate-y-0"
        }`}
        style={{
          animation:
            "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        }}
      >
        {/* HIỆU ỨNG TIA SÁNG LƯỚT QUA (Light Sweep) */}
        <div className="absolute top-0 -inset-full h-full block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>

        {/* Nội dung chính */}
        <div className="relative z-10 text-center w-full">
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="h-px w-12 bg-white/30"></div>
            <span className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 uppercase">
              GOAL!
            </span>
            <div className="h-px w-12 bg-white/30"></div>
          </div>

          <h2 className="text-2xl font-bold tracking-wide mt-2 uppercase">
            {scorerName}
          </h2>

          {assistName && (
            <p className="text-xs text-blue-300 font-medium tracking-wider mt-1 uppercase">
              Kiến tạo: <span className="text-white">{assistName}</span>
            </p>
          )}

          <div className="absolute -top-4 -right-4 bg-white text-blue-950 font-mono font-black text-sm px-2.5 py-1 rounded-bl-lg shadow-sm">
            {minute}'
          </div>
        </div>
      </div>

      {/* Thêm CSS Keyframes cho animation */}
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shimmer {
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
};
