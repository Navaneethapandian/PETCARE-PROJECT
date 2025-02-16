import React from 'react';

export const AboutUs = () => {
  return (
    <>
    {/* //Mission */}
      <div className="container mx-auto py-16">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>
      </div>

{/* //Story */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center mb-16">
        <div className="w-full md:w-1/2">
          <img src="images/Fairytale.jpg" alt="Story" className="w-full object-cover h-96 rounded-lg" />
        </div>
        <div className="w-full md:w-1/2 px-8 md:px-16">
          <h2 className="text-3xl font-bold mb-4">Fairy Tale of Little Angel</h2>
          <p className="text-lg text-justify leading-relaxed font-semibold">
          Deekshana still remembers the day that changed her life forever. She was just a teenager, walking home from school on a hot summer afternoon. As she turned the corner onto her street, she heard a faint mewling sound coming from a nearby alleyway.
Curious, Deekshana walked into the alley and found a tiny ball of fur cowering in the corner. It was a little kitten, no more than a few weeks old, with big green eyes and soft, fluffy fur. Deekshana's heart melted as she picked up the kitten and cradled it in her arms.
As she walked home, Deekshana couldn't stop thinking about the little kitten and how it had ended up all alone in the alleyway.And as she looks back on her journey, Deekshana knows that it all started with that little ball of fur, Luna, who stole her heart and inspired her to make a difference in the world.
       </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center mb-16">
  <div className="w-full md:w-1/2 text-justify px-8 md:px-16">
    <h2 className="text-3xl font-bold mb-4">Mission and Goals</h2>
    <p className="text-lg leading-relaxed text-justify font-semibold mb-4">
      Our mission is to provide every homeless pet with a chance to find a loving and permanent home. We aim to rescue, rehabilitate, and rehome animals in need, ensuring they are treated with kindness and dignity.
    </p>
    <p className="text-lg leading-relaxed font-semibold mb-4">
      Through community engagement and education, we advocate for responsible pet ownership, spaying and neutering to reduce overpopulation, and raising awareness about the benefits of pet adoption. 
    </p>
    <p className="text-lg leading-relaxed font-semibold">
      Our ultimate goal is to create a compassionate society where every pet is valued and cared for, promoting a harmonious coexistence between people and animals.
    </p>
  </div>
  <div className="w-full text-justify md:w-1/2">
    <img
      src="images/Goal.jpg"
      alt="Mission"
      className="w-full object-cover h-96 rounded-lg"
    />
  </div>
</div>

{/* 
  //Who we are */}
      <div className="flex flex-col text-justify md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2">
          <img src="images/Organisation.jpg" alt="Who We Are" className="w-full object-cover h-96 rounded-lg" />
        </div>
        <div className="w-full md:w-1/2 px-8 md:px-16 font-semibold">
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-lg leading-relaxed">
           "Pet care advocate with 25+ years of experience. Dedicated to inspiring empathy and compassion towards all living beings, and creating a world where animals are treated with kindness and respect
           To create a world where pets receive the love, care, and respect they deserve while educating pet owners to make informed decisions about their companions' needs.
           Whether through professional services or the bond shared at home, PetCare ensures that pets lead fulfilling and healthy lives.
          </p>
        </div>
      </div>
    </div>
    
    
    
    </>
  )
}