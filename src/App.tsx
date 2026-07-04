import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

// Import các UI Component đã thiết kế (nhớ đảm bảo đúng đường dẫn file)
import { Dashboard } from "./components/Dashboard";
import { Roster } from "./components/Roster";
import { TeamFund } from "./pages/TeamFund";
import { MatchForm } from "./components/MatchForm";
import { MOCK_MATCHES } from "./data/mockData";
import { MatchCard } from "./components/MatchCard";
import { LineupBuilder } from "./components/LineupBuilder";
import { FootballPreloader } from "./components/FootballPreloader";
import { PageWrapper } from "./components/PageWrapper";

// Layout bọc ngoài - Đã nâng cấp Responsive (Sidebar trên Desktop, Bottom Nav trên Mobile)
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-blue-900 text-white font-semibold shadow-sm"
      : "text-blue-200 hover:text-white hover:bg-blue-900/40 transition-all";

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      {/* 1. SIDEBAR DESKTOP */}
      <aside className="hidden md:flex flex-col w-60 bg-blue-950 text-white p-4 border-r border-blue-900/30">
        <div className="flex items-center gap-2.5 px-2 py-3 mb-6 border-b border-blue-900/40">
          <div className="w-3 h-3 bg-white rounded-sm"></div>
          <span className="text-sm font-black tracking-widest text-white">
            TEAM MTM
          </span>
        </div>
        <nav className="space-y-1 flex-1 text-xs tracking-wider font-medium">
          <Link
            to="/"
            className={`flex items-center gap-3 p-3 rounded-md ${isActive("/")}`}
          >
            <span>📊</span> TỔNG QUAN
          </Link>
          <Link
            to="/matches"
            className={`flex items-center gap-3 p-3 rounded-md ${isActive("/matches")}`}
          >
            <span>🗓️</span> LỊCH THI ĐẤU
          </Link>
          <Link
            to="/members"
            className={`flex items-center gap-3 p-3 rounded-md ${isActive("/members")}`}
          >
            <span>👥</span> ĐỘI HÌNH
          </Link>
          {/* THÊM NÚT SA BÀN VÀO ĐÂY */}
          <Link
            to="/lineup"
            className={`flex items-center gap-3 p-3 rounded-md ${isActive("/lineup")}`}
          >
            <span>📋</span> SA BÀN CHIẾN THUẬT
          </Link>
          <Link
            to="/fund"
            className={`flex items-center gap-3 p-3 rounded-md ${isActive("/fund")}`}
          >
            <span>💰</span> QUY ĐỘI
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="m-2 overflow-y-auto w-full">
        <div className="">{children}</div>
      </main>

      {/* 2. BOTTOM NAV MOBILE (Tối thiểu chữ 11.5px để anh em dễ đọc trên điện thoại) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-950 border-t border-blue-900 flex justify-around p-2 z-50 shadow-xl text-white">
        <Link
          to="/"
          className={`flex flex-col items-center p-2 rounded-md ${isActive("/")}`}
        >
          <span className="text-lg">📊</span>
          <span className="text-[11.5px] mt-0.5">Tổng quan</span>
        </Link>
        <Link
          to="/matches"
          className={`flex flex-col items-center p-2 rounded-md ${isActive("/matches")}`}
        >
          <span className="text-lg">🗓️</span>
          <span className="text-[11.5px] mt-0.5">Trận đấu</span>
        </Link>
        {/* THÊM PHẦN MOBILE VÀO ĐÂY */}
        <Link
          to="/lineup"
          className={`flex flex-col items-center p-2 rounded-md ${isActive("/lineup")}`}
        >
          <span className="text-lg">📋</span>
          <span className="text-[11.5px] mt-0.5">Sa bàn</span>
        </Link>
        <Link
          to="/members"
          className={`flex flex-col items-center p-2 rounded-md ${isActive("/members")}`}
        >
          <span className="text-lg">👥</span>
          <span className="text-[11.5px] mt-0.5">Đội hình</span>
        </Link>
        <Link
          to="/fund"
          className={`flex flex-col items-center p-2 rounded-md ${isActive("/fund")}`}
        >
          <span className="text-lg">💰</span>
          <span className="text-[11.5px] mt-0.5">Quỹ đội</span>
        </Link>
      </nav>
    </div>
  );
};
// Component Quản lý trận đấu - Hiển thị danh sách thật
const MatchesPage = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-slate-800 uppercase">
          Lịch sử thi đấu
        </h1>
        <Link
          to="/matches/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700"
        >
          + Thêm Trận
        </Link>
      </div>

      {/* Map dữ liệu giả ra giao diện */}
      <div className="space-y-4">
        {MOCK_MATCHES.map((match) => (
          <Link
            key={match.id}
            to={`/matches/${match.id}`}
            className="block transition-transform hover:-translate-y-1"
          >
            <MatchCard match={match} />
          </Link>
        ))}
      </div>
    </div>
  );
};

// Component Chi tiết một trận đấu
const MatchDetailPage = () => {
  // Tạm thời lấy trận đầu tiên làm mẫu. Sau này có backend sẽ query theo useParams()
  const match = MOCK_MATCHES[0];

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/matches"
        className="inline-flex items-center text-blue-600 font-semibold mb-6 hover:text-blue-800"
      >
        <span className="mr-2">←</span> Trở lại danh sách
      </Link>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <h1 className="text-xl font-bold mb-2">
          Chi tiết trận đấu vs {match.opponent}
        </h1>
        <p className="text-slate-500 text-sm">Cập nhật lúc: {match.date}</p>
      </div>

      <MatchCard match={match} />
    </div>
  );
};

// Khởi tạo App với Routes đã được gắn Component
function App() {
  return (
    <>
      <FootballPreloader />
      <BrowserRouter>
        <DashboardLayout>
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/matches" element={<MatchesPage />} />
              <Route path="/matches/new" element={<MatchForm />} />
              <Route path="/matches/:matchId" element={<MatchDetailPage />} />
              <Route path="/members" element={<Roster />} />

              {/* THÊM TUYẾN ĐƯỜNG ROUTE MỚI CHO SA BÀN TẠI ĐÂY */}
              <Route path="/lineup" element={<LineupBuilder />} />

              <Route path="/fund" element={<TeamFund />} />
            </Routes>
          </PageWrapper>
        </DashboardLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
