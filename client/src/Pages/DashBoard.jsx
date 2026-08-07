import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import axiosInstance from "../api/axios.js";
import Loader from "../Components/Loader.jsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashBoard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/dashboard/stats");
        setStats(res.data.stats);
      } catch (err) {
        // handled by interceptors / toast elsewhere if needed
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;
  if (!stats) return <p>Unable to load stats.</p>;

  const revenueLabels = Object.keys(stats.revenueByMonth);
  const revenueValues = Object.values(stats.revenueByMonth);

  const chartData = {
    labels: revenueLabels.length ? revenueLabels : ["No data yet"],
    datasets: [
      {
        label: "Revenue ($)",
        data: revenueValues.length ? revenueValues : [0],
        backgroundColor: "#6366f1",
        borderRadius: 6,
      },
    ],
  };

 return (
  <div className="min-h-screen bg-base-100 p-6">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-base-content">
        Admin Dashboard
      </h1>
      <p className="text-sm text-base-content/60 mt-2">
        Overview of your platform performance
      </p>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition-all">
        <div className="card-body items-center text-center">
          <h2 className="text-4xl font-bold text-primary">
            {stats.usersCount}
          </h2>
          <p className="text-sm text-base-content/60">Total Users</p>
        </div>
      </div>

      <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition-all">
        <div className="card-body items-center text-center">
          <h2 className="text-4xl font-bold text-secondary">
            {stats.coursesCount}
          </h2>
          <p className="text-sm text-base-content/60">Total Courses</p>
        </div>
      </div>

      <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition-all">
        <div className="card-body items-center text-center">
          <h2 className="text-4xl font-bold text-accent">
            {stats.totalEnrollments}
          </h2>
          <p className="text-sm text-base-content/60">
            Paid Enrollments
          </p>
        </div>
      </div>

      <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition-all">
        <div className="card-body items-center text-center">
          <h2 className="text-4xl font-bold text-success">
            ${stats.totalRevenue.toFixed(2)}
          </h2>
          <p className="text-sm text-base-content/60">
            Total Revenue
          </p>
        </div>
      </div>
    </div>

    {/* Chart + Table */}
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Revenue Chart */}
      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-lg mb-4">
            Revenue Over Time
          </h2>

          <div className="h-[350px]">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Top Courses */}
      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-lg mb-4">
            Top Courses
          </h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Course</th>
                  <th className="text-center">Enrollments</th>
                  <th className="text-center">Rating</th>
                </tr>
              </thead>

              <tbody>
                {stats.topCourses.map((c) => (
                  <tr key={c._id}>
                    <td className="font-medium max-w-[250px] truncate">
                      {c.title}
                    </td>

                    <td className="text-center">
                      <div className="badge badge-primary badge-outline">
                        {c.numOfEnrollments}
                      </div>
                    </td>

                    <td className="text-center">
                      <span className="badge badge-warning">
                        ⭐ {c.ratingsAverage || "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {stats.topCourses.length === 0 && (
              <div className="text-center py-10 text-base-content/50">
                No courses available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default DashBoard;
