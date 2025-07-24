import React from 'react';
import { Phone, Mail, Globe, MapPin, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 to-sky-100 min-h-screen flex items-center justify-center py-20 px-4">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-80 h-80 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Left Section: Contact Details */}
            <div className="md:w-2/3 w-full p-8 md:p-12 bg-gradient-to-br from-sky-600 to-sky-800 text-white">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 relative">
                    Get in Touch
                    <span className="block w-24 h-1 bg-sky-300 mt-4"></span>
                  </h2>
                  
                  <p className="mb-12 text-sky-100 leading-relaxed text-lg">
                    We'd love to hear from you. Our friendly team is always here to assist you with any inquiries about Aviato.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-center group">
                      <div className="bg-sky-500 bg-opacity-20 p-4 rounded-full mr-5 group-hover:bg-opacity-40 transition duration-300">
                        <Phone className="text-sky-200" size={24} />
                      </div>
                      <p className="text-lg font-medium">074 799 6927</p>
                    </div>
                    
                    <div className="flex items-center group">
                      <div className="bg-sky-500 bg-opacity-20 p-4 rounded-full mr-5 group-hover:bg-opacity-40 transition duration-300">
                        <Mail className="text-sky-200" size={24} />
                      </div>
                      <p className="text-lg font-medium">f13ray@gmail.com</p>
                    </div>
                    
                    {/* <div className="flex items-center group">
                      <div className="bg-sky-500 bg-opacity-20 p-4 rounded-full mr-5 group-hover:bg-opacity-40 transition duration-300">
                        <Globe className="text-sky-200" size={24} />
                      </div>
                      <p className="text-lg font-medium">www.smartschool.co.zw</p>
                    </div> */}
                    
                    <div className="flex items-start group">
                      <div className="bg-sky-500 bg-opacity-20 p-4 rounded-full mr-5 group-hover:bg-opacity-40 transition duration-300">
                        <MapPin className="text-sky-200" size={24} />
                      </div>
                      <div>
                        <p className="text-lg font-medium">130 South Street</p>
                        <p className="text-sky-200"> Centurion, Gauteng, South Africa </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-16 pt-8 border-t border-sky-500 border-opacity-30">
                  <p className="text-sky-200 font-medium">Working Hours</p>
                  <p className="text-white font-semibold text-lg">Monday - Saturday: 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>

            {/* Right Section: SVG Illustration and Form */}
            <div className="md:w-1/3 w-full p-8 md:p-12 flex flex-col">
              
             
              
              {/* SVG Contact Illustration */}
              <div className="mt-8 flex justify-center">
                <svg className="w-64 h-64" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="250" cy="250" r="200" fill="#EEF2FF" />
                  <path d="M360.5 211.5V315.5C360.5 334.5 345 350 326 350H174C155 350 139.5 334.5 139.5 315.5V211.5C139.5 192.5 155 177 174 177H326C345 177 360.5 192.5 360.5 211.5Z" fill="white" stroke="#4F46E5" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M360.5 219.5L266 273C255.5 280 244 280 233.5 273L139.5 219.5" stroke="#4F46E5" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="180" cy="150" r="20" fill="#BFDBFE" />
                  <circle cx="320" cy="320" r="15" fill="#BFDBFE" />
                  <circle cx="340" cy="120" r="10" fill="#BFDBFE" />
                  <path d="M120 280C120 280 110 290 110 310C110 330 130 350 150 350" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round" />
                  <path d="M380 170C380 170 390 160 390 140C390 120 370 100 350 100" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;