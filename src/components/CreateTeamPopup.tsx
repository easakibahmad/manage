import { useState, useEffect } from "react";
import type { User, Team, Member } from "../types/teams";

type Props = {
  onClose: () => void;
};

const CreateTeamPopup = ({ onClose }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<
    { userId: number; role: Member["role"] }[]
  >([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_JSON_API}/users`);
      const data: User[] = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleMemberChange = (userId: number, role: Member["role"]) => {
    setSelectedMembers((prev) => {
      const exists = prev.find((m) => m.userId === userId);
      if (exists) {
        return prev.map((m) => (m.userId === userId ? { ...m, role } : m));
      }
      return [...prev, { userId, role }];
    });
  };

  const handleCreate = async () => {
    const members: Member[] = selectedMembers.map((m) => {
      const user = users.find((u) => u.id === m.userId)!;
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: m.role,
      };
    });

    const newTeam: Omit<Team, "id"> = {
      name,
      description,
      members,
    };

    await fetch(`${import.meta.env.VITE_SERVER_JSON_API}/teams`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTeam),
    });

    onClose(); // Close popup after creation
    window.location.reload(); // Optional: refetch or reload
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 max-w-xl w-full shadow-lg animate-fade-in">
        <h2 className="text-xl font-bold mb-4">Create a New Team</h2>

        <input
          type="text"
          placeholder="Team Name"
          className="w-full mb-3 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Team Description"
          className="w-full mb-3 p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <h3 className="font-semibold mb-2">Add Members</h3>
        <div className="max-h-40 overflow-y-auto border p-2 rounded mb-4">
          {users.map((user) => (
            <div key={user.id} className="flex justify-between items-center py-1">
              <p>{user.name}</p>
              <select
                className="border p-1 rounded"
                onChange={(e) =>
                  handleMemberChange(user.id, e.target.value as Member["role"])
                }
                defaultValue=""
              >
                <option value="">Select Role</option>
                <option value="Owner">Owner</option>
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
              </select>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-yellow-400 font-bold hover:underline rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-black text-yellow-400 hover:underline font-bold rounded cursor-pointer"
          >
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamPopup;
