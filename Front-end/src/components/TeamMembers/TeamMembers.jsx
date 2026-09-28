import TeamMemberCard from '../TeamMemberCard/TeamMemberCard';
import styles from './TeamMembers.module.css';

const DEFAULT_ROLE_CONFIG = {
  Professor: {
    label: 'Professor',
    description: 'Course instructor and academic lead.',
  },
  HTA: {
    label: 'Head Teaching Assistants',
    description: 'Coordinating the teaching assistant team and course support.',
  },
  TA: {
    label: 'Teaching Assistants',
    description: 'Supporting tutorials, exercises, assignments, and student questions.',
  },
};

const DEFAULT_ROLE_ORDER = ['Professor', 'HTA', 'TA'];

const GRID_VARIANTS = {
  Professor: styles.professorGrid,
  HTA: styles.htaGrid,
  TA: styles.taGrid,
};

function groupMembersByRole(members, roleOrder, roleConfig) {
  const groupedMembers = members.reduce((groups, member) => {
    const role = member.role || 'Other';

    if (!groups[role]) {
      groups[role] = [];
    }

    groups[role].push(member);
    return groups;
  }, {});

  const configuredRoles = roleOrder.filter((role) => groupedMembers[role]?.length);
  const remainingRoles = Object.keys(groupedMembers).filter(
    (role) => !configuredRoles.includes(role),
  );

  return [...configuredRoles, ...remainingRoles].map((role) => ({
    role,
    label: roleConfig[role]?.label || role,
    description: roleConfig[role]?.description,
    members: groupedMembers[role],
  }));
}

function TeamMembers({
  members = [],
  eyebrow = 'Course team',
  title = 'Teaching Team',
  description = 'Meet the people supporting you throughout the course.',
  roleOrder = DEFAULT_ROLE_ORDER,
  roleConfig = DEFAULT_ROLE_CONFIG,
}) {
  const groups = groupMembersByRole(members, roleOrder, roleConfig);
  const memberCount = members.length;

  if (!memberCount) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="team-title">
      <div className={styles.panel}>
        <header className={styles.header}>
          <div className={styles.headingCopy}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 id="team-title" className={styles.title}>
              {title}
            </h2>
            {description && <p className={styles.description}>{description}</p>}
          </div>

          <div className={styles.memberCount} aria-label={`${memberCount} team members`}>
            <strong>{memberCount}</strong>
            <span>{memberCount === 1 ? 'member' : 'members'}</span>
          </div>
        </header>

        <div className={styles.groups}>
          {groups.map((group) => (
            <section className={styles.group} key={group.role}>
              <div className={styles.groupHeader}>
                <div className={styles.groupHeading}>
                  <h3 className={styles.groupTitle}>{group.label}</h3>
                  {group.description && (
                    <p className={styles.groupDescription}>{group.description}</p>
                  )}
                </div>

                <span className={styles.groupCount} aria-label={`${group.members.length} people`}>
                  {group.members.length.toString().padStart(2, '0')}
                </span>
              </div>

              <div className={`${styles.grid} ${GRID_VARIANTS[group.role] || styles.taGrid}`}>
                {group.members.map((member) => (
                  <TeamMemberCard
                    key={member.id || member.email || member.name}
                    name={member.name}
                    role={member.role}
                    focus={member.focus}
                    image={member.image}
                    email={member.email}
                    telegram={member.telegram}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamMembers;
