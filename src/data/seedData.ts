// ============================================================================
// LearningHub Platform - In-Memory Seed & Fallback Data Layer
// Provides offline demo data when Supabase backend is unreachable / stopped.
// ============================================================================

export interface SeedCategory {
  id: string;
  name: string;
  description: string | null;
  slug?: string | null;
  icon?: string | null;
  created_at: string;
  courseCount?: number;
}

export interface SeedProfile {
  id: string;
  full_name: string;
  avatar_url: string;
  bio?: string;
  role: 'student' | 'instructor' | 'admin';
}

export interface SeedLesson {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
  duration_minutes: number;
  lesson_type: 'video' | 'document' | 'quiz';
  video_url?: string;
}

export interface SeedReview {
  id: string;
  course_id: string;
  student_id: string;
  rating: number;
  comment: string;
  created_at: string;
  student?: {
    full_name: string;
    avatar_url?: string;
  };
}

export interface SeedCourse {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  category_id: string;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  status: 'approved' | 'pending' | 'draft';
  thumbnail_url: string;
  created_at: string;
  instructor_profile?: {
    full_name: string;
    avatar_url?: string;
    bio?: string;
  };
  category?: {
    name: string;
  };
  enrollments?: Array<{ id: string }>;
  reviews?: Array<{ rating: number; comment?: string; student_id?: string; created_at?: string }>;
  lessons?: SeedLesson[];
}

export const SEED_PROFILES: Record<string, SeedProfile> = {
  'prof-inst-01': {
    id: 'prof-inst-01',
    full_name: 'Eng. Abdulrahman Alkhatib',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Software & AI Engineer. Islamic University of Madinah CS Graduate. Certified by KAUST Academy & DeepLearning.AI.',
    role: 'instructor'
  },
  'prof-inst-02': {
    id: 'prof-inst-02',
    full_name: 'Dr. Olive Chen',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    bio: 'Senior Deep Learning Researcher & PyTorch specialist. Former Stanford AI lecturer.',
    role: 'instructor'
  },
  'prof-inst-03': {
    id: 'prof-inst-03',
    full_name: 'Alex Rivera',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Principal Cloud Architect & DevOps Consultant. AWS Certified Solutions Architect.',
    role: 'instructor'
  },
  'prof-stud-01': {
    id: 'prof-stud-01',
    full_name: 'Mohammed Al-Harbi',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    role: 'student'
  },
  'prof-stud-02': {
    id: 'prof-stud-02',
    full_name: 'Fahad Al-Otaibi',
    avatar_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    role: 'student'
  }
};

export const SEED_CATEGORIES: SeedCategory[] = [
  {
    id: 'cat-001',
    name: 'Artificial Intelligence & ML',
    description: 'Deep learning, neural networks, computer vision, and generative models.',
    slug: 'ai-ml',
    icon: 'Brain',
    created_at: new Date('2026-01-01').toISOString(),
    courseCount: 1
  },
  {
    id: 'cat-002',
    name: 'Full-Stack Web Development',
    description: 'Modern enterprise web apps with React 18, TypeScript, and cloud APIs.',
    slug: 'web-dev',
    icon: 'Code',
    created_at: new Date('2026-01-01').toISOString(),
    courseCount: 1
  },
  {
    id: 'cat-003',
    name: 'Cloud Computing & DevOps',
    description: 'AWS, Docker containers, Kubernetes clusters, and automated CI/CD pipelines.',
    slug: 'cloud-devops',
    icon: 'Cloud',
    created_at: new Date('2026-01-01').toISOString(),
    courseCount: 1
  },
  {
    id: 'cat-004',
    name: 'Data Science & Analytics',
    description: 'Statistical modeling, exploratory analysis, and predictive machine learning.',
    slug: 'data-science',
    icon: 'TrendingUp',
    created_at: new Date('2026-01-01').toISOString(),
    courseCount: 1
  },
  {
    id: 'cat-005',
    name: 'Cybersecurity & Defense',
    description: 'Ethical hacking, penetration testing, defensive hardening, and network security.',
    slug: 'cybersecurity',
    icon: 'Shield',
    created_at: new Date('2026-01-01').toISOString(),
    courseCount: 1
  },
  {
    id: 'cat-006',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile applications with React Native, Flutter, and native APIs.',
    slug: 'mobile-dev',
    icon: 'Smartphone',
    created_at: new Date('2026-01-01').toISOString(),
    courseCount: 1
  }
];

