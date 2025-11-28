import { Request } from "../types";

const mockRequests: Request[] = [
  { id: 1, room: '103', category: 'Housekeeping', title: 'Request for Extra Pillows', status: 'TODO', assignee: 'Alex', dueTime: '8:00 PM' },
  { id: 2, room: '405', category: 'Engineering', title: 'Broken AC in room', status: 'IN PROGRESS', assignee: 'John', dueTime: '9:30 PM' },
  { id: 3, room: '211', category: 'Concierge', title: 'Need dinner reservation', status: 'DONE', assignee: 'Sarah', dueTime: 'ASAP' },
  { id: 4, room: '802', category: 'Front Desk', title: 'Late checkout request', status: 'TODO', assignee: 'Mia', dueTime: '12:00 PM' },
];

export default mockRequests;