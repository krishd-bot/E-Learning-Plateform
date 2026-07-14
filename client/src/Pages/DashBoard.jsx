import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import {
  FaBook,
  FaUsers,
  FaUserShield,
  FaIndianRupeeSign,
} from "react-icons/fa6";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await api.get("/dashboard");

      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: <FaBook size={28} />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Students",
      value: stats.totalStudents,
      icon: <FaUsers size={28} />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      icon: <FaIndianRupeeSign size={28} />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Admins",
      value: stats.totalAdmins,
      icon: <FaUserShield size={28} />,
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-10 p-6">

      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-lg text-white/80">
          Welcome back! Here's an overview of your LMS.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`rounded-3xl bg-gradient-to-r ${card.color} p-6 text-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl`}
          >
            <div className="flex items-center justify-between">
              {card.icon}

              <h2 className="text-4xl font-bold">
                {card.value}
              </h2>
            </div>

            <p className="mt-6 text-lg font-medium">
              {card.title}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">
            📚 Recent Courses
          </h2>

          {stats.recentCourses.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              No Courses Found
            </div>
          ) : (
            stats.recentCourses.map((course) => (
              <div
                key={course._id}
                className="mb-4 flex items-center justify-between rounded-xl border p-4 transition hover:bg-slate-50"
              >
                <div>
                  <h3 className="font-semibold">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {course.category}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600">
                  {course.createdBy?.fullName}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">
            👨‍🎓 Recent Students
          </h2>

          {stats.recentUsers.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              No Students Found
            </div>
          ) : (
            stats.recentUsers.map((user) => (
              <div
                key={user._id}
                className="mb-4 flex items-center justify-between rounded-xl border p-4 transition hover:bg-slate-50"
              >
                <div>
                  <h3 className="font-semibold">
                    {user.fullName}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {user.email}
                  </p>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
                  USER
                </span>
              </div>
            ))
          )}
        </div>

      </div>

      <div className="rounded-3xl bg-white p-6 shadow-lg">

        <h2 className="mb-6 text-2xl font-bold">
          💳 Latest Payments
        </h2>

        {stats.recentPayments.length === 0 ? (
          <div className="py-10 text-center text-slate-500">
            No Payments Yet
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="border-b">

                <tr className="text-left text-slate-600">

                  <th className="pb-4">
                    Student
                  </th>

                  <th className="pb-4">
                    Course
                  </th>

                  <th className="pb-4">
                    Amount
                  </th>

                  <th className="pb-4">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {stats.recentPayments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-b transition hover:bg-slate-50"
                  >
                    <td className="py-4">
                      {payment.user?.fullName}
                    </td>

                    <td>
                      {payment.course?.title}
                    </td>

                    <td className="font-semibold">
                      ₹{payment.amount}
                    </td>

                    <td>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}