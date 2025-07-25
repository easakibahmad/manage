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

type User = {
  id: number;
  name: string;
  email: string;
};

export type { Team, Member, TeamMembersDetailPopupProps, User };