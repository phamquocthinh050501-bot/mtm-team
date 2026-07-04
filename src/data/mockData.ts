import type { Match, Player } from '../types';

// Danh sách 21 thành viên trích xuất từ file Excel (image_680ad7.png)
export const MOCK_PLAYERS: Player[] = [
  { id: '1', name: 'Q.Thịnh', jerseyNumber: 10, goals: 6, assists: 3 },
  { id: '2', name: 'Thành Nam', jerseyNumber: 19, goals: 2, assists: 2 },
  { id: '3', name: 'Minh Khôi', jerseyNumber: 22, goals: 1, assists: 4 },
  { id: '4', name: 'Khoa', jerseyNumber: 12, goals: 0, assists: 2 },
  { id: '5', name: 'HTV', jerseyNumber: 7, goals: 3, assists: 1 },
  { id: '6', name: 'Hồ Hiệp', jerseyNumber: 29, goals: 1, assists: 1 },
  { id: '7', name: 'Brandyn Trần', jerseyNumber: 83, goals: 2, assists: 0 },
  { id: '8', name: 'Evans Trần', jerseyNumber: 28, goals: 0, assists: 1 },
  { id: '9', name: 'Hwg H', jerseyNumber: 11, goals: 1, assists: 2 },
  { id: '10', name: 'Minh Khoa', jerseyNumber: 8, goals: 0, assists: 0 },
  { id: '11', name: 'Khiêm', jerseyNumber: 1, goals: 0, assists: 0 }, // Khả năng cao là Thủ môn (số 1)
  { id: '12', name: 'Tài Ngô', jerseyNumber: 6, goals: 0, assists: 3 },
  { id: '13', name: 'Trung Tuấn', jerseyNumber: 0, goals: 1, assists: 1 },
  { id: '14', name: 'Minh Toàn', jerseyNumber: 27, goals: 0, assists: 0 },
  { id: '15', name: 'Vi Đi', jerseyNumber: 4, goals: 0, assists: 0 },
  { id: '16', name: 'Nghĩa', jerseyNumber: 5, goals: 1, assists: 0 },
  { id: '17', name: 'Q.Thắng', jerseyNumber: 29, goals: 0, assists: 1 },
  { id: '18', name: 'Minh Khải', jerseyNumber: 66, goals: 0, assists: 1 },
  { id: '19', name: 'Bo Trần', jerseyNumber: 9, goals: 5, assists: 1 },
  { id: '20', name: 'H.Dũng', jerseyNumber: 13, goals: 2, assists: 1 },
  { id: '21', name: 'Đức Hiếu', jerseyNumber: 26, goals: 0, assists: 0 },
];

// Lịch sử 5 trận đấu để test Dashboard
export const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    date: 'Thứ 7, 04/07/2026',
    opponent: 'FC Thanh Hùng',
    homeScore: 3,
    awayScore: 1,
    result: 'win',
    goals: [
      { id: 'g1', scorerName: 'Q.Thịnh', assistName: 'Minh Khôi', minute: 15 },
      { id: 'g2', scorerName: 'Bo Trần', minute: 45 },
      { id: 'g3', scorerName: 'Q.Thịnh', assistName: 'Tài Ngô', minute: 78 }
    ],
    videoHighlight: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'm2',
    date: 'Thứ 4, 01/07/2026',
    opponent: 'FC CF Chang',
    homeScore: 2,
    awayScore: 2,
    result: 'draw',
    goals: [
      { id: 'g4', scorerName: 'Thành Nam', minute: 30 },
      { id: 'g5', scorerName: 'HTV', assistName: 'Minh Khôi', minute: 85 }
    ]
  },
  {
    id: 'm3',
    date: 'Chủ Nhật, 28/06/2026',
    opponent: 'FC Refund',
    homeScore: 4,
    awayScore: 2,
    result: 'win',
    goals: [
      { id: 'g6', scorerName: 'Bo Trần', assistName: 'Thành Nam', minute: 12 },
      { id: 'g7', scorerName: 'Bo Trần', assistName: 'Khoa', minute: 25 },
      { id: 'g8', scorerName: 'H.Dũng', assistName: 'Q.Thịnh', minute: 60 },
      { id: 'g9', scorerName: 'Brandyn Trần', assistName: 'Hwg H', minute: 89 }
    ]
  },
  {
    id: 'm4',
    date: 'Thứ 5, 25/06/2026',
    opponent: 'FC SBTC',
    homeScore: 1,
    awayScore: 3,
    result: 'lose',
    goals: [
      { id: 'g10', scorerName: 'Nghĩa', assistName: 'Trung Tuấn', minute: 40 }
    ]
  },
  {
    id: 'm5',
    date: 'Thứ 7, 20/06/2026',
    opponent: 'FC Anh Thư',
    homeScore: 5,
    awayScore: 0,
    result: 'win',
    goals: [
      { id: 'g11', scorerName: 'Q.Thịnh', assistName: 'Tài Ngô', minute: 5 },
      { id: 'g12', scorerName: 'Q.Thịnh', assistName: 'Minh Khôi', minute: 18 },
      { id: 'g13', scorerName: 'Trung Tuấn', minute: 35 },
      { id: 'g14', scorerName: 'Hồ Hiệp', assistName: 'Bo Trần', minute: 55 },
      { id: 'g15', scorerName: 'Hwg H', assistName: 'Evans Trần', minute: 82 }
    ]
  }
];


