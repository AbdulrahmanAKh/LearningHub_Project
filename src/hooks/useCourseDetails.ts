import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getSeedCourseDetails } from "@/data/seedData";

export const useCourseDetails = (courseId: string | undefined) => {
  return useQuery({
    queryKey: ["course-details", courseId],
    queryFn: async () => {
      if (!courseId) throw new Error("Course ID is required");

      try {
        const { data: course, error } = await supabase
          .from("courses")
          .select(`
            *,
            category:categories(*),
            lessons(id, title, order_index, duration_minutes, lesson_type),
            reviews(id, rating, comment, created_at, student_id)
          `)
          .eq("id", courseId)
          .maybeSingle();

        if (error || !course) {
          const fallback = getSeedCourseDetails(courseId);
          const avgRating = (fallback.reviews || []).reduce((sum, r) => sum + r.rating, 0) / Math.max(1, (fallback.reviews || []).length);
          return {
            ...fallback,
            averageRating: parseFloat(avgRating.toFixed(1)),
            totalReviews: fallback.reviews?.length || 0,
            totalStudents: fallback.enrollmentsCount || 120,
          };
        }
        
        // Fetch total enrollments count separately (admin view)
        const { count: enrollmentsCount } = await supabase
          .from("enrollments")
          .select("*", { count: "exact", head: true })
          .eq("course_id", courseId);

        // Fetch instructor profile separately
        const { data: instructorProfile } = await supabase
          .from("profiles")
          .select("id, full_name, avatar_url, bio")
          .eq("id", course.instructor_id)
          .maybeSingle();

        // Fetch review authors separately
        const reviewStudentIds = course.reviews?.map((r: any) => r.student_id) || [];
        let reviewStudents: any[] = [];
        
        if (reviewStudentIds.length > 0) {
          const { data: students } = await supabase
            .from("profiles")
            .select("id, full_name, avatar_url")
            .in("id", reviewStudentIds);
          
          reviewStudents = students || [];
        }

        // Merge student data with reviews
        const reviewsWithStudents = course.reviews?.map((review: any) => ({
          ...review,
          student: reviewStudents.find((s) => s.id === review.student_id) || {
            full_name: "Unknown",
            avatar_url: null,
          },
        })) || [];

        // Calculate average rating
        const avgRating = reviewsWithStudents && reviewsWithStudents.length > 0
          ? reviewsWithStudents.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewsWithStudents.length
          : 0;

        return {
          ...course,
          instructor_profile: instructorProfile,
          reviews: reviewsWithStudents,
          averageRating: parseFloat(avgRating.toFixed(1)),
          totalReviews: reviewsWithStudents?.length || 0,
          totalStudents: enrollmentsCount || 0,
        };
      } catch (err) {
        const fallback = getSeedCourseDetails(courseId);
        const avgRating = (fallback.reviews || []).reduce((sum, r) => sum + r.rating, 0) / Math.max(1, (fallback.reviews || []).length);
        return {
          ...fallback,
          averageRating: parseFloat(avgRating.toFixed(1)),
          totalReviews: fallback.reviews?.length || 0,
          totalStudents: fallback.enrollmentsCount || 120,
        };
      }
    },
    enabled: !!courseId,
    retry: false,
  });
};
