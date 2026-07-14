export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex min-h-[90vh] items-center justify-between gap-10 px-6 py-16">
        <div className="max-w-xl">
          <span className="rounded-full bg-primary/20 px-4 py-1 text-sm font-semibold text-primary">
            Learn • Build • Grow
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900">
            Learn New Skills
            <br />
            Anytime, Anywhere.
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            Join thousands of students and learn from expert instructors with
            high-quality online courses.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-lg bg-primary px-6 py-3 font-semibold text-black transition hover:scale-105">
              Explore Courses
            </button>

            <button className="rounded-lg border border-slate-300 px-6 py-3 font-semibold transition hover:bg-slate-100">
              Learn More
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <img
            src="https://illustrations.popsy.co/amber/digital-nomad.svg"
            alt="Hero"
            className="w-[500px]"
          />
        </div>
      </section>
    </div>
  );
}