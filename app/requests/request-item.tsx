"use client";

import React, { useState, useRef } from 'react';
import { Request, Task } from './types';

interface DepartmentColorConfig {
  bg: string;
  text: string;
  border: string;
}

// --- Global Mock Data & Utilities ---

const initialTask: Task = {
  room: '',
  category: '',
  title: '',
  assignee: '',
  dueTime: '',
};

const departmentColors: Record<string, DepartmentColorConfig> = {
  Housekeeping: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500' },
  Engineering: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500' },
  Concierge: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-500' },
  'Front Desk': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500' },
  Other: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-500' },
};

const RequestItem: React.FC<{ request: Request }> = ({ request }) => {
  const color = departmentColors[request.category] || departmentColors['Other'];
  return (
    <div className="flex justify-between items-start p-4 bg-white hover:bg-gray-50 border-b border-gray-200">
      <div className="flex-1 min-w-0">
        <p className="text-xl font-semibold text-gray-900 leading-tight">{request.room}</p>
        <p className="text-sm text-gray-700 truncate font-medium">{request.title}</p>
        <p className="text-xs text-gray-500">{request.category}</p>
      </div>
      <div className="shrink-0 text-right ml-4 space-y-1">
        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${request.status === 'DONE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {request.status}
        </span>
        <p className="text-xs text-gray-600">to {request.assignee}</p>
        <p className="text-xs text-red-600 font-medium">Due {request.dueTime}</p>
      </div>
    </div>
  );
};

export default RequestItem;