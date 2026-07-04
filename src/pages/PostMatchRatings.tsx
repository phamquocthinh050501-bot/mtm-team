import { useState, useMemo } from "react";
import { MOCK_PLAYERS } from "../data/mockData";

export const PostMatchRatings = () => {
  // 1. KHỞI TẠO STATE CHẤM ĐIỂM (Giả lập điểm nền ngẫu nhiên từ 6.0 đến 8.5 để UI không bị trống)
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    MOCK_PLAYERS.forEach((p, index) => {
      // Giả lập điểm base: anh em đá khá mặc định 7.0, anh em đá hay 8.0
      initial[p.id] = 6.5 + (index % 4) * 0.5;
    });
    // Gán 1 ông điểm rất cao để làm MVP demo
    if (MOCK_PLAYERS[0]) initial[MOCK_PLAYERS[0].id] = 9.2;
    return initial;
  });

  // 2. HÀM TÍNH TOÁN MÀU SẮC DỰA TRÊN ĐIỂM SỐ (Chuẩn thuật toán SofaScore/FotMob)
  const getRatingColor = (score: number) => {
    if (score >= 8.5) return "bg-blue-600 text-white border-blue-700"; // Xanh dương (Xuất sắc)
    if (score >= 7.0) return "bg-emerald-500 text-white border-emerald-600"; // Xanh lá (Khá/Tốt)
    if (score >= 6.0) return "bg-amber-400 text-blue-950 border-amber-500"; // Vàng (Trung bình)
    return "bg-rose-500 text-white border-rose-600"; // Đỏ (Tệ)
  };

  // 3. TÌM MVP (Người cao điểm nhất)
  const mvpId = useMemo(() => {
    return Object.keys(ratings).reduce((a, b) =>
      ratings[a] > ratings[b] ? a : b,
    );
  }, [ratings]);

  const mvpPlayer = MOCK_PLAYERS.find((p) => p.id === mvpId);

  // 4. XỬ LÝ KÉO THANH TRƯỢT
  const handleSliderChange = (id: string, value: string) => {
    setRatings((prev) => ({ ...prev, [id]: parseFloat(value) }));
  };

  return (
    <div className="space-y-6 font-sans max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-blue-950 uppercase">
            ĐÁNH GIÁ PHONG ĐỘ
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Trận gần nhất: MTM FC 5 - 3 NIGHT OWL FC
          </p>
        </div>
        <button className="bg-blue-950 text-white px-4 py-2 rounded font-bold text-xs hover:bg-blue-900 transition-colors shadow-sm">
          GỬI ĐÁNH GIÁ (LƯU)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KHU VỰC 1: VINH DANH MVP (Cột trái) */}
        {mvpPlayer && (
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">
              Cầu thủ xuất sắc nhất
            </h3>

            {/* THẺ BÀI MOTM (Man of the Match) */}
            <div className="bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 rounded-xl p-1 shadow-lg transform hover:-translate-y-1 transition-transform">
              <div className="bg-white/10 backdrop-blur-sm border border-white/40 rounded-lg p-5 flex flex-col items-center relative overflow-hidden text-center h-full min-h-[260px] justify-center">
                {/* Vương miện mờ */}
                <span className="absolute top-2 right-2 text-4xl opacity-20">
                  👑
                </span>

                <p className="text-xs font-black text-amber-900 tracking-widest uppercase mb-2">
                  MVP OF THE MATCH
                </p>

                {/* Áo đấu */}
                <div className="w-16 h-20 bg-blue-950 rounded-b-md flex items-center justify-center border-2 border-white shadow-md relative z-10">
                  <span className="text-2xl font-black text-white">
                    {mvpPlayer.jerseyNumber}
                  </span>
                </div>

                <h3 className="text-xl font-black text-blue-950 uppercase mt-4">
                  {mvpPlayer.name}
                </h3>

                {/* Điểm số MVP to bự */}
                <div className="mt-4 bg-blue-950 text-amber-400 text-3xl font-black px-4 py-1.5 rounded-lg shadow-inner font-mono border-b-4 border-blue-900 flex items-center gap-2">
                  <span>⭐</span> {ratings[mvpPlayer.id].toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KHU VỰC 2: DANH SÁCH CHẤM ĐIỂM (Cột phải) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-sm font-bold text-blue-950 uppercase tracking-tight">
              Thang điểm 10.0
            </h3>
            <span className="text-[10px] uppercase font-bold text-slate-400 bg-white border px-2 py-0.5 rounded">
              Cộng đồng Vote
            </span>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto max-h-[500px]">
            {MOCK_PLAYERS.map((player) => {
              const score = ratings[player.id] || 6.0;
              const isMVP = player.id === mvpId;

              return (
                <div
                  key={player.id}
                  className={`p-4 transition-colors ${isMVP ? "bg-amber-50/30" : "hover:bg-slate-50"}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Thẻ Điểm Động */}
                    <div
                      className={`w-11 h-8 rounded border-b-2 flex items-center justify-center font-mono font-black text-sm shadow-sm transition-colors ${getRatingColor(score)}`}
                    >
                      {score.toFixed(1)}
                    </div>

                    {/* Thông tin cầu thủ */}
                    <div className="w-32 truncate">
                      <h4 className="text-sm font-bold text-slate-800 uppercase flex items-center gap-1">
                        {player.name}{" "}
                        {isMVP && (
                          <span className="text-amber-500 text-[10px]">👑</span>
                        )}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium">
                        Số {player.jerseyNumber}
                      </p>
                    </div>

                    {/* Thanh trượt chấm điểm (Slider) */}
                    <div className="flex-1 flex items-center gap-3">
                      <span className="text-[10px] font-bold text-slate-300">
                        1.0
                      </span>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.1"
                        value={score}
                        onChange={(e) =>
                          handleSliderChange(player.id, e.target.value)
                        }
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="text-[10px] font-bold text-slate-300">
                        10
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
