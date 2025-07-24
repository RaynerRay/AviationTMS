"use client"
import { Plane } from "lucide-react"; // Changed icon from Coffee to Plane for relevance
import { useEffect, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="relative w-full">
        {/* sky decorative elements */}
        <div className="absolute top-0 left-0 w-full h-4 bg-sky-600" />
        <div className="absolute bottom-0 right-0 w-4/5 h-4 bg-sky-600" />

        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left side - About content */}
            <div
              className={`w-full lg:w-1/2 p-8 bg-gradient-to-br from-sky-500 to-sky-700 text-white rounded-3xl shadow-xl transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} transition-all duration-1000 ease-in-out`}
            >
              <div className="relative">
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-sky-200 rounded-tl-3xl opacity-20" />

                <h2 className="text-3xl font-bold mb-8 relative z-10">
                  OUR STORY: EMPOWERING AVIATION TRAINING
                </h2>

                <p className="text-lg mb-6 leading-relaxed">
                  At **Aviato**, we understand the unique complexities and demands of running a world-class aviation training organisation. Our mission is to provide a powerful, yet straightforward system that simplifies every aspect of your operations, from managing aspiring pilots to streamlining daily administrative tasks.
                  <br /> <br />
                  We know that excellence in aviation training requires precision, efficiency, and unwavering focus on student success. Our goal is to make it easier for **instructors**, **administrators**, and even **parents** to collaborate seamlessly. With Aviato, your institution can accurately track and enhance pilot progress, vastly improve communication channels, and make informed decisions that propel your students towards successful careers in the sky.
                  <br /> <br /></p>

                <div className="flex items-center gap-2 mt-6">
                  <Plane size={24} className="text-sky-200" /> {/* Changed icon to Plane */}
                  <span className="font-medium">
                    Your partner in aviation training excellence.
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div
              className={`w-full lg:w-1/2 mt-10 lg:mt-0 lg:pl-12 transform ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"} transition-all duration-1000 delay-300 ease-in-out`}
            >
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-full h-full bg-sky-100 rounded-lg" />
                <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="/computer-ad.png"
                    alt="A pilot student using a digital tablet for training, illustrating modern learning" // More descriptive alt text
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="relative h-16 mt-8">
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#2563EB"
              fillOpacity="0.3"
              d="M0,192L48,202.7C96,213,192,235,288,229.3C384,224,480,192,576,181.3C672,171,768,181,864,181.3C960,181,1056,171,1152,170.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}