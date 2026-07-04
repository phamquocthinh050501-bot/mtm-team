import React from "react";
import { MOCK_PLAYERS } from "../data/mockData";

export const Roster = () => {
  // Hàm rút gọn tên để in nhiệt lên lưng áo đấu (Vd: "Brandyn Trần" -> "B. TRẦN")
  const formatNameForJersey = (fullName: string) => {
    const parts = fullName.trim().toUpperCase().split(" ");
    if (parts.length > 1) {
      return `${parts[0][0]}. ${parts[parts.length - 1]}`;
    }
    return parts[0];
  };

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header tiêu đề */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-blue-950 uppercase">
            DANH SÁCH ĐỘI HÌNH
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Mùa giải MTM FC • {MOCK_PLAYERS.length} cầu thủ
          </p>
        </div>
        <button className="bg-blue-950 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-blue-900 shadow-sm transition-all">
          + THÊM THÀNH VIÊN
        </button>
      </div>

      {/* 1. LƯỚI GRID FULL BỀ NGANG: Tăng mật độ hiển thị (3 cột trên mobile, lên tới 8 cột trên màn hình lớn) */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-y-8 gap-x-3 w-full justify-items-center">
        {MOCK_PLAYERS.map((player) => (
          <div
            key={player.id}
            className="flex flex-col items-center group w-full max-w-[110px]"
          >
            {/* THAY THẾ KHỐI ÁO ĐẤU TRONG ROSTER.TSX BẰNG MẪU NÀY */}
            {/* THAY THẾ KHỐI ÁO ĐẤU MẪU 2 CŨ BẰNG BẢN TỐI ƯU TƯƠNG PHẢN NÀY */}
            <div className="relative w-28 h-32 flex items-center justify-center select-none font-sans">
              {/* THÂN ÁO CHÍNH - Giữ nền sọc dọc truyền thống */}
              <div className="relative w-20 h-26 bg-white bg-[linear-gradient(to_right,#1e3a8a_33%,transparent_33%,transparent_66%,#1e3a8a_66%)] flex flex-col items-center pt-3 pb-1.5 rounded-b-sm border-x border-b border-blue-900/40 shadow-sm z-10 overflow-hidden">
                {/* Cổ áo tròn phối màu Navy chắc chắn */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-blue-950 rounded-b-full border-b border-blue-900 z-20"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-2 bg-slate-50 rounded-b-full z-20"></div>

                {/* TAY ÁO TRÁI & PHẢI màu Navy giữ nguyên phom vai */}
                <div className="absolute top-0 -left-3.5 w-4 h-9 bg-blue-950 border-l border-b border-blue-900/30 rounded-bl-sm origin-top-right -rotate-[25deg] z-0">
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                </div>
                <div className="absolute top-0 -right-3.5 w-4 h-9 bg-blue-950 border-r border-b border-blue-900/30 rounded-br-sm origin-top-left rotate-[25deg] z-0">
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                </div>

                {/* CẢI TIẾN 1: KHUNG TÊN ĐỒNG KHỐI (Name Banner) */}
                {/* Tạo một dải Navy phẳng đè lên sọc ngang vai, đẩy cỡ chữ lên 12px (text-xs) giúp tên cực kỳ nét */}
                <div className="w-full bg-blue-950 py-0.5 z-10 text-center border-b border-white/10 mt-1 shadow-xs">
                  <span className="text-xs font-bold tracking-wider text-white uppercase block truncate px-1">
                    {formatNameForJersey(player.name)}
                  </span>
                </div>

                {/* CẢI TIẾN 2: Ô SỐ BOX TRUNG TÂM (Number Patch) */}
                {/* Dựng một khối hộp chữ nhật màu Navy phẳng dày dặn ở giữa lưng áo để cô lập số áo khỏi nền sọc nhiễu */}
                <div className="w-12 h-12 bg-blue-950 rounded border border-white/20 flex items-center justify-center my-auto z-10 shadow-inner">
                  <span className="text-2xl font-bold text-white tracking-tight leading-none font-sans">
                    {player.jerseyNumber}
                  </span>
                </div>

                {/* Tag chống hàng giả nguyên bản ở gấu áo */}
                <div className="absolute bottom-0.5 right-1.5 text-[8px] font-mono text-blue-300/20 font-bold z-10">
                  MTM
                </div>
              </div>
            </div>
            {/* 2. KHU VỰC THÔNG TIN & SỐ G/A (Được tối ưu kích thước chữ to rõ ràng) */}
            <div className="mt-2 text-center w-full space-y-1">
              {/* Tên thật cầu thủ */}
              <h4 className="font-bold text-blue-950 text-xs truncate w-full">
                {player.name}
              </h4>

              {/* Hộp thông số G/A gọn gàng, chữ số đạt chuẩn 12px (text-xs) dễ đọc */}
              <div className="flex justify-center items-center gap-2 bg-white border border-slate-200 rounded py-0.5 px-1 shadow-2xs  text-xs">
                <div className="flex items-center gap-0.5">
                  <span className="font-bold text-blue-950">
                    {player.goals}
                  </span>
                  <span className="text-[11.5px] font-medium text-slate-400">
                    G
                  </span>
                </div>
                <div className="w-px h-2.5 bg-slate-200"></div>
                <div className="flex items-center gap-0.5">
                  <span className="font-bold text-blue-950">
                    {player.assists}
                  </span>
                  <span className="text-[11.5px] font-medium text-slate-400">
                    A
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
