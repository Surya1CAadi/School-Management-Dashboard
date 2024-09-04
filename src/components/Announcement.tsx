"use client";

import Image from "next/image";



// TEMPORARY
const Announcement = [
    {
        id: 1,
        title: "Lorem ipsum dolor",
        time: "12:00 PM - 2:00 PM",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 2,
        title: "Lorem ipsum dolor",
        time: "12:00 PM - 2:00 PM",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 3,
        title: "Lorem ipsum dolor",
        time: "12:00 PM - 2:00 PM",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
];

const Announcements = () => {

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Announcements</h1>
                <span className="text-xs text-gray-400">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div
                    className="bg-Askylight rounded-md p-4 " >
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium text-gray-600">Lorem ipsum dolor sit</h2>
                        <span className="text-xs text-gray-400  bg-white rounded-md px-1 py-1">2025-01-01</span>
                    </div>
                    <p className="text-sm text-gray-400">Lorem ipsum 
                        dolor sit amet, consectetur adipiscing elit.</p>
                </div>

            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div
                    className="bg-Apurplelight rounded-md p-4 " >
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium text-gray-600">Lorem ipsum dolor sit</h2>
                        <span className="text-xs text-gray-400  bg-white rounded-md px-1 py-1">2025-01-01</span>
                    </div>
                    <p className="text-sm text-gray-400">Lorem ipsum 
                        dolor sit amet, consectetur adipiscing elit.</p>
                </div>

            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div
                    className="bg-Ayellowlight rounded-md p-4 " >
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium text-gray-600">Lorem ipsum dolor sit</h2>
                        <span className="text-xs text-gray-400  bg-white rounded-md px-1 py-1">2025-01-01</span>
                    </div>
                    <p className="text-sm text-gray-400">Lorem ipsum 
                        dolor sit amet, consectetur adipiscing elit.</p>
                </div>

            </div>
        </div>
    );
};

export default Announcements;

// odd:border-t-Asky even:border-t-Apurple