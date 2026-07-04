import type { Match } from "../types";

interface Props {
  match: Match;
}

export const MatchCard = ({ match }: Props) => {
  const statusColors = {
    win: {
      text: "text-emerald-700 bg-emerald-50 border-emerald-200",
      label: "THẮNG",
    },
    draw: {
      text: "text-slate-600 bg-slate-100 border-slate-200",
      label: "HÒA",
    },
    lose: { text: "text-rose-700 bg-rose-50 border-rose-200", label: "THUA" },
  }[match.result];

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 mb-4 hover:border-blue-950/30 transition-all">
      {/* Ngày & Trạng thái */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-3">
        <span className="text-xs text-slate-400  font-medium">
          {match.date}
        </span>
        <span
          className={`text-[11.5px] font-bold px-2.5 py-0.5 rounded border tracking-wider ${statusColors.text}`}
        >
          {statusColors.label}
        </span>
      </div>

      {/* Khu vực tỉ số thể thao */}
      <div className="flex items-center justify-between my-2 px-1">
        <div className="text-left w-2/5 font-bold text-blue-950 text-sm truncate">
          MTM FC
        </div>
        <div className="text-center w-1/5  text-2xl font-black tracking-tighter text-blue-950">
          {match.homeScore} — {match.awayScore}
        </div>
        <div className="text-right w-2/5 font-semibold text-slate-500 text-sm truncate">
          {match.opponent}
        </div>
      </div>

      {/* Diễn biến sự kiện */}
      {match.goals.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
          {match.goals.map((goal) => (
            <div key={goal.id} className="flex items-center gap-2">
              <span className="text-slate-400 text-[11.5px] ">
                {goal.minute}’
              </span>
              <span className="text-slate-200">|</span>
              <span className="font-semibold text-slate-800">
                {goal.scorerName}
              </span>
              {goal.assistName && (
                <span className="text-slate-400 text-[11px]">
                  (Kiến tạo: {goal.assistName})
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
