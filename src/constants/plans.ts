import {
  MAX_BASIC_BOARDS,
  MAX_FREE_BOARDS,
  MAX_PRO_BOARDS,
} from "@/constants/boards"
import {
  MONTHLY_BASIC_PRICE,
  MONTHLY_FREE_PRICE,
  MONTHLY_PRO_PRICE,
  YEARLY_BASIC_PRICE,
  YEARLY_FREE_PRICE,
  YEARLY_PRO_PRICE,
} from "@/constants/pricing"
import {
  MAX_BASIC_TEAMS,
  MAX_FREE_TEAMS,
  MAX_PRO_TEAMS,
} from "@/constants/teams"

export const PLANS = [
  {
    title: "Free",
    monthlyPrice: MONTHLY_FREE_PRICE,
    yearlyPrice: YEARLY_FREE_PRICE,
    description: "Free forever for personal use and small teams.",
    features: [
      `${MAX_FREE_TEAMS} Team`,
      `${MAX_FREE_BOARDS} board on each team`,
      "Unlimited members",
      "Unlimited tasks",
    ],
    actionLabel: "Go to dashboard",
  },
  {
    title: "Basic",
    monthlyPrice: MONTHLY_BASIC_PRICE,
    yearlyPrice: YEARLY_BASIC_PRICE,
    description: "Essential features for small teams and growing businesses.",
    features: [
      `${MAX_BASIC_TEAMS} Team`,
      `${MAX_BASIC_BOARDS} boards on each team`,
      "Everything in Free",
    ],
    actionLabel: "Choose Basic",
    popular: true,
  },
  {
    title: "Pro",
    monthlyPrice: MONTHLY_PRO_PRICE,
    yearlyPrice: YEARLY_PRO_PRICE,
    description: "Perfect for growing teams and small to medium businesses.",
    features: [
      `${MAX_PRO_TEAMS} teams`,
      `${MAX_PRO_BOARDS} boards on each team`,
      "Everything in Basic",
    ],
    actionLabel: "Choose Pro",
    exclusive: true,
  },
]
