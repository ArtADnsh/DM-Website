import { teamMembers } from "./teamMembers";

// The Contact page reuses each head's profile (name, photo, email, Telegram,
// badge) from teamMembers.js - the single source of truth - and only adds the
// short "scope" line describing what to contact them about.
const headScopes = [
  { id: "hta-01", scope: "Overall Course Logistics & Head TA Support" },
  { id: "hta-02", scope: "Overall Course Logistics & Head TA Support" },
  { id: "ta-17", scope: "Weekly Problem-Solving & Tutorial Sessions" },
  { id: "ta-08", scope: "Homework Assignments & Problem Sets" },
  { id: "ta-13", scope: "Course Programming & Research Project" },
  { id: "ta-06", scope: "Weekly Quizzes & Exam Grading" },
];

export const contactHeads = headScopes.flatMap(({ id, scope }) => {
  const member = teamMembers.find((candidate) => candidate.id === id);
  return member ? [{ ...member, scope }] : [];
});
