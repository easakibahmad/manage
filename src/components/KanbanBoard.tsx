import React, { useState } from 'react';
import CreateTaskPopup from './CreateTaskPopup';

type Task = {
  id: string;
  title: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const initialData: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [{ id: 'task-1', title: 'Initial Task' }],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      { id: 'task-2', title: 'Write documentation' },
      { id: 'task-3', title: 'Review PR #42' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 'task-4', title: 'Initial setup' },
      { id: 'task-5', title: 'Install dependencies' },
      { id: 'task-6', title: 'Configure ESLint' },
    ],
  },
];

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialData);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 items-start">
      {columns.map((col) => (
        <div
          key={col.id}
          className="bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">{col.title}</h3>
            <div className="space-y-3">
              {col.tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <p className="text-gray-700 font-medium">{task.title}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setShowPopup(true)} className="mt-6 w-full text-sm font-semibold bg-black text-yellow-400 py-2 rounded-xl hover:opacity-90 transition">
            + Add Task
          </button>
        </div>
      ))}
      {showPopup && (
        <CreateTaskPopup
          onClose={() => setShowPopup(false)}
          onCreated={() => {
            setShowPopup(false);
            // optionally refresh your task list here
          }}
        />
      )}
    </div>
  );
};

export default KanbanBoard;