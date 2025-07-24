import { Monitor, Smartphone, Laptop, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Intro() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger on initial load as well
    setTimeout(() => setIsVisible(true), 500);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full overflow-hidden relative bg-white">
      {/* Top curved shape */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-sky-600 rounded-bl-[40%]" />
      
      {/* Small accent curve */}
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-600 rounded-tr-full" />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Device showcase */}
          <div 
            className={`relative transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} transition-all duration-1000 ease-in-out`}
          >
            {/* Desktop/Laptop */}
            <div className="relative z-30 mx-auto max-w-lg">
              <img 
                src="/intro.jpg" 
                alt="Aviato Dashboard" 
                className="w-full h-auto rounded-md shadow-2xl"
              />
            </div>
            
            {/* Tablet - positioned to overlap slightly */}
            <div className="absolute bottom-0 -right-8 z-20 w-2/3 transform rotate-6 lg:block hidden">
              <img 
                src="/one.avif" 
                alt="Aviato Analytics" 
                className="w-full h-auto rounded-md shadow-xl"
              />
            </div>
            
            {/* Mobile */}
            <div className="absolute -bottom-10 -left-8 z-10 w-1/3 transform -rotate-6 lg:block hidden">
              <img 
                src="/intro.jpg" 
                alt="Aviato Mobile App" 
                className="w-full h-auto rounded-md shadow-xl"
              />
            </div>
          </div>
          
          {/* Right side - Text content */}
          <div 
            className={`text-right transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} transition-all duration-1000 delay-300 ease-in-out`}
          >
            <h2 className="text-5xl font-bold text-white lg:text-6xl">
              Aviato<br />SYSTEM<br />FEATURES
            </h2>
            
            <p className="mt-6 text-lg text-white">
              A Comprehensive Look at Aviato System Features
            </p>
            
            {/* <div className="mt-8 grid grid-cols-2 gap-4">
              <FeatureCard 
                icon={<Monitor />} 
                title="Admin Dashboard" 
                delay="100"
              />
              <FeatureCard 
                icon={<Smartphone />} 
                title="Mobile Access" 
                delay="200"
              />
              <FeatureCard 
                icon={<BarChart3 />} 
                title="Analytics" 
                delay="300"
              />
              <FeatureCard 
                icon={<Laptop />} 
                title="Web Portal" 
                delay="400"
              />
            </div> */}
          </div>
        </div>
        
        {/* Bottom logo/branding */}
        <div className="absolute bottom-6 left-6 opacity-80">
          <div className="flex items-center">
            <div className="w-8 h-8 grid grid-cols-2 gap-0.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-sky-500 rounded-sm" />
              ))}
            </div>
            <div className="ml-2 text-sm text-gray-700">
              <div className="font-semibold">Nova Ray</div>
              <div>Solutions Ltd</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// function FeatureCard({ icon, title, delay }) {
//   const [isVisible, setIsVisible] = useState(false);
  
//   useEffect(() => {
//     setTimeout(() => setIsVisible(true), parseInt(delay) + 500);
//   }, [delay]);

//   return (
//     <div 
//       className={`bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg shadow-lg transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 ease-in-out`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       <div className="text-sky-700">{icon}</div>
//       <h3 className="mt-2 font-semibold text-sky-600">{title}</h3>
//     </div>
//   );
// }