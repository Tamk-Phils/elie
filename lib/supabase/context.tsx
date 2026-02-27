"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, supabaseIsConfigured } from "./config";

interface AuthContextType {
    user: User | null;
    role: "user" | "admin" | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<"user" | "admin" | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!supabaseIsConfigured) {
            setLoading(false);
            return;
        }

        // Initial session fetch
        const initializeAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    setUser(session.user);
                    const { data } = await supabase
                        .from("users")
                        .select("role")
                        .eq("id", session.user.id)
                        .single();
                    setRole((data?.role as "user" | "admin") || "user");
                }
            } catch (error) {
                console.error("Error initially confirming session", error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    setUser(session.user);
                    // Only fetch role if we don't have it or if user changed
                    const { data } = await supabase
                        .from("users")
                        .select("role")
                        .eq("id", session.user.id)
                        .single();
                    setRole((data?.role as "user" | "admin") || "user");
                } else {
                    setUser(null);
                    setRole(null);
                }
                setLoading(false);
            }
        );

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
