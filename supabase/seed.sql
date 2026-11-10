-- ============================================================================
-- LearningHub Platform - Database Seed Data (Seed Script)
-- ============================================================================

-- 1. Insert Categories
INSERT INTO public.categories (id, name, description, slug, icon, created_at, updated_at) VALUES
('cat-001', 'Artificial Intelligence & ML', 'Deep learning, computer vision, neural networks, and generative AI models.', 'ai-ml', 'Brain', NOW(), NOW()),
('cat-002', 'Full-Stack Web Development', 'Modern web technologies including React 18, Next.js, Node.js, and TypeScript.', 'web-dev', 'Code', NOW(), NOW()),
('cat-003', 'Cloud Computing & DevOps', 'AWS, Azure, Docker, Kubernetes, and automated CI/CD deployment pipelines.', 'cloud-devops', 'Cloud', NOW(), NOW()),
('cat-004', 'Data Science & Analytics', 'Statistical analysis, Python data processing, exploratory analysis, and visualization.', 'data-science', 'TrendingUp', NOW(), NOW()),
('cat-005', 'Cybersecurity & Defense', 'Ethical hacking, penetration testing, network defense, and zero-trust architectures.', 'cybersecurity', 'Shield', NOW(), NOW()),
('cat-006', 'Mobile App Development', 'Native and cross-platform mobile apps with Flutter, React Native, and Swift.', 'mobile-dev', 'Smartphone', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name, 
  description = EXCLUDED.description;

-- 2. Insert Instructor and Student Profiles
INSERT INTO public.profiles (id, full_name, avatar_url, bio, role, created_at, updated_at) VALUES
('prof-inst-01', 'Eng. Abdulrahman Alkhatib', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', 'AI & Full-Stack Solutions Architect. Graduate of Islamic University of Madinah with credentials from KAUST Academy & DeepLearning.AI.', 'instructor', NOW(), NOW()),
('prof-inst-02', 'Dr. Olive Chen', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80', 'Senior Machine Learning Researcher and Former Stanford AI Lecturer specializing in PyTorch and Computer Vision.', 'instructor', NOW(), NOW()),
('prof-inst-03', 'Alex Rivera', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', 'Principal DevOps Consultant and AWS Certified Solutions Architect with 12+ years in enterprise cloud systems.', 'instructor', NOW(), NOW()),
('prof-stud-01', 'Mohammed Al-Harbi', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80', 'Computer Science student passionate about Deep Learning and Full-Stack development.', 'student', NOW(), NOW()),
('prof-stud-02', 'Fahad Al-Otaibi', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80', 'Software Engineer building modern cloud-native systems.', 'student', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET 
  full_name = EXCLUDED.full_name,
  bio = EXCLUDED.bio;

-- 3. Insert Courses
INSERT INTO public.courses (id, title, description, instructor_id, category_id, level, duration_hours, price, status, thumbnail_url, created_at, updated_at) VALUES
('course-001', 'Deep Learning & Computer Vision with PyTorch & Transformers', 'Master state-of-the-art Convolutional Neural Networks (CNNs), Vision Transformers (ViT), transfer learning, and real-time object detection models using PyTorch.', 'prof-inst-01', 'cat-001', 'advanced', 32, 89.99, 'approved', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80', NOW(), NOW()),
('course-002', 'Full-Stack Architecture: React 18, TypeScript & Scalable APIs', 'Comprehensive masterclass on modern full-stack web engineering with React 18, TypeScript, Tailwind CSS, TanStack Query, and robust RESTful API integration.', 'prof-inst-01', 'cat-002', 'intermediate', 45, 79.99, 'approved', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80', NOW(), NOW()),
('course-003', 'Enterprise Cloud & DevOps: AWS, Kubernetes & CI/CD Pipelines', 'Deploy, monitor, and scale production-grade microservices on AWS using Docker, Terraform infrastructure-as-code, and GitHub Actions automated pipelines.', 'prof-inst-03', 'cat-003', 'advanced', 28, 94.99, 'approved', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80', NOW(), NOW()),
('course-004', 'Applied Data Science: Machine Learning, EDA & Statistical Models', 'Learn end-to-end data processing with NumPy, Pandas, Scikit-Learn, data visualization, exploratory data analysis (EDA), and predictive regression algorithms.', 'prof-inst-02', 'cat-004', 'beginner', 35, 49.99, 'approved', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80', NOW(), NOW()),
('course-005', 'Modern Cybersecurity: Zero-Trust Defense & Vulnerability Assessment', 'Hands-on practical cybersecurity training covering network penetration testing, defensive hardening, OWASP Top 10 mitigation, and identity management.', 'prof-inst-03', 'cat-005', 'beginner', 24, 59.99, 'approved', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80', NOW(), NOW()),
('course-006', 'Cross-Platform Mobile App Engineering with React Native & Expo', 'Build production-ready iOS and Android mobile apps from a single codebase with native performance, offline persistence, and animated modern UI interactions.', 'prof-inst-02', 'cat-006', 'intermediate', 38, 69.99, 'approved', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  price = EXCLUDED.price;

-- 4. Insert Lessons for Course-001 (Deep Learning)
INSERT INTO public.lessons (id, course_id, title, description, order_index, duration_minutes, lesson_type, video_url, created_at, updated_at) VALUES
('les-101', 'course-001', 'Introduction to Deep Neural Architectures', 'Overview of neural representations, perceptrons, backpropagation, and tensor mathematical operations.', 1, 45, 'video', 'https://www.youtube.com/embed/aircAruvnKk', NOW(), NOW()),
('les-102', 'course-001', 'Building Custom CNNs in PyTorch', 'Designing convolutional, pooling, and activation layers with PyTorch nn.Module hierarchy.', 2, 60, 'video', 'https://www.youtube.com/embed/vT1JzLTH4G4', NOW(), NOW()),
('les-103', 'course-001', 'Vision Transformers (ViT) & Attention Mechanisms', 'Self-attention math, patch projection, multi-head attention blocks, and transformer fine-tuning.', 3, 55, 'video', 'https://www.youtube.com/embed/trDaE3pBshY', NOW(), NOW()),
('les-104', 'course-001', 'Hands-on Lab: Computer Vision Classifier Benchmark', 'Practical code assignment implementing validation loops, accuracy benchmarks, and confusion matrices.', 4, 40, 'document', '', NOW(), NOW()),
('les-105', 'course-001', 'Quiz: Deep Learning & Vision Concepts', 'Test your knowledge on convolutions, loss functions, learning rate schedulers, and metrics.', 5, 20, 'quiz', '', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- 5. Insert Lessons for Course-002 (Full-Stack)
INSERT INTO public.lessons (id, course_id, title, description, order_index, duration_minutes, lesson_type, video_url, created_at, updated_at) VALUES
('les-201', 'course-002', 'Modern React 18 Architecture & Fiber Engine', 'Concurrent mode, transitions, hydration, and architectural best practices.', 1, 50, 'video', 'https://www.youtube.com/embed/bMknfKXIFA8', NOW(), NOW()),
('les-202', 'course-002', 'Enterprise TypeScript Patterns & Generics', 'Advanced type inference, utility types, discriminated unions, and safe API typing.', 2, 55, 'video', 'https://www.youtube.com/embed/BCg4U1FzODs', NOW(), NOW()),
('les-203', 'course-002', 'TanStack Query State Sync & Real-time Caching', 'Query invalidation, optimistic updates, and infinite scrolling mechanisms.', 3, 45, 'video', 'https://www.youtube.com/embed/lVLz_ASqAio', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- 6. Insert Reviews
INSERT INTO public.reviews (id, course_id, student_id, rating, comment, created_at) VALUES
('rev-001', 'course-001', 'prof-stud-01', 5, 'One of the best practical deep learning courses I have taken. Clear explanation of vision transformers with PyTorch code that runs out of the box!', NOW()),
('rev-002', 'course-001', 'prof-stud-02', 5, 'Outstanding architecture walkthrough. The benchmark section and mathematical breakdown of ViT helped me tremendously in my graduation project.', NOW()),
('rev-003', 'course-002', 'prof-stud-01', 5, 'The clean code standards and TypeScript patterns taught here transformed how I write enterprise frontend code. Highly recommended!', NOW())
ON CONFLICT (id) DO UPDATE SET rating = EXCLUDED.rating;

-- 7. Insert Enrollments
INSERT INTO public.enrollments (id, course_id, student_id, enrolled_at, progress_percentage) VALUES
('enr-001', 'course-001', 'prof-stud-01', NOW(), 60),
('enr-002', 'course-001', 'prof-stud-02', NOW(), 100),
('enr-003', 'course-002', 'prof-stud-01', NOW(), 45)
ON CONFLICT (id) DO UPDATE SET progress_percentage = EXCLUDED.progress_percentage;
