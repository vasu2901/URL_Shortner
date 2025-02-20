"use client";

import { signOut, useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: true },
    { name: 'Topic', href: '/topic', current: false },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

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
        return (window.location.href = '/');
    }

    const getAllData = async () => {
        try {
            const res = await fetch('/api/analytics/overall', { method: 'GET' });
            const json = await res.json();
            if (!res.ok || json.message) {
                //console.log(json);
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
            //console.log(json);
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
        <div>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between items-center">
                                {/* Left Section */}
                                <div className="flex items-center">
                                    <div className="mr-4">
                                        <img
                                            alt="Logo"
                                            src="https://img.icons8.com/?size=512&id=stdEXlVErsEe&format=png"
                                            className="h-8 w-auto"
                                        />
                                    </div>
                                    <div className="hidden sm:flex space-x-4">
                                        <a
                                            key='home'
                                            href='/'
                                            className={classNames("text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "px-3 py-2 rounded-md text-sm font-medium"
                                            )}
                                        >
                                            URL Shortner
                                        </a>
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                    "px-3 py-2 rounded-md text-sm font-medium"
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Section */}
                                <div className="flex items-center space-x-4">
                                    {/* Notification Button */}
                                    <button className="p-2 text-gray-400 hover:text-white focus:ring-2 focus:ring-white">
                                        <BellIcon className="h-6 w-6" />
                                    </button>

                                    {/* Profile Dropdown */}
                                    <Menu as="div" className="relative">
                                        <MenuButton className="flex items-center">
                                            <img
                                                src={session?.user?.image || ""}
                                                alt="User Avatar"
                                                className="h-8 w-8 rounded-full"
                                            />
                                        </MenuButton>

                                        <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 ring-1 ring-black/5 focus:outline-none">
                                            <MenuItem>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => signOut()}
                                                        className={classNames(
                                                            active ? "bg-gray-100" : "",
                                                            "block w-full px-4 py-2 text-left text-gray-700"
                                                        )}
                                                    >
                                                        Sign out
                                                    </button>
                                                )}
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        <DisclosurePanel className="sm:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <DisclosureButton
                                    key='home'
                                    as="a"
                                    href="/"
                                    className={classNames("text-gray-300 hover:bg-gray-700 hover:text-white",
                                        "block rounded-md px-3 py-2 text-base font-medium"
                                    )}
                                >
                                    Home
                                </DisclosureButton>
                                {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "block rounded-md px-3 py-2 text-base font-medium"
                                        )}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
            <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>


            {/* URL Shortener Form */}
            <h2 className="text-xl font-semibold mb-2">Create Short URL</h2>
            {/* URL Shortener Form */}
            <form onSubmit={handleSubmit} className="space-y-4 bg-dark p-6 shadow rounded-lg">
                <div>
                    <label className="block font-medium">Long URL</label>
                    <input
                        type="url"
                        placeholder="https://example.com"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Custom Alias (optional)</label>
                    <input
                        type="text"
                        placeholder="custom-alias"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium">Topic (optional)</label>
                    <input
                        type="text"
                        placeholder="e.g. marketing"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>
                <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
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
                                        <button className="mt-6 px-4 py-2 bg-black text-white rounded" onClick={() => { window.location.href = `/analytics/${alias}` }}>{alias}</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm">No device data available.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
