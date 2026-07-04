import React, { useState } from "react";
import { MOCK_PLAYERS } from "../data/mockData";
// import type { Player } from "../types";

// Định nghĩa cấu trúc một vị trí trên sân
interface PositionSlot {
  id: string;
  role: string; // Tên vị trí (GK, DF, MF, FW...)
  top: string; // Tọa độ Y (%)
  left: string; // Tọa độ X (%)
}

// Cấu hình tọa độ các sơ đồ tiêu chuẩn
const FORMATIONS: Record<string, PositionSlot[]> = {
  "5-man": [
    { id: "gk", role: "GK", top: "82%", left: "50%" },
    { id: "df", role: "DF", top: "60%", left: "50%" },
    { id: "lm", role: "MF_L", top: "40%", left: "20%" },
    { id: "rm", role: "MF_R", top: "40%", left: "80%" },
    { id: "fw", role: "FW", top: "18%", left: "50%" },
  ],
  "7-man": [
    { id: "gk", role: "GK", top: "85%", left: "50%" },
    { id: "ldf", role: "LCB", top: "65%", left: "28%" },
    { id: "rdf", role: "RCB", top: "65%", left: "72%" },
    { id: "lmf", role: "LM", top: "42%", left: "18%" },
    { id: "cmf", role: "CM", top: "45%", left: "50%" },
    { id: "rmf", role: "RM", top: "42%", left: "82%" },
    { id: "fw", role: "ST", top: "18%", left: "50%" },
  ],
  "11-man": [
    { id: "gk", role: "GK", top: "88%", left: "50%" },
    { id: "lb", role: "LB", top: "68%", left: "15%" },
    { id: "lcb", role: "LCB", top: "70%", left: "38%" },
    { id: "rcb", role: "RCB", top: "70%", left: "62%" },
    { id: "rb", role: "RB", top: "68%", left: "85%" },
    { id: "lcm", role: "LCM", top: "46%", left: "28%" },
    { id: "cm", role: "DM", top: "50%", left: "50%" },
    { id: "rcm", role: "RCM", top: "46%", left: "72%" },
    { id: "lw", role: "LW", top: "22%", left: "20%" },
    { id: "st", role: "ST", top: "16%", left: "50%" },
    { id: "rw", role: "RW", top: "22%", left: "80%" },
  ],
};

