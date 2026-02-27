"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/config";

interface Puppy {
    id: string;
    name: string;
    age: string;
    gender: string;
    status: string;
    puppy_images: string[];
}

export default function BrowsePuppiesClient({ initialPuppies }: { initialPuppies: Puppy[] }) {
    const [puppies, setPuppies] = useState<Puppy[]>(initialPuppies);

    useEffect(() => {
        // Set up realtime subscription to keep the list fresh without a full page reload
        const subscription = supabase
            .channel('public:puppies_browse')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'puppies',
            }, async () => {
                const { data } = await supabase
                    .from("puppies")
                    .select("*")
                    .eq("status", "available");
                if (data) setPuppies(data as Puppy[]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {puppies.map((pup) => (
                <Link
                    key={pup.id}
                    href={`/puppies/${pup.id}`}
                    className="group block"
                    aria-label={`View details for ${pup.name}`}
                >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-cream-200">
                        <div className="aspect-[4/3] bg-cream-100 overflow-hidden relative">
                            {pup.puppy_images && pup.puppy_images.length > 0 ? (
                                <Image
                                    src={pup.puppy_images[0]}
                                    alt={pup.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex justify-center items-center text-brown-800 opacity-50">
                                    No Image Available
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-brown-900 mb-2">{pup.name}</h3>
                            <div className="flex justify-between text-brown-800 font-medium text-sm">
                                <span>{pup.gender}</span>
                                <span>{pup.age} old</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

