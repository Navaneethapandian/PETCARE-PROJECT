import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 w-full p-6 md:p-10 lg:p-16">
      <div className="bg-gray-900 p-5 rounded-lg border-gray-600 mb-8 md:mb-12 lg:mb-16">
        <h3 className="text-2xl font-bold text-white text-center mb-2">
          Our Milestones
        </h3>
        <div className="h-2 w-1/3 mx-auto bg-gray-600 mb-5" />
        <div className="flex justify-between text-center flex-wrap md:flex-nowrap">
          {[
            { label: 'Pets Adopted', count: 120 },
            { label: 'Happy Pets', count: 40 },
            { label: 'Our CareTakers', count: 40 },
            { label: 'Beloved Adopters', count: 30 },
          ].map(({ label, count }, index) => (
            <div className="flex flex-col items-center w-full md:w-1/4 mb-4 md:mb-0" key={index}>
              <h2 className="text-4xl font-bold text-white">{count}</h2>
              <p className="text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-between mb-8 md:mb-12 lg:mb-16">
        {/* Quick Links */}
        <div className="flex flex-col items-center w-full md:w-1/3 mb-4 md:mb-0">
          <h4 className="text-white text-2xl font-bold text-center">Quick Links</h4>
          <div className="h-2 w-1/3 mx-auto bg-gray-600 mb-2" />
          <ul className="mt-2 list-none text-gray-300 text-center text-lg">
            {[
              { name: 'Home', path: '/home' },
              { name: 'About Us', path: '/about' },
              { name: 'Adopt', path: '/adopt' },
              { name: 'Contact Us', path: '/contact' },
            ].map(({ name, path }, idx) => (
              <li key={idx}>
                <Link to={path} className="hover:text-gray-100">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col text-justify items-center w-full md:w-1/4 mb-4 md:mb-0">
          <h4 className="text-white text-2xl font-bold text-center">Contact Us</h4>
          <div className="h-2 w-1/3 mx-auto bg-gray-600 mb-2" />
          <div className="flex items-center mt-2">
            <FaPhoneAlt className="mr-2 text-2xl text-gray-300" />
            <a href="tel:+919361683807" className="text-gray-300">
              +91 9361693807
            </a>
          </div>
          <div className="flex items-center mt-2">
            <FaEnvelope className="mr-2 text-2xl text-gray-300" />
            <a href="mailto:brammashm2004@gmail.com" className="text-gray-300">
              brammashm2004@gmail.com
            </a>
          </div>
          <p className="text-gray-300 mt-2 text-center">12th Manikam St, Madurai, Tamilnadu</p>
        </div>

        {/* About Us */}
        <div className="flex flex-col items-center w-full md:w-1/4 mb-4 md:mb-0">
          <h4 className="text-white text-2xl font-bold text-center">About Us</h4>
          <div className="h-2 w-1/3 mx-auto bg-gray-600 mb-2" />
          <p className="mt-2 text-gray-300 text-center text-justify text-md">
            At PetCare, we believe that pets are family. We offer a range of loving and professional
            services to keep your furry, feathered, or scaly companions happy and healthy. Whether
            it's a cozy boarding stay, exciting daycare adventures, or reliable pet sitting in your
            own home, we provide a safe and nurturing environment.
          </p>
        </div>
      </div>

      {/* Follow Us Section */}
      <div className="flex justify-center space-x-6 mt-6">
        {[FaFacebookF, FaTwitter, FaLinkedin, FaGithub].map((Icon, idx) => (
          <a
            key={idx}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-gray-300 hover:text-gray-100"
          >
            <Icon />
          </a>
        ))}
      </div>
    </footer>
  );
};
