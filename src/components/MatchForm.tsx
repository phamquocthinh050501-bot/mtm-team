import { useState } from "react";
import { MOCK_PLAYERS } from "../data/mockData";

export const MatchForm = () => {
  // 1. State cho thông tin cơ bản
  const [matchInfo, setMatchInfo] = useState({
    date: "",
    opponent: "",
    homeScore: 0,
    awayScore: 0,
    videoHighlight: "",
  });

  // 2. State cho danh sách bàn thắng (Mảng động)
  const [goals, setGoals] = useState([
    { id: "", scorerId: "", assistId: "", minute: "" },
  ]);

  // Hàm thêm một dòng bàn thắng mới
  const handleAddGoal = () => {
    setGoals([
      ...goals,
      { id: Date.now().toString(), scorerId: "", assistId: "", minute: "" },
    ]);
  };

  // Hàm cập nhật dữ liệu của một bàn thắng cụ thể
  const handleGoalChange = (id: string, field: string, value: string) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, [field]: value } : goal,
    );
    setGoals(updatedGoals);
  };

  // Hàm xóa một bàn thắng bị nhập sai
  const handleRemoveGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dữ liệu lưu trữ:", { ...matchInfo, goals });
    alert("Đã lưu trận đấu thành công!");
    // Sau này sẽ dispatch Redux action hoặc gọi API Supabase ở đây
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Cập nhật Trận Đấu
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* KHU VỰC 1: THÔNG TIN CHUNG */}
        <div className="grid grid-cols-2 gap-4 border-b pb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày thi đấu
            </label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              onChange={(e) =>
                setMatchInfo({ ...matchInfo, date: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đối thủ
            </label>
            <input
              type="text"
              placeholder="VD: FC Hàng Xóm"
              className="w-full border rounded-lg p-2"
              onChange={(e) =>
                setMatchInfo({ ...matchInfo, opponent: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tỉ số Đội Nhà
            </label>
            <input
              type="number"
              min="0"
              className="w-full border rounded-lg p-2"
              onChange={(e) =>
                setMatchInfo({
                  ...matchInfo,
                  homeScore: Number(e.target.value),
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tỉ số Đối Thủ
            </label>
            <input
              type="number"
              min="0"
              className="w-full border rounded-lg p-2"
              onChange={(e) =>
                setMatchInfo({
                  ...matchInfo,
                  awayScore: Number(e.target.value),
                })
              }
              required
            />
          </div>
        </div>

        {/* KHU VỰC 2: CHI TIẾT BÀN THẮNG */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-700">
              Chi tiết Bàn Thắng
            </h3>
            <button
              type="button"
              onClick={handleAddGoal}
              className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-semibold hover:bg-green-200"
            >
              + Thêm bàn thắng
            </button>
          </div>

          <div className="space-y-3">
            {goals.map((goal, index) => (
              <div
                key={goal.id}
                className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg border"
              >
                <span className="text-gray-400 font-bold w-6">
                  {index + 1}.
                </span>

                {/* Select Người ghi bàn */}
                <select
                  className="flex-1 border rounded p-2 text-sm"
                  value={goal.scorerId}
                  onChange={(e) =>
                    handleGoalChange(goal.id, "scorerId", e.target.value)
                  }
                  required
                >
                  <option value="">Ghi bàn...</option>
                  {MOCK_PLAYERS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                {/* Select Người kiến tạo */}
                <select
                  className="flex-1 border rounded p-2 text-sm"
                  value={goal.assistId}
                  onChange={(e) =>
                    handleGoalChange(goal.id, "assistId", e.target.value)
                  }
                >
                  <option value="">Kiến tạo (bỏ trống nếu ko có)</option>
                  {MOCK_PLAYERS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                {/* Input Phút */}
                <input
                  type="number"
                  placeholder="Phút"
                  className="w-20 border rounded p-2 text-sm"
                  value={goal.minute}
                  onChange={(e) =>
                    handleGoalChange(goal.id, "minute", e.target.value)
                  }
                />

                {/* Nút Xóa */}
                <button
                  type="button"
                  onClick={() => handleRemoveGoal(goal.id)}
                  className="text-red-500 hover:text-red-700 px-2 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
            {goals.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                Chưa có dữ liệu bàn thắng.
              </p>
            )}
          </div>
        </div>

        {/* KHU VỰC 3: MEDIA */}
        <div className="border-t pt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link Video Highlight (YouTube)
          </label>
          <input
            type="text"
            placeholder="https://youtube.com/..."
            className="w-full border rounded-lg p-2"
            onChange={(e) =>
              setMatchInfo({ ...matchInfo, videoHighlight: e.target.value })
            }
          />
        </div>

        {/* NÚT SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition mt-4"
        >
          Lưu Kết Quả Trận Đấu
        </button>
      </form>
    </div>
  );
};
