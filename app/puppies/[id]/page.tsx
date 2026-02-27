import { supabase } from "@/lib/supabase/config";
import Link from "next/link";
import PuppyDetailsClient from "@/components/PuppyDetailsClient";

interface Puppy {
    id: string;
    name: string;
    age: string;
    gender: string;
    status: string;
    adoption_fee: number;
    deposit_amount: number;
    puppy_images: string[];
}

export default async function PuppyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let puppy: Puppy | null = null;

    try {
        const { data } = await supabase
            .from("puppies")
            .select("*")
            .eq("id", id)
            .single();

        if (data) {
            puppy = data as Puppy;
        }
    } catch (error) {
        console.error("Error fetching puppy:", error);
    }

    if (!puppy) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h1 className="text-3xl font-bold text-brown-900">Puppy not found.</h1>
                <Link href="/browse" className="text-sand-600 hover:underline mt-4 inline-block font-medium">Back to Browse</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Link href="/browse" className="text-sand-600 hover:underline mb-8 inline-block font-medium">&larr; Back to available puppies</Link>
            <PuppyDetailsClient puppy={puppy} />
        </div>
    );
}

