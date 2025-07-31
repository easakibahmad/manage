import { useState } from "react";

import TeamMembersDetailPopup from "@/components/TeamMembersDetailPopup";
import CreateTeamPopup from "@/components/CreateTeamPopup";

import type { Team } from "@/types/teams";
import useTeams from "@/custom_hooks/teams_hook";

const Teams = () => {
  const { teams, loading, error } = useTeams();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const closeModal = () => setSelectedTeam(null);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Team List</h2>
        <button
          onClick={() => setShowCreatePopup(true)}
          className="px-4 py-2 bg-black rounded-lg transition cursor-pointer"
        >
          <span className="text-yellow-400 font-bold">+ Create Your Team</span>
        </button>
      </div>
      {showCreatePopup && (
        <CreateTeamPopup onClose={() => setShowCreatePopup(false)} />
      )}

      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div
              key={team.id}
              className="group relative bg-white rounded-2xl shadow-lg p-6 border hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{team.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{team.description}</p>
              <p
                onClick={() => setSelectedTeam(team)}
                className="text-black cursor-pointer mt-3 text-sm underline hover:text-yellow-500"
              >
                Members: {team.members?.length || 0}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedTeam && ( <TeamMembersDetailPopup 
      selectedTeam={selectedTeam} 
      closeModal={closeModal} />)}
    </div>
  );
};

export default Teams;
