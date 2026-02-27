import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase/config";
import { Heart, ShieldCheck, Truck, Star, Award, CheckCircle } from "lucide-react";
import FeaturedPuppiesClient from "@/components/FeaturedPuppiesClient";
import HomeHeroClient from "@/components/HomeHeroClient";

interface Puppy {
  id: string;
  name: string;
  age: string;
  gender: string;
  status: string;
  puppy_images: string[];
}

export default async function Home() {
  let featured: Puppy[] = [];

  try {
    const { data } = await supabase
      .from("puppies")
      .select("*")
      .eq("status", "available")
      .limit(3);

    if (data) featured = data as Puppy[];
  } catch (error) {
    console.error("Error fetching featured puppies:", error);
  }

  const reviews = [
    {
      name: "Sarah T.",
      location: "Los Angeles, CA",
      text: "Getting our little Oliver from Ellie's Sanctuary was the best decision. He arrived healthy, happy, and so well-socialized. The process was incredibly professional from start to finish.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    },
    {
      name: "Michael & Emily R.",
      location: "Toronto, Canada",
      text: "We were nervous about the shipping process, but Ellie kept us updated every step of the way. Bella was delivered right to our door safely. Highly recommend!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop"
    },
    {
      name: "Jessica M.",
      location: "Sydney, Australia",
      text: "A truly 5-star experience. The health guarantee and clear communication gave us so much peace of mind. Our pup Milo is the joy of our household!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HomeHeroClient />

      {/* 2. Trust Badges */}
      <section className="bg-white py-10 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-brown-800 opacity-80 flex flex-col items-center">
          <p className="text-sm font-bold tracking-widest uppercase mb-6">Trusted By Families Across</p>
          <div className="flex flex-wrap justify-center gap-12 text-lg font-bold">
            <span>🇺🇸 USA</span>
            <span>🇨🇦 Canada</span>
            <span>🇦🇺 Australia</span>
            <span>🇬🇧 UK</span>
          </div>
        </div>
      </section>

      {/* 3. Value Proposition */}
      <section className="bg-cream-50 py-24 px-4 sm:px-6 lg:px-8 border-b border-cream-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-brown-900 mb-4">The Ellie's Sanctuary Difference</h2>
            <p className="text-lg text-brown-800 max-w-2xl mx-auto">
              We go above and beyond standard breeding practices. Every puppy is a cherished member of our family before they become yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: <Heart className="h-10 w-10" />, title: "In-Home Raised", desc: "Raised underfoot in our living room—not in a kennel. They are socialized with children, adults, and everyday household sounds for a confident temperament." },
              { icon: <ShieldCheck className="h-10 w-10" />, title: "1-Year Health Guarantee", desc: "We stringently test parent genetics. Each puppy comes with a comprehensive signed contract protecting against severe congenital defects." },
              { icon: <Truck className="h-10 w-10" />, title: "VIP Safe Transport", desc: "We hand-deliver puppies via a trusted specialized flight nanny in cabin, or safe ground transport right to your doorstep to minimize stress." }
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm border border-cream-200 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-sand-500 transform origin-left transition-transform group-hover:scale-x-100 scale-x-0 duration-300"></div>
                <div className="bg-cream-100 p-6 rounded-full text-sand-500 border border-cream-200 mb-6 group-hover:bg-sand-500 group-hover:text-white group-hover:shadow-lg transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-brown-900 mb-4">{feature.title}</h3>
                <p className="text-brown-800 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Puppies */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-extrabold text-brown-900 mb-4">Ready For Adoption</h2>
            <p className="text-lg text-brown-800 max-w-2xl">
              Meet our latest available puppies. They are up-to-date on shots and ready for their forever homes.
            </p>
          </div>
          <Link
            href="/browse"
            aria-label="View all available puppies"
            className="hidden md:inline-flex bg-cream-200 text-brown-900 px-6 py-3 rounded-full font-bold hover:bg-cream-300 transition-colors whitespace-nowrap items-center gap-2"
          >
            View All Puppies <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {featured.length > 0 ? (
          <FeaturedPuppiesClient initialPuppies={featured} />
        ) : (
          <div className="text-center bg-white p-16 rounded-3xl border border-cream-200 shadow-sm text-brown-800 flex flex-col items-center">
            <div className="bg-cream-100 p-6 rounded-full mb-4">
              <Heart className="h-10 w-10 text-sand-500" />
            </div>
            <p className="text-xl font-medium text-brown-900">All our current litters have found homes!</p>
            <p className="mt-2 text-brown-800/80">Check back soon for upcoming litters, or contact us to join the waitlist.</p>
          </div>
        )}
      </section>

      {/* 5. Reviews Section */}
      <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-y border-cream-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 text-yellow-400">
              <Star className="h-8 w-8 fill-current drop-shadow-sm" />
              <Star className="h-8 w-8 fill-current drop-shadow-sm" />
              <Star className="h-8 w-8 fill-current drop-shadow-sm" />
              <Star className="h-8 w-8 fill-current drop-shadow-sm" />
              <Star className="h-8 w-8 fill-current drop-shadow-sm" />
            </div>
            <h2 className="text-4xl font-extrabold text-brown-900 mb-4">Happy Families</h2>
            <p className="text-lg text-brown-800 max-w-2xl mx-auto">
              Don't just take our word for it. Read what our loving families have to say about their experience getting a puppy from us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-cream-50 p-8 rounded-3xl border border-cream-200 flex flex-col shadow-sm transition-all hover:scale-105"
              >
                <div className="flex items-center gap-1 text-yellow-400 mb-6 font-bold">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                  <span className="sr-only">{review.rating} out of 5 stars</span>
                </div>
                <p className="text-brown-800 italic leading-relaxed mb-8 flex-1">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-brown-900">{review.name}</h4>
                    <p className="text-xs text-brown-800 opacity-80">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Life at the Sanctuary */}
      <section className="bg-cream-100 py-24 px-4 sm:px-6 lg:px-8 border-b border-cream-200 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-extrabold text-brown-900 mb-4">Life At The Sanctuary</h2>
          <p className="text-lg text-brown-800 max-w-2xl mx-auto">
            A glimpse into the daily joy, playtime, and immense love our Bichon Frise puppies experience.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="col-span-2 md:col-span-2 aspect-[4/3] rounded-3xl overflow-hidden shadow-sm group relative">
            <div className="absolute inset-0 bg-sand-600/0 group-hover:bg-sand-600/20 transition-colors z-10 duration-500 rounded-3xl pointer-events-none"></div>
            <Image
              src="https://images.unsplash.com/photo-1587539975099-5aecb74902d4?auto=format&fit=crop&w=800&q=80"
              alt="Bichon Frise puppy playing in the grass"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <div className="aspect-square rounded-3xl overflow-hidden shadow-sm group relative">
            <div className="absolute inset-0 bg-sand-600/0 group-hover:bg-sand-600/20 transition-colors z-10 duration-500 rounded-3xl pointer-events-none"></div>
            <Image
              src="https://images.unsplash.com/photo-1652900186700-1266fdafd5a7?auto=format&fit=crop&w=600&q=80"
              alt="Portrait of a fluffy white Bichon Frise"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <div className="aspect-square rounded-3xl overflow-hidden shadow-sm group relative">
            <div className="absolute inset-0 bg-sand-600/0 group-hover:bg-sand-600/20 transition-colors z-10 duration-500 rounded-3xl pointer-events-none"></div>
            <Image
              src="https://images.unsplash.com/photo-1696254643239-eeb065e3f35a?auto=format&fit=crop&w=600&q=80"
              alt="White dog running happily outdoors"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <div className="aspect-square rounded-3xl overflow-hidden shadow-sm group hidden md:block relative">
            <div className="absolute inset-0 bg-sand-600/0 group-hover:bg-sand-600/20 transition-colors z-10 duration-500 rounded-3xl pointer-events-none"></div>
            <Image
              src="https://images.unsplash.com/photo-1554634242-a653caa56834?auto=format&fit=crop&w=600&q=80"
              alt="Smiling white puppy look directly at the camera"
              fill
              sizes="25vw"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <div className="col-span-2 md:col-span-3 aspect-[21/9] rounded-3xl overflow-hidden shadow-sm group relative">
            <div className="absolute inset-0 bg-sand-600/0 group-hover:bg-sand-600/20 transition-colors z-10 duration-500 rounded-3xl pointer-events-none"></div>
            <Image
              src="https://images.unsplash.com/photo-1557674751-0208d529d2a1?auto=format&fit=crop&w=1200&q=80"
              alt="Beautiful wide portrait of a group of white puppies"
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* 7. Final Conversion Section */}
      <section className="bg-sand-600 relative py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3">
          <Heart className="w-[600px] h-[600px] text-sand-500 opacity-30 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
            Ready to Welcome a New Best Friend?
          </h2>
          <p className="text-xl md:text-2xl text-cream-50 mb-12 font-medium max-w-2xl mx-auto">
            Contact us today to ask any questions or start the adoption application process. Spaces in upcoming litters fill quickly!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/browse"
              aria-label="Browse all available puppies"
              className="bg-white text-sand-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-cream-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto"
            >
              Find Your Puppy
            </Link>
            <Link
              href="/login"
              aria-label="Apply for puppy adoption"
              className="bg-brown-900 border border-transparent text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-brown-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto"
            >
              Apply For Adoption
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
