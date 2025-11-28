export type RequestStatus = 'TODO' | 'IN PROGRESS' | 'DONE';

export interface Request {
  id: number;
  room: string;
  category: string; // Corresponds to department
  title: string;
  status: RequestStatus;
  assignee: string;
  dueTime: string;
}

export interface Task {
  room: string;
  category: string; 
  title: string;
  assignee: string;
  dueTime: string;
}
