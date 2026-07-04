export interface Player {
  id: string;
  name: string;
  jerseyNumber: number; // Mới thêm: Số áo
  goals: number;
  assists: number;
}

export interface GoalEvent {
  id: string;
  scorerName: string;
  assistName?: string;
  minute: number;
}

export interface Match {
  id: string;
  date: string;
  opponent: string;
  homeScore: number;
  awayScore: number;
  result: 'win' | 'draw' | 'lose';
  goals: GoalEvent[];
  videoHighlight?: string;
}
