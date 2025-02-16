import React from 'react';

export const Partner = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 lg:p-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Get Involved</h1>
        <p className="text-gray-600 mt-2">
          Join us in making a difference! Whether you want to volunteer, donate, or adopt a pet, your involvement matters.
        </p>
      </div>

      {/* Specialities Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Specialities</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              title: 'Pet Adoption',
              description: 'Find your perfect furry friend and give them a forever home.',
              image: "images/Involved-1.jpg",
            },
            {
              title: 'Volunteer Programs',
              description: 'Help us take care of the animals and spread the love.',
              image: 'images/Volunteer.jpg',
            },
            {
              title: 'Community Events',
              description: 'Join our pet-friendly events to support animal welfare.',
              image: 'images/Community.jpg',
            },
          ].map(({ title, description, image }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg w-full md:w-1/3 lg:w-1/4 p-6 flex flex-col items-center"
            >
              <img src={image} alt={title} className="w-24 h-24 mb-4 rounded-full" />
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              <p className="text-gray-600 mt-2 text-center">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Testimonials</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              name: 'Jane Doe',
              feedback: 'Adopting from PetCare was the best decision ever! My life feels complete now.',
              image: 'images/Testi-1.jpg',
            },
            {
              name: 'John Smith',
              feedback: 'The volunteering experience was incredibly fulfilling and heartwarming.',
              image: 'images/Testi-3.jpg',
            },
            {
              name: 'Emily Johnson',
              feedback: 'Their events are so well organized and fun! My family loves being a part of them.',
              image: 'images/Testi-2.jpg',
            },
          ].map(({ name, feedback, image }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg w-full md:w-1/3 lg:w-1/4 p-6 flex flex-col items-center"
            >
              <img src={image} alt={name} className="w-20 h-20 mb-4 rounded-full" />
              <h3 className="text-xl font-bold text-gray-800">{name}</h3>
              <p className="text-gray-600 mt-2 text-center italic">"{feedback}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
