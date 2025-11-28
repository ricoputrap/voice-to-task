"use client";

import React, { useState } from 'react'
import { Plus } from 'lucide-react';
import RequestItem from './request-item';
import mockRequests from './data';
import { Request } from '../types';
import { useRouter } from 'next/navigation';


function RequestsPage() {
  const [tasks, setTasks] = useState<Request[]>(mockRequests);
  const router = useRouter();

  return (
    <main className="flex flex-col h-screen max-w-md mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 text-center p-4 bg-white border-b shadow-sm">
        Requests ({tasks.filter(t => t.status !== 'DONE').length})
      </h1>
      <div className="flex-1 overflow-y-auto bg-gray-100">
        {tasks.map(request => (
          <RequestItem key={request.id} request={request} />
        ))}
      </div>
      <div className="p-4 bg-white border-t shadow-lg">
        <button
          onClick={() => {
            router.push('/new-request');
          }}
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
        >
          <Plus className="w-6 h-6 mr-2" /> NEW REQUEST
        </button>
      </div>
    </main>
  );
}

export default RequestsPage