import { Step } from "onborda"

type Steps = {
  tour: string
  steps: Step[]
}

export const KANBAN_ONBOARDING_STEPS: Steps[] = [
  {
    tour: "kanban-onboarding",
    steps: [
      {
        icon: "👋",
        title: "Welcome to HHN Kanban!",
        content:
          "Hey there, I will be your tour guide to help you get started with your first board.",
        selector: "#step-1-start-tour",
        side: "top",
        nextRoute: "/kanban/onboarding/team",
      },
      {
        icon: "👥",
        title: "Create a Team",
        content:
          "Every board belongs to a team, so you can collaborate with others.",
        selector: "#step-2-create-team",
        side: "top",
        prevRoute: "/kanban/onboarding",
      },
      {
        icon: "🏷️",
        title: "Name your team",
        content: "Give your team a name that represents your project or group.",
        selector: "#step-3-team-name",
        side: "top",
      },
      {
        icon: "🎉",
        title: "Finish Creating Your Team",
        content:
          "Great! You've created your team. Let's move on to creating your first board.",
        selector: "#step-4-finish-create-team",
        side: "top",
        nextRoute: "/kanban/onboarding/board",
      },
      {
        icon: "📝",
        title: "Create a Board",
        content:
          "Boards are where you can organize your tasks and collaborate with your team.",
        selector: "#step-5-create-board",
        side: "top",
        prevRoute: "/kanban/onboarding/team",
      },
      {
        icon: "🏷️",
        title: "Name your board",
        content:
          "Give your board a name that represents your project or group.",
        selector: "#step-6-board-name",
        side: "top",
      },
      {
        icon: "🎉",
        title: "You're all set!",
        content:
          "Congratulations! You've created your first board. Now you can start managing your tasks.",
        selector: "#step-7-complete-onboarding",
        side: "top",
        nextRoute: "/kanban",
      },
    ],
  },
]
