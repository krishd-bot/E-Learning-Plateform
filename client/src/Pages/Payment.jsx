import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";

import axiosInstance from "../api/axios.js";
import Loader from "../Components/Loader.jsx";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: "4242 4242 4242 4242",
    name: "",
    expiry: "12/29",
    cvv: "123",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get(`/course/${id}`);
        setCourse(res.data.course);
      } catch (err) {
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handlePay = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const checkoutRes = await axiosInstance.post("/payment/checkout", {
        courseId: id,
      });
      const order = checkoutRes.data.order;

      // Simulated gateway confirmation (no real card is charged)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      await axiosInstance.post("/payment/verify", {
        courseId: id,
        orderId: order.id,
      });

      toast.success("Payment successful! You're enrolled.");
      navigate(`/courses/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <Loader />;
  if (!course) return null;

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="card border border-base-200 shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={course.thumbnail?.secure_url}
            alt={course.title}
            className="w-16 h-16 rounded object-cover"
          />
          <div>
            <p className="font-bold line-clamp-1">{course.title}</p>
            <p className="text-primary font-bold">${course.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="alert alert-info text-xs mb-4">
          <FaLock />
          <span>
            This is a simulated checkout for demo purposes — no real card is
            charged.
          </span>
        </div>

        <form onSubmit={handlePay} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Cardholder Name</span>
            </label>
            <input
              required
              value={cardData.name}
              onChange={(e) =>
                setCardData({ ...cardData, name: e.target.value })
              }
              placeholder="Jane Doe"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Card Number</span>
            </label>
            <input
              value={cardData.number}
              onChange={(e) =>
                setCardData({ ...cardData, number: e.target.value })
              }
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-3">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Expiry</span>
              </label>
              <input
                value={cardData.expiry}
                onChange={(e) =>
                  setCardData({ ...cardData, expiry: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">CVV</span>
              </label>
              <input
                value={cardData.cvv}
                onChange={(e) =>
                  setCardData({ ...cardData, cvv: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="btn btn-primary w-full"
          >
            {processing ? "Processing..." : `Pay $${course.price.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
