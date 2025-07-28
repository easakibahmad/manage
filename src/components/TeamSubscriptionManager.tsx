import { useEffect, useState } from "react";
import type { Plan, Subscription } from "../types/billing";

type Props = {
  teamId: string;
};

const TeamSubscriptionManager = ({ teamId }: Props) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_JSON_API}/plans`);
      setPlans(await res.json());
    };
    const fetchSubscription = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_JSON_API}/subscriptions?teamId=${teamId}`
      );
      const data = await res.json();
      setSubscription(data[0] || null);
    };
    fetchPlans();
    fetchSubscription();
  }, [teamId]);

  const handleSubscribe = async () => {
    const newSubscription: Omit<Subscription, "id"> = {
      teamId,
      planId: selectedPlanId,
      status: "active",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    await fetch(`${import.meta.env.VITE_SERVER_JSON_API}/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSubscription),
    });

    window.location.reload();
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold text-lg mb-2">Manage Subscription</h2>

      {subscription ? (
        <p>
          <strong>Current Plan:</strong> {subscription.planId} (until{" "}
          {new Date(subscription.endDate).toLocaleDateString()})
        </p>
      ) : (
        <>
          <select
            className="border p-2 my-2 w-full"
            onChange={(e) => setSelectedPlanId(e.target.value)}
          >
            <option value="">Select a plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - ${plan.price}/mo
              </option>
            ))}
          </select>
          <button
            className="bg-black text-yellow-400 px-4 py-2 rounded font-bold"
            onClick={handleSubscribe}
            disabled={!selectedPlanId}
          >
            Subscribe
          </button>
        </>
      )}
    </div>
  );
};

export default TeamSubscriptionManager;
