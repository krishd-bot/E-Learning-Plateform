import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img
        src={course.thumbnail || "https://placehold.co/600x400?text=Course"}
        alt={course.title}
        className="h-52 w-full object-cover"
      />

      <div className="space-y-4 p-5">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {course.category}
        </span>

        <h2 className="line-clamp-2 text-xl font-bold text-slate-900">
          {course.title}
        </h2>

        <p className="line-clamp-2 text-sm text-slate-600">
          {course.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Instructor</p>
            <p className="font-semibold">
              {course.createdBy?.fullName || "Admin"}
            </p>
          </div>

          <h3 className="text-2xl font-bold text-primary">
            ₹{course.price || 0}
          </h3>
        </div>

        <Link
          to={`/course/${course._id}`}
          className="block rounded-xl bg-primary py-3 text-center font-semibold text-black transition hover:opacity-90"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}