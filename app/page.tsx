"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import va from "@vercel/analytics";
import { signIn } from "next-auth/react";
import pic from "../TopicAnalytics.jpg"
import pic2 from "../customaliasanalytics.jpg"
import pic3 from "../overallanalytics.jpg"
import Image from 'next/image';
const navigation = [
    { name: 'URL Shortner', href: '/', current: true },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const Page = () => {
    return (
        <div className="font-sans">
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
                                    <Menu as="div" className="relative w-20 bg-white shadow-lg rounded-md py-1 ring-1 ring-black/5 focus:outline-none ">
                                        <MenuButton className="flex items-center mx-auto">
                                            SignIn
                                        </MenuButton>

                                        <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 ring-1 ring-black/5 focus:outline-none">
                                            <MenuItem>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => {
                                                            va?.track("login-google");
                                                            signIn("google", { callbackUrl: "/dashboard" });
                                                        }}
                                                        className={classNames(
                                                            active ? "bg-gray-100" : "",
                                                            "block w-full px-4 py-2 text-left text-gray-700"
                                                        )}
                                                    >
                                                        SignIn with Google
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
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center h-[60vh] bg-green-500 text-white px-6">
                <h2 className="text-5xl font-extrabold mb-4">Shorten Your Links, Track Your Success!</h2>
                <p className="text-lg max-w-2xl mx-auto mb-6">
                    Transform long URLs into short, manageable links and gain insights into your audience.
                </p>
                <button className="bg-white text-green-600 px-6 py-3 text-lg rounded-lg shadow-md hover:bg-gray-200 transition" onClick={() => {
                    va?.track("login-google");
                    signIn("google", { callbackUrl: "/dashboard" });
                }}>
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
                    <ul className="mt-6 space-y-4 text-gray-700 text-lg">
                        <li>📊 Alias-Based Analytics</li>
                        <Image src={pic2} alt="Alias-Based Analytics" width={500} height={300} className="mx-auto rounded-lg shadow-md" />

                        <li>📌 Topic-Based Analytics</li>
                        <Image src={pic} alt="Topic-Based Analytics" width={500} height={300} className="mx-auto rounded-lg shadow-md" />

                        <li>📈 Overall User Analytics</li>
                        <Image src={pic3} alt="Overall User Analytics" width={500} height={300} className="mx-auto rounded-lg shadow-md" />
                    </ul>

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
