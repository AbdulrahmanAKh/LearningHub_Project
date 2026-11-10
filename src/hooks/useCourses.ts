import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getSeedCourses, SEED_COURSES } from "@/data/seedData";

export interface Course {
  id: string;
  title: string;
  description: string | null;
  instructor_id: string;
  thumbnail_url: string | null;
  price: number;
  level: string;
  duration_hours: number | null;
  status: string;
  category_id: string | null;
  created_at: string;
  instructor_profile?: {
    full_name: string | null;
    avatar_url?: string | null;
  } | null;
  category?: {
    name: string;
  } | null;
  enrollments?: Array<{ id: string }>;
  reviews?: Array<{ rating: number }>;
}

export const useCourses = (
  searchQuery?: string,
  categoryId?: string,
  level?: string,
  page: number = 1,
  pageSize: number = 9
) => {
  return useQuery({
    queryKey: ["courses", searchQuery, categoryId, level, page],
    queryFn: async () => {
      try {
        let query = supabase
          .from("courses")
          .select(
            `
            *,
            instructor_profile:profiles!courses_instructor_id_fkey(full_name),
            category:categories!courses_category_id_fkey(name),
            enrollments(id),
            reviews(rating)
          `,
            { count: "exact" }
          )
          .eq("status", "approved")
          .order("created_at", { ascending: false });

        if (searchQuery && searchQuery.trim()) {
          query = query.or(
            `title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
          );
        }

        if (categoryId && categoryId !== "all") {
          query = query.eq("category_id", categoryId);
        }

        if (level && level !== "all") {
          const validLevels: Array<"beginner" | "intermediate" | "advanced"> = ['beginner', 'intermediate', 'advanced'];
          if (validLevels.includes(level as any)) {
            query = query.eq("level", level as "beginner" | "intermediate" | "advanced");
          }
        }

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error || !data || data.length === 0) {
          return getSeedCourses(searchQuery, categoryId, level, page, pageSize) as any;
        }

        return {
          courses: (data || []) as any as Course[],
          totalCount: count || 0,
          totalPages: Math.ceil((count || 0) / pageSize),
        };
      } catch (err) {
        return getSeedCourses(searchQuery, categoryId, level, page, pageSize) as any;
      }
    },
  });
};

export const useFeaturedCourses = (limit: number = 6) => {
  return useQuery({
    queryKey: ["featured-courses", limit],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select(
            `
            *,
            instructor_profile:profiles!courses_instructor_id_fkey(full_name),
            category:categories!courses_category_id_fkey(name),
            enrollments(id),
            reviews(rating)
          `
          )
          .eq("status", "approved")
          .order("created_at", { ascending: false })
          .limit(limit);

        if (error || !data || data.length === 0) {
          return SEED_COURSES.slice(0, limit) as any as Course[];
        }
        return (data || []) as any as Course[];
      } catch (err) {
        return SEED_COURSES.slice(0, limit) as any as Course[];
      }
    },
  });
};

export const useRecommendedCourses = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["recommended-courses", userId],
    queryFn: async () => {
      try {
        if (!userId) return SEED_COURSES.slice(0, 6) as any as Course[];

        const { data: enrollments } = await supabase
          .from("enrollments")
          .select("course_id")
          .eq("student_id", userId);

        const enrolledCourseIds = enrollments?.map((e) => e.course_id) || [];

        if (enrolledCourseIds.length === 0) {
          const { data, error } = await supabase
            .from("courses")
            .select(
              `
              *,
              instructor_profile:profiles!courses_instructor_id_fkey(full_name),
              category:categories!courses_category_id_fkey(name),
              enrollments(id),
              reviews(rating)
            `
            )
            .eq("status", "approved")
            .order("created_at", { ascending: false })
            .limit(6);

          if (error || !data || data.length === 0) {
            return SEED_COURSES.slice(0, 6) as any as Course[];
          }
          return (data || []) as any as Course[];
        }

        const { data: enrolledCourses } = await supabase
          .from("courses")
          .select("category_id")
          .in("id", enrolledCourseIds);

        const categoryIds = [
          ...new Set(
            enrolledCourses?.map((c) => c.category_id).filter(Boolean) || []
          ),
        ];

        const { data, error } = await supabase
          .from("courses")
          .select(
            `
            *,
            instructor_profile:profiles!courses_instructor_id_fkey(full_name),
            category:categories!courses_category_id_fkey(name),
            enrollments(id),
            reviews(rating)
          `
          )
          .eq("status", "approved")
          .in("category_id", categoryIds)
          .not("id", "in", `(${enrolledCourseIds.join(",")})`)
          .order("created_at", { ascending: false })
          .limit(6);

        if (error || !data || data.length === 0) {
          return SEED_COURSES.slice(0, 6) as any as Course[];
        }
        return (data || []) as any as Course[];
      } catch (err) {
        return SEED_COURSES.slice(0, 6) as any as Course[];
      }
    },
    enabled: true,
  });
};
