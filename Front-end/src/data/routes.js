/**
 * Every route of the site in one place. `path` is the canonical URL;
 * `matches` also lists legacy aliases that render the same page.
 */
const route = (path, ...aliases) => ({ path, matches: [path, ...aliases] });

export const ROUTES = {
  home: route('/'),
  materials: route('/materials'),
  project: route('/project'),
  recitations: route('/recitations', '/videos', '/tutorials'),
  team: route('/tas'),
  mentors: route('/mentors', '/mentor'),
  contact: route('/contact'),
};

export const RECITATION_DETAIL_PATTERN = /^\/recitations\/(\d+)$/;

export const recitationPath = (id) => `${ROUTES.recitations.path}/${id}`;
