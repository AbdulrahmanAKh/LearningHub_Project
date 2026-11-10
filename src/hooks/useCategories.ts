import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEED_CATEGORIES } from "@/data/seedData";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  courseCount?: number;
}

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("name");

        if (error || !data || data.length === 0) {
          return SEED_CATEGORIES as Category[];
        }
        
        return (data || []) as Category[];
      } catch (err) {
        return SEED_CATEGORIES as Category[];
      }
    },
  });
};

export const useCategoriesWithCounts = () => {
  return useQuery({
    queryKey: ["categories-with-counts"],
    queryFn: async () => {
      try {
        const { data: categories, error: categoriesError } = await supabase
          .from("categories")
          .select("*")
          .order("name");

        if (categoriesError || !categories || categories.length === 0) {
          return SEED_CATEGORIES as Category[];
        }

        const allCategories = (categories || []) as Category[];

        // Get course counts for each category
        const categoriesWithCounts = await Promise.all(
          allCategories.map(async (category) => {
            try {
              const { count } = await supabase
                .from("courses")
                .select("*", { count: "exact", head: true })
                .eq("category_id", category.id)
                .eq("status", "approved");

              return {
                ...category,
                courseCount: count || 0,
              };
            } catch {
              return {
                ...category,
                courseCount: 1,
              };
            }
          })
        );

        return categoriesWithCounts;
      } catch (err) {
        return SEED_CATEGORIES as Category[];
      }
    },
  });
};
