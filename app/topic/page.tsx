'use client';
import React, { useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: false },
    { name: 'Topic', href: '/topic', current: true },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function TopicForm() {
    const { data: session, status } = useSession();
    if (status === "unauthenticated") {
        return (window.location.href = '/');
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
        <div >
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
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            className="h-8 w-auto"
                                        />
                                    </div>
                                    <div className="hidden sm:flex space-x-4">
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
            <div className='p-4 border-rounded'>
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
        </div>
    );
}
