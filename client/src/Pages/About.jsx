import { Link } from "react-router-dom";

export default function About() {
  const features = [
    {
      icon: "📚",
      title: "Premium Courses",
      desc: "Industry-focused courses designed by experienced professionals.",
    },
    {
      icon: "👨‍🏫",
      title: "Expert Mentors",
      desc: "Learn from instructors with real-world experience.",
    },
    {
      icon: "🎓",
      title: "Certificates",
      desc: "Earn certificates after successfully completing courses.",
    },
    {
      icon: "💼",
      title: "Career Growth",
      desc: "Build practical skills that help you get hired.",
    },
    {
      icon: "🌍",
      title: "Learn Anywhere",
      desc: "Access your courses anytime on any device.",
    },
    {
      icon: "⚡",
      title: "Lifetime Access",
      desc: "Once purchased, your courses are yours forever.",
    },
  ];

  return (
    <div className="bg-slate-50">

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">

        <span className="rounded-full bg-indigo-100 px-4 py-2 text-indigo-600 font-semibold">
          About Dudemy
        </span>

        <h1 className="mt-8 text-5xl font-extrabold">
          Learn Without Limits
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 leading-8">
          Dudemy is an online learning platform dedicated to making
          high-quality education affordable, practical, and accessible for
          everyone.
        </p>

      </section>

      {/* Story */}

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-10 lg:grid-cols-2">

        <img
          src="https://illustrations.popsy.co/amber/reading.svg"
          alt="About"
          className="w-full"
        />

        <div>

          <h2 className="text-4xl font-bold">
            Our Story
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            Dudemy was created with one simple goal:
            empower learners through practical education.

            We believe learning should be engaging,
            affordable, and focused on real-world skills
            that help students succeed.
          </p>

        </div>

      </section>

      {/* Features */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <h2 className="text-center text-4xl font-bold">
          Why Choose Dudemy?
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-5xl">
                {item.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-600">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* Stats */}

      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-20 text-white">

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 text-center md:grid-cols-4">

          <div>
            <h2 className="text-5xl font-bold">150+</h2>
            <p className="mt-3">Courses</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">500+</h2>
            <p className="mt-3">Students</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">30+</h2>
            <p className="mt-3">Experts</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">4.9★</h2>
            <p className="mt-3">Rating</p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">

        <h2 className="text-5xl font-bold">
          Ready to Start Learning?
        </h2>

        <p className="mt-6 text-lg text-slate-600">
          Join thousands of learners and start building
          your future today.
        </p>

        <Link
          to="/courses"
          className="mt-10 inline-block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105"
        >
          Explore Courses
        </Link>

      </section>

    </div>
  );
}