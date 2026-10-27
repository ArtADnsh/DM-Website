import { getTeamMember, getTeamMembersByCategory } from './teamMembers';

/**
 * Single source of truth for course / university facts that appear in several
 * places (header, footer, home, contact, page titles…). People are NOT
 * duplicated here - they come from teamMembers.js.
 */
const [professor] = getTeamMembersByCategory('professor');

export const siteInfo = {
  courseName: 'Discrete Mathematics',
  universityName: 'Iran University of Science and Technology',
  universityShortName: 'IUST',
  departmentName: 'Department of Computer Engineering',
  address: 'Narmak, Tehran, Iran',
  semesterCode: '4051',
  term: 'Fall 2026',
  copyrightYear: 2026,
  lectureSchedule: 'Saturdays & Mondays, 07:30 - 09:00',
  instructorName: professor.name,
};

/** Head TAs shown in the footer (the 'hta' category of teamMembers.js). */
export const headTAs = getTeamMembersByCategory('hta');

/** People credited for building the website (ids from teamMembers.js). */
export const websiteCreators = ['ta-01', 'ta-02'].map(getTeamMember).filter(Boolean);

/** "<page> | Discrete Mathematics · IUST" */
export function formatPageTitle(title) {
  return `${title} | ${siteInfo.courseName} · ${siteInfo.universityShortName}`;
}
