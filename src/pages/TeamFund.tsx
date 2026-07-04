import { useState } from "react";
import { MOCK_PLAYERS } from "../data/mockData";

export const TeamFund = () => {
  // Biến điều khiển Modal QR
  const [selectedPlayer, setSelectedPlayer] = useState<{
    name: string;
    amount: number;
  } | null>(null);

  // Dữ liệu giả lập cho Quỹ đội
  const FUND_DATA = {
    balance: 3850000, // Tồn quỹ
    income: 5000000, // Tổng thu
    expense: 1150000, // Tổng chi (Tiền sân, nước...)
    monthlyFee: 150000, // Mức phí đóng mỗi tháng
  };

  // Giả lập trạng thái đóng tiền ngẫu nhiên cho danh sách cầu thủ
  const fundStatusList = MOCK_PLAYERS.map((p, index) => ({
    ...p,
    hasPaid: index % 3 !== 0, // Cứ 3 người thì có 1 người chưa đóng
  }));

  // Hàm định dạng tiền tệ VNĐ
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="space-y-6 font-sans max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-blue-950 uppercase">
            QUẢN LÝ QUỸ ĐỘI
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Báo cáo tài chính & Tình trạng đóng quỹ tháng này
          </p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm">
          + THÊM KHOẢN CHI
        </button>
      </div>

      {/* DASHBOARD TÀI CHÍNH (3 Thẻ Tổng Quan) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Thẻ Tồn Quỹ */}
        <div className="bg-blue-950 rounded-xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900 rounded-full translate-x-10 -translate-y-10 opacity-50"></div>
          <p className="text-xs text-blue-200 font-medium uppercase tracking-wider mb-1 relative z-10">
            Tồn quỹ hiện tại
          </p>
          <h3 className="text-3xl font-black relative z-10">
            {formatVND(FUND_DATA.balance)}
          </h3>
        </div>

        {/* Thẻ Tổng Thu */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
            Tổng thu tháng
          </p>
          <h3 className="text-2xl font-bold text-emerald-600">
            +{formatVND(FUND_DATA.income)}
          </h3>
        </div>

        {/* Thẻ Tổng Chi */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
            Tổng chi tháng
          </p>
          <h3 className="text-2xl font-bold text-rose-600">
            -{formatVND(FUND_DATA.expense)}
          </h3>
        </div>
      </div>

      {/* DANH SÁCH ĐÓNG QUỸ */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-sm font-bold text-blue-950 uppercase">
            Tình trạng đóng quỹ (Tháng này)
          </h3>
          <span className="text-xs font-medium text-slate-500">
            Mức phí:{" "}
            <strong className="text-blue-950">
              {formatVND(FUND_DATA.monthlyFee)}/người
            </strong>
          </span>
        </div>

        <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
          {fundStatusList.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-950 text-sm">
                  {player.jerseyNumber}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    {player.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    ID: {player.id}
                  </p>
                </div>
              </div>

              {/* Trạng thái thanh toán */}
              <div className="flex items-center gap-3">
                {player.hasPaid ? (
                  <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase flex items-center gap-1">
                    ✓ Đã đóng
                  </span>
                ) : (
                  <>
                    <span className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold uppercase">
                      Đang nợ
                    </span>
                    <button
                      onClick={() =>
                        setSelectedPlayer({
                          name: player.name,
                          amount: FUND_DATA.monthlyFee,
                        })
                      }
                      className="bg-blue-950 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-900 transition-colors"
                    >
                      NHẮC NỢ (MÃ QR)
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL MÃ QR ĐỘNG (Hiển thị khi bấm nút Nhắc Nợ) */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-blue-950/80 backdrop-blur-sm p-4 animate-fade-in-up">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-200">
            <div className="bg-blue-950 p-4 text-center">
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                THANH TOÁN QUỸ ĐỘI
              </h3>
              <p className="text-blue-200 text-xs mt-1">
                Quét mã qua ứng dụng ngân hàng
              </p>
            </div>

            <div className="p-6 flex flex-col items-center">
              {/* API tạo mã VietQR tự động */}
              {/* Format: https://img.vietqr.io/image/[BANK_ID]-[ACCOUNT_NO]-compact2.png?amount=[AMOUNT]&addInfo=[CONTENT]&accountName=[NAME] */}
              <div className="w-56 h-56 bg-white p-2 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center mb-4">
                <img
                  src={`https://img.vietqr.io/image/mbbank-00000000000-compact2.png?amount=${selectedPlayer.amount}&addInfo=Dong quy MTM FC ${selectedPlayer.name}&accountName=PHAM QUOC THINH`}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-center w-full bg-slate-50 rounded p-3 border border-slate-100">
                <p className="text-xs text-slate-500 uppercase font-medium">
                  Người nộp
                </p>
                <p className="text-base font-bold text-blue-950 uppercase">
                  {selectedPlayer.name}
                </p>
                <div className="h-px w-full bg-slate-200 my-2"></div>
                <p className="text-xs text-slate-500 uppercase font-medium">
                  Số tiền
                </p>
                <p className="text-xl font-black text-rose-600">
                  {formatVND(selectedPlayer.amount)}
                </p>
              </div>

              <button
                onClick={() => setSelectedPlayer(null)}
                className="w-full mt-5 bg-slate-200 text-slate-800 py-3 rounded font-bold text-sm hover:bg-slate-300 transition-colors"
              >
                ĐÓNG GIAO DIỆN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
