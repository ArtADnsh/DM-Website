import { siteInfo } from './site';

export const homeContent = {
  gallery: [
    {
      id: 1,
      src: '/images/classroom1.webp',
      alt: `${siteInfo.courseName} Lecture Hall with ${siteInfo.instructorName}`,
      label: 'Lecture Hall',
    },
    {
      id: 2,
      src: '/images/classroom2.webp',
      alt: 'Problem Solving Workshop and Recitation Session',
      label: 'Problem Solving Workshop',
    },
    {
      id: 3,
      src: '/images/classroom3.webp',
      alt: 'Computer Science Lab Session',
      label: 'Computer Science Lab',
    },
  ],

  course: {
    eyebrow: `${siteInfo.courseName} · ${siteInfo.term}`,
    title: 'Discrete Mathematics & Data Fundamentals',
    professor: siteInfo.instructorName,
    university: siteInfo.universityName,
    department: siteInfo.departmentName,
    semester: siteInfo.term,
    schedule: siteInfo.lectureSchedule,

    description:
      'This portal is the central hub for Discrete Mathematics. Access lecture notes, download assignment problem sets, view quiz solutions, check weekly recitation schedules, and stay updated with official announcements.',

    secondaryDescription:
      'The course focuses on mathematical logic, set theory, graph theory, combinatorics, recurrence relations, and discrete algorithms forming the bedrock of computer science.',

    features: [
      'Lecture notes & materials',
      'Assignments & quizzes',
      'Recitation classes',
      'TA team support',
    ],
  },
};