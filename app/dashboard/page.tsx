"use client";

import { signOut, useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [longUrl, setLongUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [topic, setTopic] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [analytics, setAnalytics] = useState<any>(null);
    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
        return (window.location.href = '/access');
    }

    const getAllData = async () => {
        try {
            const res = await fetch('/api/analytics/overall', { method: 'GET' });
            const json = await res.json();
            if (!res.ok || json.message) {
                console.log(json);
            }
            else {
                setAnalytics(json);
            }
        } catch (err) {
            console.error("Failed to fetch analytics:", err);
        }
    };

    const getAliasData = async (alias: string) => {
        try {
            const res = await fetch(`/api/analytics?alias=${alias}`, { method: 'GET' });
            const json = await res.json();
            console.log(json);
            // setAnalytics(json);
        } catch (err) {
            console.error("Failed to fetch analytics:", err);
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setResponse('');

        if (!longUrl.trim()) {
            setError('Long URL is required');
            return;
        }

        try {
            const res = await fetch('/api/shorten', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ longUrl, customAlias, topic })
            });

            const json = await res.json();
            if (res.ok) {
                setResponse(`Short URL created: ${json.message}`);
            } else {
                setError(json.error || 'Failed to create short URL');
            }
        } catch (error) {
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>

            {/* User Info */}
            <div className="mb-4">
                <p><strong>Name:</strong> {session?.user?.name}</p>
                <p><strong>Email:</strong> {session?.user?.email}</p>
                {session?.user?.image && (
                    <img src={session.user.image} alt="User Avatar" className="w-20 h-20 rounded-full" />
                )}
            </div>

            {/* URL Shortener Form */}
            <h2 className="text-xl font-semibold mb-2">Create Short URL</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Long URL (required):</label>
                    <input
                        type="url"
                        placeholder="https://example.com"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Custom Alias (optional):</label>
                    <input
                        type="text"
                        placeholder="custom-alias"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Topic (optional):</label>
                    <input
                        type="text"
                        placeholder="e.g. marketing"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Create Short URL
                </button>
            </form>

            {/* Response Message */}
            {response && <p className="mt-4 text-green-500">{response}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}

            {/* Get All Data */}
            <button
                onClick={getAllData}
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
            >
                Get All Data
            </button>

            {/* Display Analytics */}
            {analytics && (
                <div className="mt-8 p-4 border rounded bg-gray-100">
                    <h2 className="text-lg font-bold mb-2">Overall Analytics</h2>
                    <ul className="space-y-2">
                        <li><strong>Total URLs:</strong> {analytics.totalUrls}</li>
                        <li><strong>Total Clicks:</strong> {analytics.totalClicks}</li>
                        <li><strong>Unique Users:</strong> {analytics.uniqueUsers}</li>
                    </ul>

                    {/* Clicks by Date */}
                    <div className="mt-4">
                        <h3 className="text-md font-semibold">Clicks by Date:</h3>
                        {analytics.clicksByDate.length > 0 ? (
                            <ul className="space-y-1">
                                {analytics.clicksByDate.map((item: any, index: number) => (
                                    <li key={index} className="text-sm">
                                        📅 {item.date}: {item.clicks ?? 'No Data'}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm">No clicks recorded by date.</p>
                        )}
                    </div>

                    {/* OS Type */}
                    <div className="mt-4">
                        <h3 className="text-md font-semibold">OS Type Analytics:</h3>
                        {analytics.osType.length > 0 ? (
                            <ul className="space-y-1">
                                {analytics.osType.map((os: any, index: number) => (
                                    <li key={index} className="text-sm">
                                        💻 {os.osName}: {os.uniqueClicks} clicks, {os.uniqueUsers} users
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm">No OS data available.</p>
                        )}
                    </div>

                    {/* Device Type */}
                    <div className="mt-4">
                        <h3 className="text-md font-semibold">Device Type Analytics:</h3>
                        {analytics.deviceType.length > 0 ? (
                            <ul className="space-y-1">
                                {analytics.deviceType.map((device: any, index: number) => (
                                    <li key={index} className="text-sm">
                                        📱 {device.deviceName}: {device.uniqueClicks} clicks, {device.uniqueUsers} users
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm">No device data available.</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <h3 className="text-md font-semibold">Device Type Analytics:</h3>
                        {analytics.deviceType.length > 0 ? (
                            <ul className="space-y-1">
                                {analytics.alias.map((alias: string, index: number) => (
                                    <li key={index} className="text-sm">
                                        <button onClick={() => { getAliasData(alias) }}>{alias}</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm">No device data available.</p>
                        )}
                    </div>
                </div>
            )}

            {/* Sign Out Button */}
            <button
                onClick={() => signOut()}
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
            >
                Sign Out
            </button>
        </div>
    );
}
