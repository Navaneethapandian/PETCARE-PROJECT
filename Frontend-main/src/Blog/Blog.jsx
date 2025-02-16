import React from 'react';
import blogsData from './Data.json';

export const Blog = () => {
  
  return (
    <div className="container mx-auto max-w-screen-xl px-4"> 
      <h1 className="text-3xl font-bold text-center mb-8"></h1> 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogsData.blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-md rounded-lg p-6"> 
            <img src={blog.image} alt={blog.heading} className="w-full h-48 object-cover rounded-t-lg" />
            <h2 className="text-2xl font-bold mt-4">{blog.heading}</h2>
            <p className="text-gray-700">{blog.description}</p>
            <p className="text-gray-500 text-sm mt-2">By {blog.author}</p>
            <p className="text-gray-500 text-sm">Published: {new Date(blog.date).toLocaleDateString()}</p> 
          </div>
        ))}
      </div>
    </div>
  );
};
