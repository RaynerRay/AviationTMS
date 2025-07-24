import React from 'react';
import { Check, Plane } from 'lucide-react'; // Shield was removed as it's not used in the updated feature list.

type FeatureItem = {
  title: string;
  description: string;
};

const WhyUs: React.FC = () => {
  const features: FeatureItem[] = [
    {
      title: "Streamlined Operations & Efficiency",
      description: "Automate scheduling, record-keeping, and administrative tasks, freeing up your staff to focus on quality instruction. Aviato optimizes your daily workflows for maximum efficiency."
    },
    {
      title: "Enhanced Student Management",
      description: "Effortlessly track student progress, flight hours, certifications, and communication. Provide a seamless experience for your students from enrollment to graduation."
    },
    {
      title: "Uphold Compliance & Security",
      description: "Ensure full adherence to SACAA regulations and maintain the highest standards of data security for all flight records and student information. Aviato keeps you compliant and your data safe."
    },
    {
      title: "Scalable for Future Growth",
      description: "As your institution expands, Aviato scales with you. Our flexible system supports an increasing number of students and programs, ensuring your growth is limitless."
    }
  ];

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Main grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image collage with overlay */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <img
                  src="/hero.png"
                  alt="Flight training session in progress"
                  className="w-full h-64 object-contain rounded-lg shadow-md"
                />
              </div>
              <div>
                <img
                  src="/student.webp"
                  alt="Student engaged in simulator training"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
              <div>
                <img
                  src="/computer-ad.png"
                  alt="Instructor reviewing data on a computer"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Overlay circle with text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-sky-600 rounded-full h-48 w-48 flex flex-col items-center justify-center text-white text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <span className="text-xs font-medium uppercase">Simplify Your</span>
                <span className="text-xl font-bold">AVIATION</span>
                <span className="text-xl font-bold">TRAINING</span>
              </div>
            </div>
          </div>

          {/* Right side - Features */}
          <div>
            <div className="bg-sky-700 text-white text-4xl font-bold py-4 px-8 rounded-lg mb-8">
              Why Choose Aviato?
            </div>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-white rounded-full p-1 border-2 border-sky-500">
                      <Check className="h-6 w-6 text-sky-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                    <p className="mt-1 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Logo */}
            <div className="flex justify-end mt-8">
              <div className="flex items-center">
                <Plane className="h-8 w-8 text-sky-800" />
                <span className="text-xl font-bold text-sky-800 ml-1">Aviato</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;