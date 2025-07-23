type Member = {
  id: number;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
};

type Team = {
  id: number;
  name: string;
  description: string;
  members: Member[];
};

type TeamMembersDetailPopupProps = {
  selectedTeam: Team;
  closeModal: () => void;
};

export type { Team, Member, TeamMembersDetailPopupProps };