export const SEED_COURSES: SeedCourse[] = [
  {
    id: 'course-001',
    title: 'Deep Learning & Computer Vision with PyTorch & Transformers',
    description: 'Master state-of-the-art Convolutional Neural Networks (CNNs), Vision Transformers (ViT), transfer learning, and real-time object detection models using PyTorch. Built with production-ready benchmarks and KAUST Academy AI research standards.',
    instructor_id: 'prof-inst-01',
    category_id: 'cat-001',
    price: 89.99,
    level: 'advanced',
    duration_hours: 32,
    status: 'approved',
    thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    created_at: new Date('2026-02-15').toISOString(),
    instructor_profile: {
      full_name: 'Eng. Abdulrahman Alkhatib',
      avatar_url: SEED_PROFILES['prof-inst-01'].avatar_url,
      bio: SEED_PROFILES['prof-inst-01'].bio
    },
    category: {
      name: 'Artificial Intelligence & ML'
    },
    enrollments: [{ id: 'enr-001' }, { id: 'enr-002' }, { id: 'enr-003' }, { id: 'enr-004' }],
    reviews: [
      {
        rating: 5,
        comment: 'One of the best practical deep learning courses I have taken. Clear explanation of vision transformers with PyTorch code that runs out of the box!',
        student_id: 'prof-stud-01',
        created_at: new Date('2026-03-01').toISOString()
      },
      {
        rating: 5,
        comment: 'Outstanding architecture walkthrough. The benchmark section and mathematical breakdown of ViT helped me tremendously in my graduation project.',
        student_id: 'prof-stud-02',
        created_at: new Date('2026-03-10').toISOString()
      }
    ],
    lessons: [
      {
        id: 'les-101',
        course_id: 'course-001',
        title: '1. Introduction to Deep Neural Architectures',
        description: 'Overview of tensor representations, forward/backward propagation, and activation dynamics.',
        order_index: 1,
        duration_minutes: 45,
        lesson_type: 'video',
        video_url: 'https://www.youtube.com/embed/aircAruvnKk'
      },
      {
        id: 'les-102',
        course_id: 'course-001',
        title: '2. Designing Custom CNNs in PyTorch',
        description: 'Implementing custom Conv2d, BatchNorm, Dropout, and MaxPool modules with PyTorch nn.Module.',
        order_index: 2,
        duration_minutes: 60,
        lesson_type: 'video',
        video_url: 'https://www.youtube.com/embed/vT1JzLTH4G4'
      },
      {
        id: 'les-103',
        course_id: 'course-001',
        title: '3. Vision Transformers (ViT) & Multi-Head Attention',
        description: 'Patch embeddings, linear projection, self-attention mathematics, and fine-tuning pretrained ViT models.',
        order_index: 3,
        duration_minutes: 55,
        lesson_type: 'video',
        video_url: 'https://www.youtube.com/embed/trDaE3pBshY'
      },
      {
        id: 'les-104',
        course_id: 'course-001',
        title: '4. Hands-on Benchmark Lab & Metrics Validation',
        description: 'Practical benchmark notebook analyzing validation accuracy, loss curves, and confusion matrix.',
        order_index: 4,
        duration_minutes: 40,
        lesson_type: 'document'
      },
      {
        id: 'les-105',
        course_id: 'course-001',
        title: '5. Assessment: Vision Transformers & PyTorch Quiz',
        description: 'Interactive knowledge check covering convolution parameters, receptive field, and ViT tokenization.',
        order_index: 5,
        duration_minutes: 20,
        lesson_type: 'quiz'
      }
    ]
  },
  {
    id: 'course-002',
    title: 'Full-Stack Architecture: React 18, TypeScript & Scalable APIs',
    description: 'Comprehensive masterclass on modern full-stack web engineering with React 18, TypeScript, Tailwind CSS, TanStack Query, and robust RESTful API integration. Learn production patterns, state management, and enterprise component design.',
    instructor_id: 'prof-inst-01',
    category_id: 'cat-002',
    price: 79.99,
    level: 'intermediate',
    duration_hours: 45,
    status: 'approved',
    thumbnail_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    created_at: new Date('2026-02-10').toISOString(),
    instructor_profile: {
      full_name: 'Eng. Abdulrahman Alkhatib',
      avatar_url: SEED_PROFILES['prof-inst-01'].avatar_url,
      bio: SEED_PROFILES['prof-inst-01'].bio
    },
    category: {
      name: 'Full-Stack Web Development'
    },
    enrollments: [{ id: 'enr-005' }, { id: 'enr-006' }],
    reviews: [
      {
        rating: 5,
        comment: 'The clean code standards and TypeScript patterns taught here transformed how I write enterprise frontend code. Highly recommended!',
        student_id: 'prof-stud-01',
        created_at: new Date('2026-03-05').toISOString()
      }
    ],
    lessons: [
      {
        id: 'les-201',
        course_id: 'course-002',
        title: '1. React 18 Architecture: Concurrency & Fiber',
        description: 'Concurrent rendering, useTransition, useDeferredValue, and suspense boundaries.',
        order_index: 1,
        duration_minutes: 50,
        lesson_type: 'video',
        video_url: 'https://www.youtube.com/embed/bMknfKXIFA8'
      },
      {
        id: 'les-202',
        course_id: 'course-002',
        title: '2. Enterprise TypeScript: Generics & Utility Types',
        description: 'Advanced types, disciminated unions, runtime validations, and API contract interfaces.',
        order_index: 2,
        duration_minutes: 55,
        lesson_type: 'video',
        video_url: 'https://www.youtube.com/embed/BCg4U1FzODs'
      },
      {
        id: 'les-203',
        course_id: 'course-002',
        title: '3. TanStack Query Server State Synchronization',
        description: 'Query cache invalidation, optimistic UI mutations, and infinite scroll pagination.',
        order_index: 3,
        duration_minutes: 45,
        lesson_type: 'video',
        video_url: 'https://www.youtube.com/embed/lVLz_ASqAio'
      }
    ]
  },
  {
    id: 'course-003',
    title: 'Enterprise Cloud & DevOps: AWS, Kubernetes & CI/CD Pipelines',
    description: 'Deploy, monitor, and scale production-grade microservices on AWS using Docker, Terraform infrastructure-as-code, and GitHub Actions automated pipelines.',
    instructor_id: 'prof-inst-03',
    category_id: 'cat-003',
    price: 94.99,
    level: 'advanced',
    duration_hours: 28,
    status: 'approved',
    thumbnail_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    created_at: new Date('2026-01-20').toISOString(),
    instructor_profile: {
      full_name: 'Alex Rivera',
      avatar_url: SEED_PROFILES['prof-inst-03'].avatar_url,
      bio: SEED_PROFILES['prof-inst-03'].bio
    },
    category: {
      name: 'Cloud Computing & DevOps'
    },
    enrollments: [{ id: 'enr-007' }],
    reviews: [
      {
        rating: 5,
        comment: 'Hands-on, zero fluff. We deployed real Kubernetes clusters and setup automated CI/CD from scratch.',
        student_id: 'prof-stud-02',
        created_at: new Date('2026-02-28').toISOString()
      }
    ],
    lessons: [
      {
        id: 'les-301',
        course_id: 'course-003',
        title: '1. Containerization Fundamentals with Docker',
        description: 'Multi-stage builds, minimal base images, and docker compose development environments.',
        order_index: 1,
        duration_minutes: 45,
        lesson_type: 'video',
        video_url: 'https://www.youtube.com/embed/fqMOX6JJhGo'
      }
    ]
  },
  {
    id: 'course-004',
    title: 'Applied Data Science: Machine Learning, EDA & Statistical Models',
    description: 'Learn end-to-end data processing with NumPy, Pandas, Scikit-Learn, data visualization, exploratory data analysis (EDA), and predictive regression algorithms.',
    instructor_id: 'prof-inst-02',
    category_id: 'cat-004',
    price: 49.99,
    level: 'beginner',
    duration_hours: 35,
    status: 'approved',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    created_at: new Date('2026-01-15').toISOString(),
    instructor_profile: {
      full_name: 'Dr. Olive Chen',
      avatar_url: SEED_PROFILES['prof-inst-02'].avatar_url,
      bio: SEED_PROFILES['prof-inst-02'].bio
    },
    category: {
      name: 'Data Science & Analytics'
    },
    enrollments: [{ id: 'enr-008' }, { id: 'enr-009' }],
    reviews: [
      {
        rating: 5,
        comment: 'Dr. Olive makes statistical machine learning feel intuitive and enjoyable. Perfect start for beginners!',
        student_id: 'prof-stud-01',
        created_at: new Date('2026-02-18').toISOString()
      }
    ],
    lessons: [
      {
        id: 'les-401',
        course_id: 'course-004',
        title: '1. Python Data Science Ecosystem & Pandas',
        description: 'Data frames, cleaning missing data, filtering, and statistical aggregations.',
        order_index: 1,
        duration_minutes: 50,
        lesson_type: 'video',
        video_url: 'https://www.youtube.com/embed/vmEHCJofslg'
      }
    ]
  },
  {
    id: 'course-005',
    title: 'Modern Cybersecurity: Zero-Trust Defense & Vulnerability Assessment',
    description: 'Hands-on practical cybersecurity training covering network penetration testing, defensive hardening, OWASP Top 10 mitigation, and identity management.',
    instructor_id: 'prof-inst-03',
    category_id: 'cat-005',
    price: 59.99,
    level: 'beginner',
    duration_hours: 24,
    status: 'approved',
    thumbnail_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    created_at: new Date('2026-02-01').toISOString(),
    instructor_profile: {
      full_name: 'Alex Rivera',
      avatar_url: SEED_PROFILES['prof-inst-03'].avatar_url,
      bio: SEED_PROFILES['prof-inst-03'].bio
    },
    category: {
      name: 'Cybersecurity & Defense'
    },
    enrollments: [{ id: 'enr-010' }],
    reviews: [
      {
        rating: 5,
        comment: 'Eye-opening labs on real vulnerabilities and defensive techniques.',
        student_id: 'prof-stud-02',
        created_at: new Date('2026-03-12').toISOString()
      }
    ],
    lessons: [
      {
        id: 'les-501',
        course_id: 'course-005',
        title: '1. Zero-Trust Security Architecture Overview',
        description: 'Micro-segmentation, continuous identity verification, and least privilege access principles.',
        order_index: 1,
        duration_minutes: 40,
        lesson_type: 'video',
        video_url: 'https://www.youtube.com/embed/inWWhr5tnEA'
      }
    ]
  },
  {
    id: 'course-006',
    title: 'Cross-Platform Mobile App Engineering with React Native & Expo',
    description: 'Build production-ready iOS and Android mobile apps from a single codebase with native performance, offline persistence, and animated modern UI interactions.',
    instructor_id: 'prof-inst-02',
    category_id: 'cat-006',
    price: 69.99,
    level: 'intermediate',
    duration_hours: 38,
    status: 'approved',
    thumbnail_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
    created_at: new Date('2026-01-28').toISOString(),
    instructor_profile: {
      full_name: 'Dr. Olive Chen',
      avatar_url: SEED_PROFILES['prof-inst-02'].avatar_url,
      bio: SEED_PROFILES['prof-inst-02'].bio
    },
    category: {
      name: 'Mobile App Development'
    },
    enrollments: [{ id: 'enr-011' }],
    reviews: [
      {
        rating: 5,
        comment: 'Great project-based approach. We shipped a complete mobile app to Expo testing in 2 weeks!',
        student_id: 'prof-stud-01',
        created_at: new Date('2026-02-22').toISOString()
      }
    ],
    lessons: [
      {
        id: 'les-601',
        course_id: 'course-006',
        title: '1. React Native Foundations & Expo Router',
        description: 'File-based routing, native components, and styling with NativeWind.',
        order_index: 1,
        duration_minutes: 45,
        lesson_type: 'video',
        video_url: 'https://www.youtube.com/embed/0-S5a0eXPoc'
      }
    ]
  }
];

// Helper functions for Query Fallbacks
export function getSeedCourses(searchQuery?: string, categoryId?: string, level?: string, page: number = 1, pageSize: number = 9) {
  let list = [...SEED_COURSES];

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
  }

  if (categoryId && categoryId !== 'all') {
    list = list.filter(c => c.category_id === categoryId);
  }

  if (level && level !== 'all') {
    list = list.filter(c => c.level === level);
  }

  const totalCount = list.length;
  const from = (page - 1) * pageSize;
  const paginated = list.slice(from, from + pageSize);

  return {
    courses: paginated,
    totalCount,
    totalPages: Math.max(1, Math.ceil(totalCount / pageSize))
  };
}

export function getSeedCourseDetails(courseId: string) {
  const course = SEED_COURSES.find(c => c.id === courseId) || SEED_COURSES[0];
  const reviewsWithStudents = (course.reviews || []).map(r => ({
    ...r,
    student: SEED_PROFILES[r.student_id || 'prof-stud-01'] || {
      full_name: 'Student Learner',
      avatar_url: undefined
    }
  }));

  return {
    ...course,
    reviews: reviewsWithStudents,
    lessons: course.lessons || [],
    enrollmentsCount: course.enrollments?.length || 120
  };
}
