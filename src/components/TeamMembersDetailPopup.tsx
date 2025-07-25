import type { TeamMembersDetailPopupProps } from "../types/teams";

const TeamMembersDetailPopup = ({selectedTeam, closeModal}: TeamMembersDetailPopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full animate-fade-in">
        <h4 className="text-lg font-bold mb-4">{selectedTeam.name} - Members</h4>
        {selectedTeam.members.length === 0 ? (
            <p className="text-gray-500">No members in this team.</p>
        ) : (
            <ul className="space-y-2">
            {selectedTeam.members.map((member) => (
                <li key={member.id} className="border-b pb-2">
                <p className="font-medium">{member.name}</p>
                <p className="text-xs text-gray-500">{member.email} — {member.role}</p>
                </li>
            ))}
            </ul>
        )}
        <button
            onClick={closeModal}
            className="mt-6 px-4 py-2 bg-black text-yellow-400 hover:underline font-bold text-white rounded-lg transition cursor-pointer"
        >
            Close
        </button>
        </div>
    </div>
  )
}

export default TeamMembersDetailPopup