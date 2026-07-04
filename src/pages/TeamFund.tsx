import { useState } from "react";
import { MOCK_FUND_MEMBERS, MOCK_TRANSACTIONS } from "../data/mockData";

export const TeamFund = () => {
  const [filter, setFilter] = useState<"all" | "debt" | "paid">("all");

  const totalFundExist = MOCK_TRANSACTIONS.reduce(
    (sum, t) => sum + t.amount,
    0,
  );
  const totalDebt = MOCK_FUND_MEMBERS.reduce(
    (sum, m) => (m.debtAmount > 0 ? sum + m.debtAmount : sum),
    0,
  );
  const countOwe = MOCK_FUND_MEMBERS.filter((m) => m.debtAmount > 0).length;

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(val);

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-200 pb-3">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900">
          QUẢN LÝ TÀI CHÍNH NỘI BỘ
        </h2>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 text-white p-4 rounded-lg shadow-sm">
          <p className="text-[11.5px] font-bold text-zinc-400 tracking-wider uppercase">
            SỐ DƯ QUỸ HIỆN TẠI
          </p>
          <p className="text-2xl  font-bold mt-1 text-emerald-400">
            {formatMoney(totalFundExist)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-sm">
          <p className="text-[11.5px] font-bold text-zinc-400 tracking-wider uppercase">
            TỔNG TIỀN CHƯA THU
          </p>
          <p className="text-2xl  font-bold mt-1 text-rose-600">
            {formatMoney(totalDebt)}
          </p>
        </div>
        <button className="bg-white hover:bg-zinc-50 border border-zinc-300 rounded-lg p-4 font-semibold text-xs text-zinc-700 tracking-wide transition-colors">
          + GHI NHẬN THU CHI MỚI
        </button>
      </div>

      {/* Filtering Pills */}
      <div className="bg-white rounded-lg border border-zinc-200 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-100">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            TIẾN ĐỘ ĐÓNG TIỀN ÁO
          </h3>
          <div className="flex bg-zinc-100 p-0.5 rounded border border-zinc-200 text-[11px] font-medium ">
            {/* Lọc All / Debt / Paid */}
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded-sm ${filter === "all" ? "bg-white font-bold text-zinc-900 shadow-xs" : "text-zinc-500"}`}
            >
              TẤT CẢ
            </button>
            <button
              onClick={() => setFilter("debt")}
              className={`px-2.5 py-1 rounded-sm ${filter === "debt" ? "bg-white font-bold text-rose-600 shadow-xs" : "text-zinc-500"}`}
            >
              CÒN NỢ ({countOwe})
            </button>
          </div>
        </div>

        {/* Member list row style */}
        <div className="divide-y divide-zinc-100">
          {MOCK_FUND_MEMBERS.filter((m) =>
            filter === "debt"
              ? m.debtAmount > 0
              : filter === "paid"
                ? m.debtAmount <= 0
                : true,
          ).map((member) => (
            <div
              key={member.playerId}
              className="flex items-center justify-between py-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <span className=" text-xs text-zinc-400 w-6">
                  #{member.jerseyNumber}
                </span>
                <div>
                  <span className="font-medium text-zinc-800">
                    {member.name}
                  </span>
                  <span className="text-[11.5px] text-zinc-400 ml-2 ">
                    Size: {member.size}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={` text-xs font-semibold ${member.debtAmount > 0 ? "text-rose-600" : "text-emerald-600"}`}
                >
                  {member.debtAmount > 0
                    ? `Nợ: ${formatMoney(member.debtAmount)}`
                    : "Đã xong"}
                </span>
                {member.debtAmount > 0 && (
                  <button className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 font-bold px-2 py-1 text-[11.5px] rounded transition-all">
                    THU
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
