import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getCertificate } from "../Redux/Slices/EnrollmentSlice.js";
import Loader from "../Components/Loader.jsx";

const Certificate = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await dispatch(getCertificate(courseId));
      if (!res.error) setCertificate(res.payload.certificate);
      setLoading(false);
    })();
  }, [dispatch, courseId]);

  if (loading) return <Loader />;

  if (!certificate) {
    return (
      <div className="text-center py-20">
        <p className="opacity-70 mb-4">
          Certificate not available. Complete all lectures to unlock it.
        </p>
        <Link to="/my-courses" className="btn btn-primary">
          Back to My Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-end mb-4 print:hidden">
        <button onClick={() => window.print()} className="btn btn-primary">
          Print / Save as PDF
        </button>
      </div>

      <div
        className="border-8 border-double border-primary rounded-lg p-12 text-center bg-base-100"
        style={{ boxShadow: "0 0 0 4px #f59e0b30" }}
      >
        <p className="uppercase tracking-widest text-sm opacity-60 mb-2">
          Certificate of Completion
        </p>
        <h1 className="text-4xl font-extrabold text-primary mb-6">Dudemy</h1>
        <p className="text-lg opacity-70 mb-2">This certifies that</p>
        <h2 className="text-3xl font-bold mb-4">{certificate.studentName}</h2>
        <p className="text-lg opacity-70 mb-2">
          has successfully completed the course
        </p>
        <h3 className="text-2xl font-semibold text-secondary mb-6">
          {certificate.courseTitle}
        </h3>
        <div className="flex justify-between items-end mt-16 px-8">
          <div className="text-left">
            <p className="font-semibold border-t border-base-300 pt-1">
              {certificate.instructor}
            </p>
            <p className="text-xs opacity-60">Instructor</p>
          </div>
          <div className="text-right">
            <p className="font-semibold border-t border-base-300 pt-1">
              {new Date(certificate.issuedAt).toLocaleDateString()}
            </p>
            <p className="text-xs opacity-60">Date Issued</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
