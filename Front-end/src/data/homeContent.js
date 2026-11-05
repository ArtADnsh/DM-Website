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
      'Everything for the course in one place: lecture notes, assignments, quizzes, recitation classes, and announcements.',

    secondaryDescription:
      'Topics include logic and proofs, set theory, number theory, combinatorics, and graph theory.',

    features: [
      'Lecture notes & materials',
      'Assignments & quizzes',
      'Recitation classes',
      'TA team support',
    ],
  },
};