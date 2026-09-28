import styles from './Home.module.css';
import TeamMembers from '../../components/TeamMembers/TeamMembers';
import kooshaPhoto from '../../assets/logo_dark.webp';

const members = [
  {
    id: 'koosha-majlessi',
    name: 'Koosha Majlessi',
    role: 'TA',
    image: kooshaPhoto,
    email: 'koosha@iust.ac.ir',
    telegram: '@koosha_majlessi',
  },
  {
    id: 'ali-hosseini',
    name: 'Ali Hosseini',
    role: 'TA',
    image: kooshaPhoto,
    email: 'ali@iust.ac.ir',
    telegram: '@ali_hosseini',
  },
  {
    id: 'reza-ahmadi',
    name: 'Reza Ahmadi',
    role: 'TA',
    image: kooshaPhoto,
    email: 'reza@iust.ac.ir',
    telegram: '@reza_ahmadi',
  },
  {
    id: 'sara-mohammadi',
    name: 'Sara Mohammadi',
    role: 'TA',
    image: kooshaPhoto,
    email: 'sara@iust.ac.ir',
    telegram: '@sara_m',
  },
];

function Home() {
  return (
    <section className={styles.home}>
      <TeamMembers
        eyebrow="Discrete Mathematics"
        title="Course Team"
        description="Meet the instructors and teaching assistants supporting the course throughout the semester."
        members={members}
      />
    </section>
  );
}

export default Home;
