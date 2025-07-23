import { useEffect, useState } from "react";

import type { Team } from "../types/teams";

const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_JSON_API}/teams`);
        if (!res.ok) throw new Error("Failed to fetch teams");
        const data: Team[] = await res.json();
        setTeams(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return { teams, loading, error };
};

export default useTeams;
