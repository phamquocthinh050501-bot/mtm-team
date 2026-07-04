import { useState } from "react";

// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU CHUẨN ---
interface MatchEvent {
  id: string;
  type: "goal" | "yellow_card" | "red_card" | "sub";
  minute: number;
  playerName: string;
  detail?: string; // Tên người kiến tạo hoặc người thay thế
}

interface MatchData {
  id: string;
  opponent: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "live" | "finished";
  scoreSelf?: number;
  scoreOpponent?: number;
  events?: MatchEvent[];
}

export const MatchCenter = () => {
  // Bộ lọc danh sách trận đấu
  const [filter, setFilter] = useState<"all" | "upcoming" | "finished">("all");
  // State quản lý trận đấu đang chọn xem chi tiết/Live Ticker
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);

  // MOCK DATA: Danh sách trận đấu chuyên nghiệp
  const MOCK_MATCHES: MatchData[] = [
    {
      id: "m1",
      opponent: "FC ĐỒNG ĐỘI",
      date: "05/07/2026",
      time: "18:00",
      location: "Sân Thượng Cát, Quận 7",
      status: "upcoming",
    },
    {
      id: "m2",
      opponent: "NIGHT OWL FC",
      date: "01/07/2026",
      time: "20:30",
      location: "Sân Bình Thạnh Chảo Lửa",
      status: "finished",
      scoreSelf: 5,
      scoreOpponent: 3,
      events: [
        {
          id: "e1",
          type: "goal",
          minute: 12,
          playerName: "Q. THỊNH",
          detail: "H. DŨNG kiến tạo",
        },
        {
          id: "e2",
          type: "goal",
          minute: 28,
          playerName: "M. ĐỨC",
          detail: "Sút phạt hàng rào",
        },
        {
          id: "e3",
          type: "yellow_card",
          minute: 40,
          playerName: "T. NAM",
          detail: "Lỗi phản ứng",
        },
        {
          id: "e4",
          type: "goal",
          minute: 55,
          playerName: "Q. THỊNH",
          detail: "V. ANH kiến tạo",
        },
        {
          id: "e5",
          type: "sub",
          minute: 60,
          playerName: "T. ANH",
          detail: "Ra sân: C. PHƯƠNG",
        },
        {
          id: "e6",
          type: "goal",
          minute: 78,
          playerName: "V. ANH",
          detail: "Solo qua thủ môn",
        },
      ],
    },
    {
      id: "m3",
      opponent: "ANH EM APTECH",
      date: "28/06/2026",
      time: "19:00",
      location: "Sân HCA Chánh Hưng",
      status: "finished",
      scoreSelf: 2,
      scoreOpponent: 4,
      events: [
        {
          id: "e7",
          type: "goal",
          minute: 15,
          playerName: "H. DŨNG",
          detail: "Phạt đền",
        },
        {
          id: "e8",
          type: "red_card",
          minute: 42,
          playerName: "D. KHÁNH",
          detail: "Thẻ đỏ trực tiếp",
        },
      ],
    },
  ];

  // Lọc dữ liệu dựa theo tab được chọn
  const filteredMatches = MOCK_MATCHES.filter((match) => {
    if (filter === "upcoming")
      return match.status === "upcoming" || match.status === "live";
    if (filter === "finished") return match.status === "finished";
    return true;
  });

  return (
    <div className="space-y-6 font-sans max-w-4xl mx-auto">
      {/* HEADER TIÊU ĐỀ */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-blue-950 uppercase">
            TRUNG TÂM TRẬN ĐẤU
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Lịch thi đấu nội bộ & Biên bản sự kiện Live Ticker
          </p>
        </div>

        {/* Tabs Filter */}
        <div className="flex bg-blue-950/5 p-1 rounded border border-blue-950/10 text-xs font-bold">
          {(["all", "upcoming", "finished"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-sm transition-all uppercase ${filter === type ? "bg-blue-950 text-white shadow-xs" : "text-blue-950/60 hover:text-blue-950"}`}
            >
              {type === "all"
                ? "Tất cả"
                : type === "upcoming"
                  ? "Sắp đá"
                  : "Kết quả"}
            </button>
          ))}
        </div>
      </div>

      {/* DANH SÁCH CÁC TRẬN ĐẤU */}
      <div className="space-y-4">
        {filteredMatches.map((match) => (
          <div
            key={match.id}
            onClick={() => match.events && setSelectedMatch(match)} // Chỉ mở chi tiết nếu trận đấu có sự kiện diễn ra
            className={`bg-white border rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
              match.events
                ? "cursor-pointer hover:border-blue-400 hover:shadow-xs"
                : "border-slate-200"
            }`}
          >
            {/* Thông tin thời gian & địa điểm */}
            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                  {match.date}
                </span>
                <span className="text-xs font-mono bg-blue-50 text-blue-950 px-2 py-0.5 rounded font-bold">
                  {match.time}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium truncate max-w-[220px]">
                📍 {match.location}
              </p>
            </div>

            {/* BẢNG TỶ SỐ TRỰC DIỆN ĐẬP KHỐI (Scoreboard UI) */}
            <div className="flex items-center gap-6 my-2 sm:my-0">
              <div className="text-right w-24 sm:w-32">
                <h4 className="font-black text-sm text-blue-950 tracking-tight">
                  TEAM MTM
                </h4>
              </div>

              {/* Khối hiển thị kết quả số */}
              <div className="flex items-center gap-1.5 font-mono">
                {match.status === "upcoming" ? (
                  <span className="text-xs font-bold text-blue-950/40 tracking-widest bg-slate-50 border border-slate-200 px-3 py-1 rounded">
                    VS
                  </span>
                ) : (
                  <>
                    <span
                      className={`text-2xl font-black px-3 py-1 rounded shadow-inner text-white ${
                        (match.scoreSelf || 0) > (match.scoreOpponent || 0)
                          ? "bg-emerald-600"
                          : "bg-slate-700"
                      }`}
                    >
                      {match.scoreSelf}
                    </span>
                    <span className="text-slate-400 font-bold">:</span>
                    <span
                      className={`text-2xl font-black px-3 py-1 rounded shadow-inner text-white ${
                        (match.scoreOpponent || 0) > (match.scoreSelf || 0)
                          ? "bg-emerald-600"
                          : "bg-slate-700"
                      }`}
                    >
                      {match.scoreOpponent}
                    </span>
                  </>
                )}
              </div>

              <div className="text-left w-24 sm:w-32">
                <h4 className="font-black text-sm text-slate-700 tracking-tight truncate uppercase">
                  {match.opponent}
                </h4>
              </div>
            </div>

            {/* Trạng thái / Action Tag */}
            <div>
              {match.status === "upcoming" ? (
                <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold uppercase">
                  Chưa đá
                </span>
              ) : match.status === "live" ? (
                <span className="px-2.5 py-1 rounded bg-rose-600 text-white text-xs font-bold uppercase animate-pulse flex items-center gap-1">
                  ● LIVE
                </span>
              ) : (
                <span className="text-[11px] font-bold text-slate-400 group-hover:text-blue-950 flex items-center gap-1">
                  {match.events ? "📊 Xem biên bản" : "Đã kết thúc"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL LIVE TICKER TIMELINE (Hiển thị chi tiết diễn biến trận đấu) */}
      {selectedMatch && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-blue-950/80 backdrop-blur-sm p-4 animate-fade-in-up">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]">
            {/* Header Modal */}
            <div className="bg-blue-950 p-4 text-center relative text-white">
              <p className="text-[10px] text-blue-300 font-mono tracking-widest uppercase">
                BIÊN BẢN TRẬN ĐẤU
              </p>
              <div className="flex items-center justify-center gap-4 mt-2">
                <span className="font-bold text-sm">TEAM MTM</span>
                <span className="font-mono font-black text-xl bg-white/10 px-2 py-0.5 rounded">
                  {selectedMatch.scoreSelf} - {selectedMatch.scoreOpponent}
                </span>
                <span className="font-bold text-sm uppercase truncate max-w-[120px]">
                  {selectedMatch.opponent}
                </span>
              </div>
            </div>

            {/* Thân Dòng thời gian sự kiện (Timeline) */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 relative">
              {/* Trục dọc trung tâm của Timeline */}
              <div className="absolute top-6 bottom-6 left-12 w-0.5 bg-slate-200"></div>

              {selectedMatch.events?.map((event) => (
                <div
                  key={event.id}
                  className="relative flex items-start gap-4 animate-fade-in-up"
                >
                  {/* Số phút hiển thị vuông vức */}
                  <div className="w-8 text-right font-mono font-black text-xs text-blue-900 mt-1 relative z-10 bg-white pr-1">
                    {event.minute}'
                  </div>

                  {/* Icon đại diện sự kiện hình tròn */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-2xs border relative z-10 bg-white ${
                      event.type === "goal"
                        ? "bg-emerald-50 border-emerald-200"
                        : event.type === "yellow_card"
                          ? "bg-amber-50 border-amber-200"
                          : event.type === "red_card"
                            ? "bg-rose-50 border-rose-200"
                            : "bg-purple-50 border-purple-200"
                    }`}
                  >
                    {event.type === "goal" && "⚽"}
                    {event.type === "yellow_card" && "🟨"}
                    {event.type === "red_card" && "🟥"}
                    {event.type === "sub" && "🔄"}
                  </div>

                  {/* Khối chi tiết văn bản */}
                  <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-left">
                    <h5 className="font-bold text-xs text-slate-800 uppercase">
                      {event.playerName}
                    </h5>
                    {event.detail && (
                      <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                        {event.detail}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Nút đóng */}
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => setSelectedMatch(null)}
                className="w-full bg-blue-950 text-white py-2.5 rounded font-bold text-xs hover:bg-blue-900 transition-colors"
              >
                ĐÓNG BIÊN BẢN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
