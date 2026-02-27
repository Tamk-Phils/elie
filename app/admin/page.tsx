"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/config";
import { Dog, Users, ClipboardList } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ puppies: 0, requested: 0, users: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [pupsRes, reqsRes, usersRes] = await Promise.all([
                    supabase.from("puppies").select("*", { count: "exact", head: true }),
                    supabase.from("adoption_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
                    supabase.from("users").select("*", { count: "exact", head: true })
                ]);

                if (pupsRes.error || reqsRes.error || usersRes.error) {
                    throw new Error("Failed to load statistics");
                }

                setStats({
                    puppies: pupsRes.count || 0,
                    requested: reqsRes.count || 0,
                    users: usersRes.count || 0
                });
            } catch (error) {
                console.error("Failed to load stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="space-y-3">
                    <div className="h-8 bg-cream-200 rounded-lg w-1/4"></div>
                    <div className="h-4 bg-cream-100 rounded-lg w-1/3"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-cream-200 flex items-center gap-6">
                            <div className="bg-cream-100 h-16 w-16 rounded-2xl"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-3 bg-cream-100 rounded w-1/2"></div>
                                <div className="h-8 bg-cream-200 rounded w-1/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const cards = [
        { title: "Total Puppies", value: stats.puppies, icon: <Dog className="h-8 w-8 text-sand-600" /> },
        { title: "Pending Requests", value: stats.requested, icon: <ClipboardList className="h-8 w-8 text-sand-600" /> },
        { title: "Registered Users", value: stats.users, icon: <Users className="h-8 w-8 text-sand-600" /> },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-brown-900">Dashboard Overview</h1>
                <p className="text-brown-800 mt-2">Welcome back, Ellie. Here is what is happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((val, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-cream-200 flex items-center gap-6 group hover:shadow-lg transition-all duration-300">
                        <div className="bg-cream-100 p-4 rounded-2xl group-hover:bg-sand-500 group-hover:text-white transition-colors">
                            {val.icon}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-brown-800 uppercase tracking-widest mb-1">{val.title}</p>
                            <h2 className="text-4xl font-extrabold text-brown-900">{val.value}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
