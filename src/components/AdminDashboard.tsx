import React, { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type Member = User & {
  role: "Owner" | "Admin" | "Member";
};

type Team = {
  id: string;
  name: string;
  description: string;
  members: Member[];
};

const AdminDashboard = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filterRole, setFilterRole] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_JSON_API}/teams`);
        const data = await res.json();
        setTeams(data);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const filteredTeams = teams.map((team) => ({
    ...team,
    members: team.members.filter((member) =>
      (filterRole === "All" || member.role === filterRole) &&
      member.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  const roleCounts = teams.reduce(
    (acc, team) => {
      team.members.forEach((m) => {
        acc[m.role] = (acc[m.role] || 0) + 1;
      });
      return acc;
    },
    { Owner: 0, Admin: 0, Member: 0 } as Record<string, number>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto h-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">HR/Admin Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <select
          className="border p-2 rounded"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Owner">Owner</option>
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
        </select>

        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="text-sm text-gray-600 ml-auto">
          <span className="mr-4">Owner: {roleCounts.Owner}</span>
          <span className="mr-4">Admin: {roleCounts.Admin}</span>
          <span>Member: {roleCounts.Member}</span>
        </div>
      </div>

      {filteredTeams.map((team) => (
        <div key={team.id} className="mb-6 border rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold">{team.name}</h2>
          <p className="text-gray-500 mb-2">{team.description}</p>

          {team.members.length === 0 ? (
            <p className="text-gray-400 italic">No members found.</p>
          ) : (
            <ul className="divide-y">
              {team.members.map((member) => (
                <li key={member.id} className="py-2 flex justify-between">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                  <span className="px-2 py-1 text-sm rounded bg-gray-100 border">
                    {member.role}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
