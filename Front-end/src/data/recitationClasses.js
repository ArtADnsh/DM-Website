/**
 * Mock data for the "Recitation Classes" (حل تمرین) pages.
 *
 * Each class has its own `files` (slides / worksheets / solutions) and
 * `videos` (recordings). When the backend endpoint is ready, replace the
 * export with a fetch and keep this shape — the pages only depend on it.
 *
 *   url: '#' (or empty)  ->  rendered as a disabled "Coming soon" button.
 */
export const recitationClasses = [
  {
    id: 1,
    number: '01',
    title: 'Propositional Logic & Truth Tables',
    description:
      'Truth tables, logical equivalences, and translating compound propositions.',
    instructor: 'Amir Jebbeli',
    instructor_telegram: '@Amir_Jebbeli',
    date: 'Oct 3, 2026',
    files: [
      {
        id: 'r1-f1',
        title: 'Session 1 Slides',
        description: 'Summary of the topics covered in the class.',
        type: 'PDF',
        size: '1.8 MB',
        url: '/materials/chapter1_logic.pdf',
      },
      {
        id: 'r1-f2',
        title: 'Exercise Sheet 1',
        description: 'Problems solved during the session.',
        type: 'PDF',
        size: '640 KB',
        url: '#',
      },
      {
        id: 'r1-f3',
        title: 'Detailed Solutions',
        description: 'Step-by-step solutions to every exercise.',
        type: 'PDF',
        size: '2.2 MB',
        url: '#',
      },
    ],
    videos: [
      {
        id: 'r1-v1',
        title: 'Propositional Logic & Truth Tables',
        description:
          'Full problem-solving session on truth tables and logical equivalences.',
        instructor: 'Amir Jebbeli',
        duration: '52 min',
        url: 'https://www.youtube.com/watch?v=1xNsm_0s3x4',
      },
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'Predicates, Quantifiers & Proof Techniques',
    description:
      'Direct proofs, contradiction, contrapositive, and nested quantifiers.',
    instructor: 'Kasra Nouri',
    instructor_telegram: '@UnicornKN',
    date: 'Oct 10, 2026',
    files: [
      {
        id: 'r2-f1',
        title: 'Session 2 Slides',
        description: 'Quantifier rules and proof templates.',
        type: 'PDF',
        size: '2.1 MB',
        url: '#',
      },
      {
        id: 'r2-f2',
        title: 'Exercise Sheet 2',
        description: 'Practice problems on proofs and quantifiers.',
        type: 'PDF',
        size: '710 KB',
        url: '#',
      },
    ],
    videos: [
      {
        id: 'r2-v1',
        title: 'Predicates & Quantifiers',
        description: 'Translating statements and negating nested quantifiers.',
        instructor: 'Kasra Nouri',
        duration: '34 min',
        url: 'https://www.youtube.com/watch?v=wX-bK0l2t7E',
      },
      {
        id: 'r2-v2',
        title: 'Proof Techniques Workshop',
        description: 'Worked examples of direct proof and proof by contradiction.',
        instructor: 'Kasra Nouri',
        duration: '34 min',
        url: 'https://www.youtube.com/watch?v=d_kXz9vEwS0',
      },
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'Mathematical Induction & Strong Induction',
    description:
      'Weak and strong induction, structural induction, and well-ordering.',
    instructor: 'Arta Danesh',
    instructor_telegram: '@ArtA_Dnsh',
    date: 'Oct 17, 2026',
    files: [
      {
        id: 'r3-f1',
        title: 'Session 3 Slides',
        description: 'Induction patterns and common pitfalls.',
        type: 'PDF',
        size: '1.5 MB',
        url: '#',
      },
      {
        id: 'r3-f2',
        title: 'Exercise Sheet 3',
        description: 'Induction problems of increasing difficulty.',
        type: 'PDF',
        size: '590 KB',
        url: '#',
      },
      {
        id: 'r3-f3',
        title: 'Detailed Solutions',
        description: 'Complete write-ups for all exercises.',
        type: 'PDF',
        size: '1.9 MB',
        url: '#',
      },
    ],
    videos: [
      {
        id: 'r3-v1',
        title: 'Mathematical Induction & Strong Induction',
        description: 'Weak induction, strong induction, and structural induction.',
        instructor: 'Arta Danesh',
        duration: '58 min',
        url: 'https://www.youtube.com/watch?v=d_kXz9vEwS0',
      },
    ],
  },
  {
    id: 4,
    number: '04',
    title: 'Set Theory, Functions & Pigeonhole Principle',
    description:
      'Set operations, bijections, cardinality, and pigeonhole arguments.',
    instructor: 'Koosha Majlesi',
    instructor_telegram: '@kmajl84',
    date: 'Oct 24, 2026',
    files: [
      {
        id: 'r4-f1',
        title: 'Session 4 Slides',
        description: 'Sets, functions, and cardinality overview.',
        type: 'PDF',
        size: '2.6 MB',
        url: '#',
      },
    ],
    videos: [
      {
        id: 'r4-v1',
        title: 'Set Theory & Functions',
        description: 'Set identities, injective / surjective / bijective functions.',
        instructor: 'Koosha Majlesi',
        duration: '47 min',
        url: 'https://www.youtube.com/watch?v=ROd4o4eZ-g8',
      },
    ],
  },
  {
    id: 5,
    number: '05',
    title: 'Number Theory & Modular Arithmetic',
    description:
      'Euclidean algorithm, modular inverses, and the Chinese Remainder Theorem.',
    instructor: 'Arash Amiri',
    instructor_telegram: '@ArashNamNam',
    date: 'Oct 31, 2026',
    files: [],
    videos: [],
  },
  {
    id: 6,
    number: '06',
    title: 'Counting, Permutations & Combinations',
    description:
      'Inclusion-exclusion, permutations, combinations, and binomial identities.',
    instructor: 'Erfan Taghizadeh',
    instructor_telegram: '@erfantaghizadeh',
    date: 'Nov 7, 2026',
    files: [],
    videos: [],
  },
];

export function getRecitationClass(id) {
  return recitationClasses.find((item) => String(item.id) === String(id)) ?? null;
}
