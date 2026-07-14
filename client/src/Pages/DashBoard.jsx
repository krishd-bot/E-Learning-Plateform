export default function Dashboard() {
  const stats = [
    {
      title: "Total Courses",
      value: 12,
    },
    {
      title: "Total Students",
      value: 356,
    },
    {
      title: "Revenue",
      value: "₹45,000",
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-white p-6 shadow"
          >
            <p className="text-slate-500">
              {item.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}