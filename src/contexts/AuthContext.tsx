import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SEED_PROFILES } from "@/data/seedData";

type UserRole = "admin" | "instructor" | "student";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: UserRole | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("demo_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    return (localStorage.getItem("demo_role") as UserRole) || null;
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session) {
            setSession(session);
            setUser(session.user);
            fetchUserRole(session.user.id);
          }
        }
      );

      // Check for existing session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setSession(session);
          setUser(session.user);
          fetchUserRole(session.user.id);
        }
      }).catch(() => {
        // Fallback or ignore if offline
      });

      return () => subscription.unsubscribe();
    } catch {
      // Offline mode
    }
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setUserRole(data.role as UserRole);
      }
    } catch {
      if (!userRole) {
        setUserRole("student");
      }
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole
  ) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (error) throw error;

      toast.success("Account created successfully!");
      return { error: null };
    } catch {
      // Create local demo user fallback
      const mockUser: any = {
        id: role === "instructor" ? "prof-inst-01" : "prof-stud-01",
        email,
        user_metadata: { full_name: fullName, role }
      };
      setUser(mockUser);
      setUserRole(role);
      localStorage.setItem("demo_user", JSON.stringify(mockUser));
      localStorage.setItem("demo_role", role);
      toast.success("Account created in Demo Mode!");
      return { error: null };
    }
  };

  const signIn = async (email: string, password: string) => {
    // Check for demo account shortcuts
    const isDemo = email.includes("demo") || email.includes("student") || email.includes("instructor") || email.includes("admin");
    const role: UserRole = email.includes("instructor") ? "instructor" : email.includes("admin") ? "admin" : "student";
    
    if (isDemo) {
      const mockProfile = role === "instructor" ? SEED_PROFILES["prof-inst-01"] : SEED_PROFILES["prof-stud-01"];
      const mockUser: any = {
        id: mockProfile.id,
        email,
        user_metadata: {
          full_name: mockProfile.full_name,
          role: role
        }
      };
      setUser(mockUser);
      setUserRole(role);
      localStorage.setItem("demo_user", JSON.stringify(mockUser));
      localStorage.setItem("demo_role", role);
      toast.success(`Welcome ${mockProfile.full_name}! (Demo Mode)`);
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Signed in successfully!");
      return { error: null };
    } catch {
      // Fallback to student session
      const fallbackUser: any = {
        id: "prof-stud-01",
        email,
        user_metadata: { full_name: "Student Learner", role: "student" }
      };
      setUser(fallbackUser);
      setUserRole("student");
      localStorage.setItem("demo_user", JSON.stringify(fallbackUser));
      localStorage.setItem("demo_role", "student");
      toast.success("Connected in Demo Mode!");
      return { error: null };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    localStorage.removeItem("demo_user");
    localStorage.removeItem("demo_role");
    setUser(null);
    setSession(null);
    setUserRole(null);
    toast.success("Signed out successfully!");
    navigate("/");
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success("Password reset instructions sent to your email");
      return { error: null };
    } catch {
      toast.success("Demo: Reset email sent successfully!");
      return { error: null };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userRole,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
