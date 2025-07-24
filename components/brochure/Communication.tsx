import { MessageSquare, FileBarChart2, Calendar, Users, Link, MessageCircleCode, Globe } from "lucide-react";
import { useState } from "react";

export default function CommunicationModule() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const features = [
    {
      title: "Message System",
      description: "Aviato includes a messaging system that enables real-time communication between pilots, instructors, and admins within the platform.",
      icon: <MessageSquare size={32} />,
      bgColor: "bg-sky-600",
      textColor: "text-white"
    },
    {
      title: "Broadcast/Bulk Messages",
      description: "Administrators can send broadcast messages to the entire aviation community or specific groups, ensuring timely updates across South Africa and beyond.",
      icon: <MessageCircleCode size={32} />,
      bgColor: "bg-sky-500",
      textColor: "text-white"
    },
    {
      title: "Delivery Tracking and Reporting",
      description: "Track and report SMS and email deliveries for flight-related communications, providing actionable insights.",
      icon: <FileBarChart2 size={32} />,
      bgColor: "bg-sky-500",
      textColor: "text-white"
    },
    {
      title: "Event Notifications",
      description: "Receive event notifications to remind users of important flight dates, SACAA deadlines, or training milestones.",
      icon: <Calendar size={32} />,
      bgColor: "bg-sky-600",
      textColor: "text-white"
    },
    {
      title: "Real-Time Parent Communication",
      description: "Facilitate real-time communication with parents, including those from foreign countries, about flight progress, safety, and training updates via a secure portal.",
      icon: <Users size={32} />,
      bgColor: "bg-sky-600",
      textColor: "text-white"
    },
    {
      title: "Integration with External Platforms",
      description: "Integrate with global communication platforms, such as international email services and messaging apps, to connect with parents and stakeholders worldwide.",
      icon: <Globe size={32} />,
      bgColor: "bg-sky-500",
      textColor: "text-white"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-start mb-12">
          <div className="flex items-center">
            <div className="h-12 w-12 relative">
              <div className="absolute inset-0 bg-sky-600 rounded-tl-xl rounded-br-xl transform rotate-45"></div>
              <div className="absolute inset-1 bg-white rounded-tl-lg rounded-br-lg transform rotate-45"></div>
              <div className="absolute inset-2 bg-sky-600 rounded-tl-lg rounded-br-lg transform rotate-45 flex items-center justify-center">
                <div className="bg-sky-600 h-4 w-2 rounded-full transform -rotate-45 translate-x-1"></div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sky-600 ml-8">Communication Module</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`${feature.bgColor} rounded-lg shadow-lg p-6 transition-all duration-200 transform ${hoveredCard === index ? 'scale-105' : ''}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h2 className={`text-2xl font-bold mb-4 ${feature.textColor}`}>{feature.title}</h2>
                <p className={`${feature.textColor}`}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}