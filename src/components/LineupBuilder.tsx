import { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  type DragEndEvent, // <-- Thêm chữ 'type' vào ngay trước DragEndEvent
} from "@dnd-kit/core";
import { MOCK_PLAYERS } from "../data/mockData";
import { TrollModal } from "./TrollModal";

// --- INTERFACES & CONFIGS ---
interface PositionSlot {
  id: string;
  role: string;
  top: string;
  left: string;
}

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

// --- KHAI BÁO KIỂU DỮ LIỆU ĐỂ HẾT LỖI ANY ---
// Cấu trúc của 1 cầu thủ dựa theo MOCK_PLAYERS
interface PlayerData {
  id: string;
  name: string;
  jerseyNumber: number;
  goals?: number;
  assists?: number;
}

// Cấu trúc Props truyền vào cho Ô trên sân
interface PitchSlotProps {
  id: string;
  role: string;
  top: string;
  left: string;
  player?: PlayerData; // Cầu thủ có thể có hoặc không (nếu ô trống)
  onRemove: (id: string) => void;
}

// Cấu trúc Props truyền vào cho Ghế dự bị
interface BenchPlayerProps {
  player: PlayerData;
}

// --- COMPONENT 1: Ô TRÊN SÂN (Droppable Target) ---
const PitchSlot = ({
  id,
  role,
  top,
  left,
  player,
  onRemove,
}: PitchSlotProps) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      onClick={() => player && onRemove(id)}
      className={`absolute -translate-x-1/2 -translate-y-1/2 w-14 h-16 flex flex-col items-center justify-center rounded-sm transition-all z-20 ${
        isOver
          ? "bg-blue-500/40 border-2 border-blue-400 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          : "bg-white/10 border border-white/20 border-dashed"
      } ${player ? "cursor-pointer hover:scale-105" : ""}`}
      style={{ top, left }}
      title={player ? "Nhấn để đưa về ghế dự bị" : `Vị trí ${role}`}
    >
      {player ? (
        <div className="w-full h-full bg-blue-950 flex flex-col items-center justify-center rounded-b-sm border-x border-b border-blue-900/40 shadow-sm relative">
          <span className="text-[7px] font-bold text-blue-200 uppercase tracking-tight truncate w-full text-center px-1 absolute top-1">
            {player.name.split(" ").pop()}
          </span>
          <span className="text-xl font-black text-white mt-1">
            {player.jerseyNumber}
          </span>
        </div>
      ) : (
        <span className="text-[9px] font-bold text-white/40">{role}</span>
      )}
    </div>
  );
};

// --- COMPONENT 2: CẦU THỦ DỰ BỊ (Draggable Item) ---
const BenchPlayer = ({ player }: BenchPlayerProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 9999,
        position: "relative" as const,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="flex justify-between items-center py-2 px-3 border border-slate-200 bg-white rounded shadow-sm cursor-grab active:cursor-grabbing hover:border-blue-400 transition-colors touch-none"
    >
      <div className="flex items-center gap-3">
        <span className="text-blue-950 bg-blue-50 px-2 py-0.5 rounded font-mono font-bold text-xs">
          {player.jerseyNumber}
        </span>
        <span className="text-sm font-bold text-slate-800">{player.name}</span>
      </div>
      <span className="text-xs text-slate-400">≡</span>
    </div>
  );
};

// --- COMPONENT CHÍNH ---
export const LineupBuilder = () => {
  const [mode, setMode] = useState<"5-man" | "7-man" | "11-man">("7-man");
  const [lineup, setLineup] = useState<Record<string, string>>({});
  const [trollType, setTrollType] = useState<
    "paywall" | "strava" | "var" | null
  >(null);

  const slots = FORMATIONS[mode];

  // Cấu hình Cảm biến mượt mà cho Mobile & Desktop
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 }, // Chuột di chuyển 5px mới tính là Drag
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 }, // Chạm giữ 150ms trên điện thoại mới Drag, tránh lỗi lướt web
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      const playerId = active.id as string;
      const slotId = over.id as string;
      setLineup((prev) => ({ ...prev, [slotId]: playerId }));
    }
  };

  const handleRemovePlayer = (slotId: string) => {
    setLineup((prev) => {
      const newMap = { ...prev };
      delete newMap[slotId];
      return newMap;
    });
  };

  const availablePlayers = MOCK_PLAYERS.filter(
    (p) => !Object.values(lineup).includes(p.id),
  );

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="space-y-6 max-w-4xl mx-auto font-sans">
        {/* HEADER ĐIỀU KHIỂN */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-blue-950 uppercase">
              SA BÀN CHIẾN THUẬT
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Kéo thả để xếp đội. Nhấp vào sân để thu hồi.
            </p>
          </div>
          <div className="flex bg-blue-950/5 p-1 rounded border border-blue-950/10 text-xs font-bold">
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
          {/* KHU VỰC 1: SÂN CỎ CHIẾN THUẬT (Dropzone) */}
          <div className="md:col-span-2 bg-emerald-950 rounded-xl aspect-[3/4] relative overflow-hidden border border-emerald-900 shadow-inner p-4 select-none">
            {/* ĐƯỜNG KẺ SÂN */}
            <div className="absolute inset-4 border border-white/10 rounded-sm pointer-events-none">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-full"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-16 border-x border-b border-white/10"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-16 border-x border-t border-white/10"></div>
            </div>

            {/* RENDER CÁC VỊ TRÍ */}
            {slots.map((slot) => (
              <PitchSlot
                key={slot.id}
                id={slot.id}
                role={slot.role}
                top={slot.top}
                left={slot.left}
                player={MOCK_PLAYERS.find((p) => p.id === lineup[slot.id])}
                onRemove={handleRemovePlayer}
              />
            ))}
          </div>

          {/* KHU VỰC 2: GHẾ DỰ BỊ & TÓM TẮT */}
          <div className="space-y-6">
            {/* Box Dự bị - Draggable Items */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <h3 className="text-xs font-bold text-blue-950 tracking-wider uppercase border-b border-slate-100 pb-2 mb-3">
                CẦU THỦ DỰ BỊ
              </h3>
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {availablePlayers.length > 0 ? (
                  availablePlayers.map((player) => (
                    <BenchPlayer key={player.id} player={player} />
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-4 italic">
                    Đã sử dụng toàn bộ nhân sự
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setTrollType("var")}
              className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold py-3 rounded text-xs transition-colors shadow-sm"
            >
              XÓA ĐỘI HÌNH LÀM LẠI
            </button>

            <TrollModal
              isOpen={trollType !== null}
              type={trollType || "var"}
              onClose={() => setTrollType(null)}
            />
          </div>
        </div>
      </div>
    </DndContext>
  );
};
