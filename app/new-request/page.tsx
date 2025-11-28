"use client";

import React, { useRef, useState } from 'react'
import { Request, Task } from '../types';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft, RotateCcw, Send, XCircle } from 'lucide-react';


const initialTask: Task = {
  room: '',
  category: '',
  title: '',
  assignee: '',
  dueTime: '',
};

interface DepartmentColorConfig {
  bg: string;
  text: string;
  border: string;
}

const departmentColors: Record<string, DepartmentColorConfig> = {
  Housekeeping: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500' },
  Engineering: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500' },
  Concierge: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-500' },
  'Front Desk': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500' },
  Other: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-500' },
};

export default function NewRequestPage() {
  const [task, setTask] = useState<Task>(initialTask);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // MediaRecorder setup - explicitly typing the ref
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const router = useRouter();

  const currentCategory = task.category || 'Other';
  const color = departmentColors[currentCategory] || departmentColors['Other'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
      const { id, value } = e.target;
      setTask(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Simple validation: check if all values are non-empty strings
    const isValid = Object.values(task).every(val => typeof val === 'string' && val.trim() !== '');

    if (isValid) {
      const newTask: Request = {
        ...task,
        id: Date.now(), 
        status: 'TODO',
      };

      alert('Request submitted successfully! (This is a mock implementation.)');

      // setTasks([newTask, ...tasks]);
      router.replace('/requests');
    } else {
      setError('Please ensure all form fields are filled before submission.');
    }
  };

  const resetForm = (): void => {
    setTask(initialTask);
    setError(null);
    setStatusMessage('');
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-4 bg-white border-b shadow-sm">
        <button
          onClick={() => router.replace('/requests')}
          className="text-gray-600 hover:text-indigo-600 p-1 rounded-full transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 flex-1 text-center pr-8">
          New Request
        </h1>
      </div>
      
      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Status Area */}
        <div className="min-h-8 flex items-center justify-center">
          {isLoading && (
            <div className="flex items-center space-x-2 text-indigo-600">
              <span className="animate-spin h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full"></span>
              <span>{statusMessage}</span>
            </div>
          )}
          {error && (
            <div className="flex items-center space-x-2 text-red-600">
              <XCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
          {!isLoading && statusMessage && !error && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>
        
        {/* Microphone Button */}
        <div className="flex flex-col items-center space-y-2 py-4 border border-dashed border-gray-300 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">
              Hold to speak your request:
            </p>
          {/* <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            disabled={isLoading}
            className={`
              w-20 h-20 rounded-full shadow-xl transition-all duration-300 ease-in-out
              flex items-center justify-center text-white
              ${isRecording
                ? 'bg-red-500 hover:bg-red-600 ring-4 ring-red-300 scale-110'
                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            title={isRecording ? 'Release to stop recording' : 'Hold to record task'}
          >
            <Mic className={`w-7 h-7 ${isRecording ? 'animate-pulse' : ''}`} />
          </button> */}
          <p className="text-xs text-gray-400">
              {isRecording ? 'RECORDING...' : 'Press and Hold'}
          </p>
        </div>
        
        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Room */}
          <div>
            <label htmlFor="room" className="block text-sm font-medium text-gray-700">Room</label>
            <input type="text" id="room" value={task.room} onChange={handleInputChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-gray-900 placeholder-gray-400" placeholder="e.g., 405" required />
          </div>

          {/* Category (Department) */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <div className="mt-1 flex items-center space-x-3">
              <select id="category" value={task.category} onChange={handleInputChange} className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-gray-900" required>
                <option value="">Select Department</option>
                {Object.keys(departmentColors).filter(d => d !== 'Other').map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {task.category && (
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color.bg} ${color.text}`}>
                  {task.category}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" value={task.title} onChange={handleInputChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-gray-900 placeholder-gray-400" placeholder="e.g., Leaking Shower Head" required />
          </div>

          {/* Assignee */}
          <div>
            <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">Assignee</label>
            <input type="text" id="assignee" value={task.assignee} onChange={handleInputChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-gray-900 placeholder-gray-400" placeholder="e.g., Alex" required />
          </div>

          {/* Due Time */}
          <div>
            <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700">Due Time</label>
            <input type="text" id="dueTime" value={task.dueTime} onChange={handleInputChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-gray-900 placeholder-gray-400" placeholder="e.g., 8:00 PM or ASAP" required />
          </div>
          
          <div className="flex justify-between space-x-4 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Clear Form
            </button>
            <button
              type="submit"
              disabled={isLoading || !task.title}
              className="flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:opacity-50"
            >
              <Send className="w-6 h-6 mr-2" /> SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
