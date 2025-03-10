import React from "react";
import { Link } from "react-router-dom";
import ajit from "../assets/ajit.jpeg";
import sachin from "../assets/sachin.jpeg";
import mahesh from "../assets/mahesh.jpeg";
import pranit from "../assets/pranit.jpeg";
import uzair from "../assets/uzair.jpeg";

const About = () => {
  const team = [
    {
      name: "Ajit Kadam",
      role: "Team Leader & Lead Developer",
      linkedin: "https://www.linkedin.com/in/ajit-kadam-b542a6219/",
      bio: "Ajit is the visionary behind our Stock Prediction App. With a passion for technology and finance, he leads the team with expertise in full-stack development and machine learning. He’s dedicated to building tools that empower investors with actionable insights.",
      image: ajit, // Use imported image directly
    },
    {
      name: "Sachin Koulage",
      role: "Full Stack Developer",
      linkedin: "https://www.linkedin.com/in/sachin-koulage-a33912211/",
      bio: "Sachin crafts the sleek, user-friendly interfaces you see in our app. With a keen eye for design and mastery of React, he ensures our platform is both beautiful and intuitive, making stock analysis accessible to all.",
      image: sachin,
    },
    {
      name: "Mahesh Rode",
      role: "Backend Developer",
      linkedin: "https://www.linkedin.com/in/maheshrode22/",
      bio: "Mahesh is the backbone of our system, managing servers, APIs, and data pipelines. His expertise in backend technologies ensures our app runs smoothly and delivers real-time stock data with precision.",
      image: mahesh,
    },
    {
      name: "Pranit Pardhi",
      role: "Java Developer",
      linkedin: "https://www.linkedin.com/in/pranit-pardhi-a61367278/",
      bio: "Pranit is the backbone of our system, managing servers, APIs, and data pipelines. His expertise in backend technologies ensures our app runs smoothly and delivers real-time stock data with precision.",
      image: pranit,
    },
    {
      name: "Uzair Qureshi",
      role: "UI/UX Designer",
      linkedin: "https://www.linkedin.com/in/uzair-qureshi-6950822b8/",
      bio: "Uzair brings creativity and usability together, designing experiences that delight our users. His innovative designs make navigating the stock market both engaging and effortless.",
      image: uzair,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-blue-500 py-12 px-6">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-300 animate-fade-in-down">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-200 dark:text-gray-400 mt-4 max-w-3xl mx-auto">
          We are a passionate team dedicated to revolutionizing stock market analysis. Our mission is to empower investors with cutting-edge tools and insights for smarter decisions.
        </p>
      </header>

      {/* Vision Section */}
      <section className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
          Our Vision
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          At Stock Prediction App, we dream of a world where every investor, from beginners to seasoned traders, can harness the power of AI to predict market trends. Our goal is to democratize financial success with real-time data, intuitive design, and reliable forecasts—all built by a team that lives and breathes innovation.
        </p>
      </section>

      {/* Team Section */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-400 text-center mb-8">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-green-500"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">
                {member.name}
              </h3>
              <p className="text-green-600 dark:text-green-400 text-center mb-2">
                {member.role}
              </p>
              <p className="text_gray-700 dark:text-gray-300 text-center mb-4">
                {member.bio}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-blue-600 bg-transparent border border-blue-600 rounded-md py-2 px-4 hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300"
              >
                Connect on LinkedIn
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6 px-6 text-center mt-5 rounded">
        <p className="text-sm">© 2025 Stock Prediction App. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Home
          </Link>
          <Link to="/about" className="text-blue-400 hover:text-blue-300">
            About
          </Link>
          <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default About;