"use client";
import { Access } from "./client";
import { Suspense } from "react";

const Page = () => {
    return (
        <div className="font-sans">
            {/* Navbar */}
            <nav className="bg-green-600 py-4 px-6 flex justify-between items-center shadow-md">
                <h1 className="text-white text-2xl font-bold tracking-wide">URL SHORTENER</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <Access />
                </Suspense>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center h-[60vh] bg-green-500 text-white px-6">
                <h2 className="text-5xl font-extrabold mb-4">Shorten Your Links, Track Your Success!</h2>
                <p className="text-lg max-w-2xl mx-auto mb-6">
                    Transform long URLs into short, manageable links and gain insights into your audience.
                </p>
                <button className="bg-white text-green-600 px-6 py-3 text-lg rounded-lg shadow-md hover:bg-gray-200 transition">
                    Get Started
                </button>
            </section>

            {/* What is a URL Shortener? */}
            <section className="py-20 text-center bg-gray-100">
                <h2 className="text-4xl font-bold text-gray-800">What is a URL Shortener?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
                    A URL shortener is a tool that converts long URLs into shorter, more manageable links.
                    This makes sharing links easier and allows you to track clicks and engagement.
                </p>
            </section>

            {/* Analytics Section */}
            <section className="py-20 text-center bg-white">
                <h2 className="text-4xl font-bold text-gray-800">Analytics</h2>
                <ul className="mt-6 space-y-4 text-gray-700 text-lg">
                    <li>📊 Alias-Based Analytics</li>
                    <li>📌 Topic-Based Analytics</li>
                    <li>📈 Overall User Analytics</li>
                </ul>
            </section>

            {/* FAQs Section */}
            <section className="py-20 bg-gray-100">
                <h2 className="text-4xl font-bold text-gray-800 text-center">Frequently Asked Questions</h2>
                <div className="mt-8 max-w-3xl mx-auto space-y-6 text-gray-700 text-lg">
                    <div>
                        <strong>Q:</strong> How does a URL shortener work?
                        <br />
                        <span className="ml-4">A: It takes a long URL and generates a shorter version that redirects to the original URL.</span>
                    </div>
                    <div>
                        <strong>Q:</strong> Is it free to use?
                        <br />
                        <span className="ml-4">A: Yes, our basic features are free to use!</span>
                    </div>
                    <div>
                        <strong>Q:</strong> Can I track my links?
                        <br />
                        <span className="ml-4">A: Absolutely! You can view analytics for each shortened link.</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
