'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
    const params = useParams();
    const { slug } = params as { slug: string };
    const [analytics, setAnalytics] = useState<any>(null);
    const [message, setmessage] = useState<string>("")
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/analytics?alias=${slug}`, { method: 'GET' });

                const data = await res.json();
                if (!res.ok) {
                    if (data.message) {
                        setmessage(data.message)
                    }
                    else {
                        setError(true);
                    }
                    return;
                }
                setAnalytics(data);
                setmessage(data.message)
            } catch (err) {
                console.error("Failed to fetch analytics:", err);
                setError(true);
            }
        };
        fetchData();
    }, [slug]);

    if (message) {
        return (<div className="mt-8 p-4 border rounded bg-gray-100">
            <h1 className="text-center text-blue-500">No Data Found</h1>
            <button className="p-2  bg-black text-gray-400 hover:text-white focus:ring-2 focus:ring-white" onClick={() => { window.location.href = '/dashboard' }}>Back</button></div>);
    }

    if (error) {
        return (<div className="mt-8 p-4 border rounded bg-gray-100"><h1 className="text-center text-red-500">Seems like this Alias does not Exsist</h1><button className="p-2 text-gray-400 hover:text-white focus:ring-2 focus:ring-white" onClick={() => { window.location.href = '/dashboard' }}>Back</button></div >);
    }

    if (!analytics) {
        return <p className="text-center">Loading analytics...</p>;
    }

    return (
        <div className="mt-8 p-4 border rounded bg-gray-100">
            <button className="p-2 bg-black text-gray-400 hover:text-white focus:ring-2 focus:ring-white" onClick={() => { window.location.href = '/dashboard' }}>Back</button>
            <h2 className="text-lg font-bold mb-2">Overall Analytics for {slug}</h2>
            <ul className="space-y-2">
                <li><strong>Total Clicks:</strong> {analytics.totalClicks ?? 0}</li>
                <li><strong>Unique Users:</strong> {analytics.uniqueUsers ?? 0}</li>
            </ul>

            {/* Clicks by Date */}
            <div className="mt-4">
                <h3 className="text-md font-semibold">Clicks by Date:</h3>
                {analytics.clicksByDate?.length > 0 ? (
                    <ul className="space-y-1">
                        {analytics.clicksByDate.map((item: any, index: number) => (
                            <li key={index} className="text-sm">
                                📅 {item.date}: {item.count ?? 'No Data'} clicks
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
                {analytics.osType?.length > 0 ? (
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
                {analytics.deviceType?.length > 0 ? (
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
        </div>
    );
}
