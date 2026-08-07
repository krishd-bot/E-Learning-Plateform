import { configDotenv } from "dotenv";
configDotenv();

import connectToDb from "./config/db.config.js";
import User from "./models/user.model.js";
import Course from "./models/course.model.js";

const run = async () => {
  await connectToDb();

  const existingAdmin = await User.findOne({ email: "admin@dudemy.com" });

  let admin = existingAdmin;
  if (!existingAdmin) {
    admin = await User.create({
      fullName: "Dudemy Admin",
      email: "admin@dudemy.com",
      password: "admin123",
      role: "ADMIN",
    });
    console.log("Created admin user: admin@dudemy.com / admin123");
  } else {
    console.log("Admin user already exists, skipping");
  }

  const existingStudent = await User.findOne({ email: "student@dudemy.com" });
  if (!existingStudent) {
    await User.create({
      fullName: "Demo Student",
      email: "student@dudemy.com",
      password: "student123",
      role: "USER",
    });
    console.log("Created demo student: student@dudemy.com / student123");
  }

  const coursesCount = await Course.countDocuments();
  if (coursesCount === 0) {
    const sampleCourses = [
      {
        title: "Complete React Developer Course",
        description:
          "Learn React from scratch, including hooks, context, redux and build real-world projects.",
        category: "Web Development",
        level: "Intermediate",
        price: 49.99,
        createdBy: admin._id,
        createdByName: admin.fullName,
        lectures: [
          { title: "Introduction to React", duration: 12 },
          { title: "Components and Props", duration: 18 },
          { title: "State and Hooks", duration: 25 },
          { title: "Building a Project", duration: 40 },
        ],
      },
      {
        title: "Node.js & Express Masterclass",
        description:
          "Build powerful REST APIs using Node.js, Express and MongoDB from the ground up.",
        category: "Web Development",
        level: "Intermediate",
        price: 39.99,
        createdBy: admin._id,
        createdByName: admin.fullName,
        lectures: [
          { title: "Setting up Express", duration: 15 },
          { title: "Routing and Middleware", duration: 20 },
          { title: "Connecting MongoDB", duration: 22 },
          { title: "Authentication with JWT", duration: 30 },
        ],
      },
      {
        title: "Python for Data Science",
        description:
          "Master Python, Pandas, NumPy and Matplotlib to kickstart your data science career.",
        category: "Data Science",
        level: "Beginner",
        price: 0,
        createdBy: admin._id,
        createdByName: admin.fullName,
        lectures: [
          { title: "Python Basics", duration: 20 },
          { title: "Working with Pandas", duration: 28 },
          { title: "Data Visualization", duration: 24 },
        ],
      },
      {
        title: "UI/UX Design Fundamentals",
        description:
          "Learn the principles of great design and create beautiful, usable interfaces.",
        category: "Design",
        level: "Beginner",
        price: 29.99,
        createdBy: admin._id,
        createdByName: admin.fullName,
        lectures: [
          { title: "Design Principles", duration: 14 },
          { title: "Wireframing", duration: 18 },
          { title: "Prototyping in Figma", duration: 26 },
        ],
      },
      {
        title: "Advanced JavaScript Concepts",
        description:
          "Deep dive into closures, prototypes, async/await, and the JavaScript event loop.",
        category: "Web Development",
        level: "Advanced",
        price: 34.99,
        createdBy: admin._id,
        createdByName: admin.fullName,
        lectures: [
          { title: "Closures and Scope", duration: 20 },
          { title: "Prototypes and Inheritance", duration: 22 },
          { title: "Async JavaScript", duration: 28 },
        ],
      },
      {
        title: "Digital Marketing Essentials",
        description:
          "Learn SEO, social media marketing, and paid advertising to grow any business online.",
        category: "Marketing",
        level: "Beginner",
        price: 19.99,
        createdBy: admin._id,
        createdByName: admin.fullName,
        lectures: [
          { title: "Intro to Digital Marketing", duration: 15 },
          { title: "SEO Fundamentals", duration: 24 },
          { title: "Social Media Strategy", duration: 20 },
        ],
      },
    ];

    await Course.insertMany(sampleCourses);
    console.log(`Seeded ${sampleCourses.length} sample courses`);
  } else {
    console.log("Courses already exist, skipping course seed");
  }

  console.log("Seeding complete");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
