'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
export default function TopicForm() {
    const { data: session, status } = useSession();
    if (status === "unauthenticated") {
        return (window.location.href = '/access');
    }
    const [topic, setTopic] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic) {
            alert('Please enter a topic');
            return;
        }

        // Construct the URL with query parameters
        const url = `/api/analytics/topic?topic=${encodeURIComponent(topic)}`;

        const res = await fetch(url, { method: "GET" })
        const json = await res.json();
        if (!res.ok) {
            console.log(json);
        }
        console.log(json)
        console.log("Successfully received data")
    };

    return (
        <div className="p-4 border rounded bg-gray-100">
            <h2 className="text-lg font-bold mb-4">Search Topic</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                        Topic:
                    </label>
                    <input
                        type="text"
                        id="topic"
                        name="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter a topic"
                        className="mt-1 p-2 w-full border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
