import { supabase } from "@/lib/supabase/config";
import BrowsePuppiesClient from "@/components/BrowsePuppiesClient";

interface Puppy {
    id: string;
    name: string;
    age: string;
    gender: string;
    status: string;
    puppy_images: string[];
}

export default async function BrowsePage() {
    let puppies: Puppy[] = [];

    try {
        const { data } = await supabase
            .from("puppies")
            .select("*")
            .eq("status", "available");

        if (data) {
            puppies = data as Puppy[];
        }
    } catch (error) {
        console.error("Error fetching puppies:", error);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-brown-900 tracking-tight">Available Puppies</h1>
                <p className="mt-4 text-xl text-brown-800">
                    Meet our adorable Bichon Frise puppies looking for their forever homes.
                </p>
            </div>

            {puppies.length > 0 ? (
                <BrowsePuppiesClient initialPuppies={puppies} />
            ) : (
                <div className="text-center bg-white p-12 rounded-2xl border border-cream-200 shadow-sm text-brown-800">
                    No puppies available at this moment. Please check back later!
                </div>
            )}
        </div>
    );
}

