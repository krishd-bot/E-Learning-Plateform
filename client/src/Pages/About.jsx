import React, { useState } from "react";
import toast from "react-hot-toast";

import Inputbox from "../Components/Inputbox.jsx";
import axiosInstance from "../api/axios.js";
import aboutImg from "../assets/about.png";

const About = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await axiosInstance.post("/misc/contact", form);
      toast.success(res.data.message);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">About Dudemy</h1>
          <p className="opacity-80 mb-4">
            Dudemy is a modern Learning Management System built to make
            quality education accessible to everyone. Whether you're picking
            up a brand-new skill or sharpening an existing one, our platform
            gives you structured lectures, progress tracking, and
            certificates to show for your effort.
          </p>
          <p className="opacity-80">
            We believe learning should be flexible, engaging, and rewarding —
            that's why every course on Dudemy is built around real progress,
            not just video views.
          </p>
        </div>
        <img src={aboutImg} alt="About Dudemy" className="w-full rounded-xl" />
      </section>

      <section className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="card border border-base-200 p-6">
          <Inputbox
            label="Name"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Inputbox
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Inputbox
            label="Message"
            name="message"
            textarea
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button
            type="submit"
            disabled={sending}
            className="btn btn-primary w-full"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default About;
