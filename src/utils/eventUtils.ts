
import { Event, ImportanceLevel } from "@/types/event";

// Helper function to generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Generate initial sample events
export const generateSampleEvents = (): Event[] => {
  return [
    {
      id: generateId(),
      title: "Project Kickoff",
      date: new Date(2023, 0, 15),
      description: "Initial meeting with stakeholders to launch the project",
      importance: "high",
    },
    {
      id: generateId(),
      title: "Design Phase Completed",
      date: new Date(2023, 2, 10),
      description: "UI/UX designs finalized and approved",
      importance: "medium",
    },
    {
      id: generateId(),
      title: "Beta Testing",
      date: new Date(2023, 5, 20),
      description: "Started beta testing with a select group of users",
      importance: "high",
    },
    {
      id: generateId(),
      title: "Feature Update",
      date: new Date(2023, 8, 5),
      description: "Added new analytics dashboard",
      importance: "low",
    },
  ];
};

// Sort events by date
export const sortEventsByDate = (events: Event[], ascending: boolean = true): Event[] => {
  return [...events].sort((a, b) => {
    return ascending ? a.date.getTime() - b.date.getTime() : b.date.getTime() - a.date.getTime();
  });
};

// Filter events by importance
export const filterEventsByImportance = (events: Event[], importance: ImportanceLevel | "all"): Event[] => {
  if (importance === "all") return events;
  return events.filter(event => event.importance === importance);
};

// Helper to format date for display
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