export interface FundMember {
  playerId: string;
  name: string;
  jerseyNumber: number;
  size: string;
  totalAmount: number; // Thành tiền
  paidAmount: number;  // Đã thu
  debtAmount: number;  // Còn phải thu
}

export const MOCK_FUND_MEMBERS: FundMember[] = [
  { playerId: '1', name: 'Q.Thịnh', jerseyNumber: 10, size: '2XL', totalAmount: 263000, paidAmount: 0, debtAmount: 263000 },
  { playerId: '2', name: 'Thành Nam', jerseyNumber: 19, size: 'L', totalAmount: 228000, paidAmount: 0, debtAmount: 228000 },
  { playerId: '3', name: 'Minh Khôi', jerseyNumber: 22, size: 'XL', totalAmount: 263000, paidAmount: 10000000, debtAmount: -9737000 }, // Quỹ đầu tư lớn hoặc cầm quỹ đội
  { playerId: '4', name: 'Khoa', jerseyNumber: 12, size: '2XL', totalAmount: 228000, paidAmount: 0, debtAmount: 228000 },
  { playerId: '5', name: 'HTV', jerseyNumber: 7, size: 'L', totalAmount: 228000, paidAmount: 0, debtAmount: 228000 },
  { playerId: '6', name: 'Hồ Hiệp', jerseyNumber: 29, size: '2XL', totalAmount: 228000, paidAmount: 0, debtAmount: 228000 },
  { playerId: '7', name: 'Brandyn Trần', jerseyNumber: 83, size: '6XL', totalAmount: 228000, paidAmount: 0, debtAmount: 228000 },
  { playerId: '8', name: 'Evans Trần', jerseyNumber: 28, size: 'XL', totalAmount: 228000, paidAmount: 0, debtAmount: 228000 },
  { playerId: '9', name: 'Hwg H', jerseyNumber: 11, size: 'XL', totalAmount: 253000, paidAmount: 0, debtAmount: 253000 },
  { playerId: '10', name: 'Minh Khoa', jerseyNumber: 8, size: 'L', totalAmount: 228000, paidAmount: 0, debtAmount: 228000 },
  { playerId: '19', name: 'Bo Trần', jerseyNumber: 9, size: '2XL', totalAmount: 228000, paidAmount: 0, debtAmount: 228000 },
  { playerId: '20', name: 'H.Dũng', jerseyNumber: 13, size: 'L', totalAmount: 263000, paidAmount: 0, debtAmount: 263000 },
];

// Lịch sử thu chi chung của đội
export const MOCK_TRANSACTIONS = [
  { id: 't1', date: '02/07/2026', description: 'Minh Khôi đóng quỹ đợt 1', amount: 10000000, type: 'income' },
  { id: 't2', date: '03/07/2026', description: 'Chi tiền sân cọc giải tháng 7', amount: -1500000, type: 'expense' },
  { id: 't3', date: '04/07/2026', description: 'Chi tiền nước uống trận FC Gà Trống', amount: -120000, type: 'expense' },
];
