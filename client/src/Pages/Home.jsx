import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">

      {/* Background Blur */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"></div>
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl"></div>

      {/* Hero */}
      <section className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col-reverse items-center justify-between gap-16 px-6 py-16 lg:flex-row">

        {/* Left */}
        <div className="max-w-2xl">

          <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
            🚀 Learn • Build • Grow
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Learn
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Without Limits
            </span>

            <br />

            Build Your Future.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
            Learn from industry experts, build real-world projects,
            earn certificates, and unlock new career opportunities
            through our premium online learning platform.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              to="/courses"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Explore Courses →
            </Link>

            <button className="rounded-xl border-2 border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600">
              Learn More
            </button>

          </div>

          {/* Stats */}

          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">

            <div className="rounded-2xl bg-white p-5 shadow-lg">
              <h2 className="text-3xl font-bold text-blue-600">
                150+
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Courses
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-lg">
              <h2 className="text-3xl font-bold text-indigo-600">
                500+
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Students
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-lg">
              <h2 className="text-3xl font-bold text-purple-600">
                30+
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Instructors
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-lg">
              <h2 className="text-3xl font-bold text-amber-500">
                ⭐4.9
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Rating
              </p>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="relative hidden lg:flex items-center justify-center">

          <div className="absolute h-[520px] w-[520px] rounded-full bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 opacity-50 blur-3xl"></div>

          <div className="relative rounded-[40px] bg-white/70 p-8 shadow-2xl backdrop-blur-xl">

            <img
              src="https://illustrations.popsy.co/amber/digital-nomad.svg"
              alt="Hero"
              className="w-[500px]"
            />

          </div>

        </div>

      </section>

    </div>
  );
}