import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function Payment() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const res = await api.post("/payment/buy", {
        courseId,
        paymentMethod: "UPI",
      });

      if (res.data.success) {
        toast.success("Course purchased successfully");

        navigate("/my-courses");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Payment failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <div className="bg-white shadow rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6">
          Dummy Payment
        </h1>

        <div className="space-y-4">
          <input
            className="w-full border rounded-lg px-4 py-3"
            placeholder="UPI ID"
            defaultValue="user@upi"
          />

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full rounded-lg bg-primary py-3 font-bold text-black"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}