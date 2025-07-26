import { useEffect, useState } from "react";
import type { User } from "../types/teams";

type Task = {
  title: string;
  description: string;
  assignedTo: string;
  status: string;
};

type Props = {
  onClose: () => void;
  onCreated?: () => void;
};

const CreateTaskPopup = ({ onClose, onCreated }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("todo");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_JSON_API}/users`);
      const data: User[] = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    const newTask: Task = {
      title,
      description,
      assignedTo,
      status,
    };

    await fetch(`${import.meta.env.VITE_SERVER_JSON_API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    onClose();
    if (onCreated) onCreated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 max-w-xl w-full shadow-lg animate-fade-in">
        <h2 className="text-xl font-bold mb-4">Create a New Task</h2>

        <input
          type="text"
          placeholder="Task Title"
          className="w-full mb-3 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task Description"
          className="w-full mb-3 p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full mb-3 p-2 border rounded"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Assign to</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          className="w-full mb-3 p-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-yellow-400 font-bold hover:underline rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-black text-yellow-400 font-bold hover:underline rounded cursor-pointer"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPopup;
