import { MOCK_MATCHES, MOCK_PLAYERS } from "../data/mockData";

export const Dashboard = () => {
  const totalMatches = MOCK_MATCHES.length;
  const wins = MOCK_MATCHES.filter((m) => m.result === "win").length;
  //   const draws = MOCK_MATCHES.filter((m) => m.result === "draw").length;
  const losses = MOCK_MATCHES.filter((m) => m.result === "lose").length;
  const winRate = Math.round((wins / totalMatches) * 100) || 0;

  const topScorers = [...MOCK_PLAYERS]
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 3);
  const topAssists = [...MOCK_PLAYERS]
    .sort((a, b) => b.assists - a.assists)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-lg font-bold tracking-tight text-blue-950 uppercase">
          Báo Cáo Hiệu Suất Đội Bóng
        </h2>
      </div>

      {/* Grid Chỉ Số */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "TỔNG TRẬN ĐÃ ĐÁ", val: totalMatches, cls: "text-blue-950" },
          { label: "CHIẾN THẮNG", val: wins, cls: "text-emerald-600" },
          { label: "THẤT BẠI", val: losses, cls: "text-rose-600" },
          { label: "TỶ LỆ THẮNG", val: `${winRate}%`, cls: "text-blue-950" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm"
          >
            <p className="text-[11.5px] font-bold text-slate-400 tracking-wider uppercase">
              {item.label}
            </p>
            <p
              className={`text-2xl  font-bold mt-1 tracking-tight ${item.cls}`}
            >
              {item.val}
            </p>
          </div>
        ))}
      </div>

      {/* Bảng Vinh Danh cá nhân */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Top Ghi bàn */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
          <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2 flex items-center gap-1.5">
            ⚽ HẠNG MỤC GHI BÀN
          </h3>
          <div className="divide-y divide-slate-100">
            {topScorers.map((player, idx) => (
              <div
                key={player.id}
                className="flex items-center justify-between py-2.5 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className=" text-xs text-slate-400 w-4">
                    0{idx + 1}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {player.name}
                  </span>
                  <span className="text-[11.5px]  font-medium text-blue-950 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    Số {player.jerseyNumber}
                  </span>
                </div>
                <span className=" font-bold text-blue-950">
                  {player.goals}{" "}
                  <span className="text-xs font-normal text-slate-400">
                    bàn
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Kiến tạo */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
          <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2 flex items-center gap-1.5">
            🎯 HẠNG MỤC KIẾN TẠO
          </h3>
          <div className="divide-y divide-slate-100">
            {topAssists.map((player, idx) => (
              <div
                key={player.id}
                className="flex items-center justify-between py-2.5 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className=" text-xs text-slate-400 w-4">
                    0{idx + 1}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {player.name}
                  </span>
                  <span className="text-[11.5px]  font-medium text-blue-950 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    Số {player.jerseyNumber}
                  </span>
                </div>
                <span className=" font-bold text-blue-950">
                  {player.assists}{" "}
                  <span className="text-xs font-normal text-slate-400">
                    lần
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
