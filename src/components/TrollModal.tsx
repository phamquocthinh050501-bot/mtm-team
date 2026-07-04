import { useState, useEffect } from "react";

interface TrollModalProps {
  type: "paywall" | "strava" | "var";
  isOpen: boolean;
  onClose: () => void;
}

export const TrollModal = ({ type, isOpen, onClose }: TrollModalProps) => {
  // 1. Mặc định state luôn là true
  const [isVarChecking, setIsVarChecking] = useState(true);

  // 2. useEffect BÂY GIỜ CHỈ ĐẢM NHẬN NHIỆM VỤ CHẠY TIMER (Bất đồng bộ - Không bị lỗi)
  useEffect(() => {
    if (type === "var" && isOpen) {
      const timer = setTimeout(() => setIsVarChecking(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [type, isOpen]);

  // 3. Tạo hàm đóng Popup riêng biệt: Vừa tắt popup, vừa reset lại VAR
  const handleClose = () => {
    setIsVarChecking(true); // Khôi phục trạng thái load vòng quay cho lần bẫy sau
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-blue-950/80 backdrop-blur-sm p-4 font-sans animate-fade-in-up">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-200 transform transition-all">
        {/* KỊCH BẢN 1: NẠP TIỀN VIP */}
        {type === "paywall" && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💎</span>
            </div>
            <h3 className="text-lg font-bold text-blue-950 uppercase tracking-tight">
              TÀI KHOẢN CHƯA NÂNG CẤP
            </h3>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              Bạn đang sử dụng gói Miễn phí. Để đổi tên hoặc cấu hình đội hình,
              vui lòng nạp{" "}
              <strong className="text-rose-600">500.000 VNĐ</strong> để lên hạng
              VIP Pro.
            </p>
            <div className="mt-5 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-[10px] font-mono text-slate-400 uppercase">
                Quét mã QR để thanh toán
              </p>
              <div className="w-32 h-32 bg-slate-200 mx-auto mt-2 flex items-center justify-center rounded border border-slate-300">
                <span className="text-xs text-slate-500 font-mono">
                  [ẢNH QR CODE]
                </span>
              </div>
            </div>
            {/* THAY onClick={onClose} BẰNG onClick={handleClose} */}
            <button
              onClick={handleClose}
              className="w-full mt-4 bg-blue-950 text-white py-2.5 rounded font-bold text-sm hover:bg-blue-900 transition-colors"
            >
              ĐÃ HIỂU VÀ QUAY LẠI
            </button>
          </div>
        )}

        {/* KỊCH BẢN 2: CHƯA CHẠY STRAVA */}
        {type === "strava" && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏃‍♂️</span>
            </div>
            <h3 className="text-lg font-bold text-blue-950 uppercase tracking-tight">
              CẢNH BÁO THỂ LỰC YẾU
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Hệ thống không ghi nhận đủ{" "}
              <strong className="text-orange-600">5km track log</strong> của bạn
              trên ứng dụng Strava trong tuần này.
            </p>
            <div className="bg-orange-50 border border-orange-200 text-orange-800 text-xs p-3 rounded-md mt-4 font-medium text-left">
              Hệ thống tự động khóa chức năng chỉnh sửa thông số với các cá nhân
              có dấu hiệu trốn tập thể lực. Vui lòng xách giày ra sân ngay lập
              tức!
            </div>
            {/* THAY onClick={onClose} BẰNG onClick={handleClose} */}
            <button
              onClick={handleClose}
              className="w-full mt-4 bg-slate-200 text-slate-800 py-2.5 rounded font-bold text-sm hover:bg-slate-300 transition-colors"
            >
              HỦY THAO TÁC
            </button>
          </div>
        )}

        {/* KỊCH BẢN 3: VAR CHECKING */}
        {type === "var" && (
          <div className="p-6 text-center min-h-[250px] flex flex-col justify-center">
            {isVarChecking ? (
              <div className="space-y-4">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                <h3 className="text-lg font-black text-blue-950 uppercase animate-pulse">
                  VAR ĐANG VÀO CUỘC...
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Đang kiểm tra tính hợp lệ của thao tác
                </p>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in-up">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl">📺</span>
                </div>
                <h3 className="text-lg font-black text-rose-600 uppercase tracking-tight">
                  YÊU CẦU BỊ TỪ CHỐI
                </h3>
                <p className="text-sm text-slate-600">
                  Tổ trọng tài VAR xác định bạn không đủ tiền bôi trơn hệ thống.
                  Các thao tác can thiệp đội hình đã bị vô hiệu hóa.
                </p>
                {/* THAY onClick={onClose} BẰNG onClick={handleClose} */}
                <button
                  onClick={handleClose}
                  className="w-full mt-4 bg-rose-600 text-white py-2.5 rounded font-bold text-sm hover:bg-rose-700 transition-colors"
                >
                  ĐÓNG (THẺ ĐỎ)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