export const LineupBuilder = () => {
  const [mode, setMode] = useState<"5-man" | "7-man" | "11-man">("7-man");
  // State lưu thông tin vị trí: { [slotId]: playerId }
  const [lineup, setLineup] = useState<Record<string, string>>({});

  const slots = FORMATIONS[mode];

  const handleAssignPlayer = (slotId: string, playerId: string) => {
    setLineup((prev) => ({ ...prev, [slotId]: playerId }));
  };

  // Lọc ra danh sách cầu thủ chưa được xếp vào sân để tránh trùng lặp
  const getAvailablePlayers = (currentSlotPlayerId: string) => {
    const assignedIds = Object.values(lineup);
    return MOCK_PLAYERS.filter(
      (p) => !assignedIds.includes(p.id) || p.id === currentSlotPlayerId,
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Thanh điều khiển hệ màu Trắng & Navy */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-blue-950 uppercase">
            SA BÀN CHIẾN THUẬT
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Sắp xếp đội hình ra sân trước trận đấu
          </p>
        </div>

        {/* Bộ chuyển đổi chế độ sân 5-7-11 */}
        <div className="flex bg-blue-950/5 p-1 rounded border border-blue-950/10 text-xs font-bold ">
          {(["5-man", "7-man", "11-man"] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                setMode(type);
                setLineup({});
              }}
              className={`px-3 py-1.5 rounded-sm transition-all ${mode === type ? "bg-blue-950 text-white shadow-xs" : "text-blue-950/60 hover:text-blue-950"}`}
            >
              SÂN {type.split("-")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KHU VỰC 1: SÂN CỎ CHIẾN THUẬT (Chiếm 2/3 không gian trên desktop) */}
        <div className="md:col-span-2 bg-emerald-950 rounded-xl aspect-[3/4] relative overflow-hidden border border-emerald-900 shadow-inner p-4 select-none">
          {/* CÁC ĐƯỜNG KẺ SÂN BÓNG BẰNG CSS TOÀN DIỆN */}
          <div className="absolute inset-4 border border-white/10 rounded-sm pointer-events-none">
            {/* Đường giữa sân */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
            {/* Vòng tròn trung tâm */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-full"></div>
            {/* Vòng cấm địa phía trên */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-16 border-x border-b border-white/10"></div>
            {/* Vòng cấm địa phía dưới */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-16 border-x border-t border-white/10"></div>
          </div>

          {/* VỊ TRÍ CÁC CHIẾC ÁO TRÊN SÂN */}
          {slots.map((slot) => {
            const assignedPlayerId = lineup[slot.id];
            const player = MOCK_PLAYERS.find((p) => p.id === assignedPlayerId);
            const availablePlayers = getAvailablePlayers(
              assignedPlayerId || "",
            );

            return (
              <div
                key={slot.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 transition-all"
                style={{ top: slot.top, left: slot.left }}
              >
                {/* Chiếc áo MTM thu nhỏ */}
                <div
                  className={`w-14 h-16 ${player ? "bg-blue-950 border-blue-900" : "bg-white/10 border-white/20 border-dashed"} border flex flex-col items-center justify-center rounded-b-sm relative shadow-sm`}
                >
                  {player ? (
                    <>
                      <span className="text-[7px] font-bold text-blue-200 uppercase tracking-tight truncate w-full text-center px-1 absolute top-1">
                        {player.name.split(" ").pop()}
                      </span>
                      <span className="text-xl  font-black text-white leading-none mt-2">
                        {player.jerseyNumber}
                      </span>
                    </>
                  ) : (
                    <span className="text-[9px]  font-bold text-white/40">
                      {slot.role}
                    </span>
                  )}
                </div>

                {/* Dropdown chọn cầu thủ tích hợp ẩn dưới tên vị trí */}
                <select
                  value={assignedPlayerId || ""}
                  onChange={(e) => handleAssignPlayer(slot.id, e.target.value)}
                  className="mt-1 bg-blue-950/80 text-white text-[9px] font-bold rounded border border-blue-900 px-1 py-0.5 max-w-[70px] text-center focus:outline-none cursor-pointer appearance-none"
                >
                  <option value="">+ Chọn</option>
                  {availablePlayers.map((p) => (
                    <option
                      key={p.id}
                      value={p.id}
                      className="text-slate-900 bg-white"
                    >
                      #{p.jerseyNumber} {p.name}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        {/* KHU VỰC 2: TÓM TẮT ĐỘI HÌNH (Danh sách hiển thị bên cạnh) */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm h-fit">
          <h3 className="text-xs font-bold text-blue-950 tracking-wider uppercase border-b border-slate-100 pb-2 mb-3">
            DANH SÁCH RA SÂN
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto  text-xs">
            {slots.map((slot, index) => {
              const player = MOCK_PLAYERS.find((p) => p.id === lineup[slot.id]);
              return (
                <div
                  key={slot.id}
                  className="flex justify-between items-center py-2 border-b border-slate-50"
                >
                  <span className="text-slate-400 font-bold w-6 text-left">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-blue-950 font-bold w-10 text-left uppercase">
                    {slot.role}
                  </span>
                  <span className="flex-1 text-slate-800 font-sans font-medium text-left truncate pl-2">
                    {player ? (
                      player.name
                    ) : (
                      <span className="text-slate-300 italic">
                        Chưa đăng ký
                      </span>
                    )}
                  </span>
                  {player && (
                    <span className="text-blue-900 bg-blue-50 px-1.5 py-0.5 border border-blue-100 rounded text-[11.5px] font-bold">
                      Số {player.jerseyNumber}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setLineup({})}
            className="w-full mt-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold py-2 rounded text-xs transition-colors"
          >
            XÓA ĐỘI HÌNH LÀM LẠI
          </button>
        </div>
      </div>
    </div>
  );
};
