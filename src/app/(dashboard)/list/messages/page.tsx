// "use client"; // Mark this file as a Client Component

// import { useState } from "react";
// import Pagination from "@/components/Pagination";
// import TableSearch from "@/components/TableSearch";
// import Table from "@/components/Table";
// import Image from "next/image";
// import Link from "next/link";
// import { role, messagesData } from "@/lib/data"; // Ensure `messagesData` is properly defined

// type Message = {
//     id: number;
//     sender: string;
//     date: string;
//     subject: string;
//     preview: string;
//     content: string; // Full content of the message
// };


// const columns = () => [
//     {
//         header: "Sender",
//         accessor: "sender",
//     },
//     {
//         header: "Date",
//         accessor: "date",
//     },
//     {
//         header: "Subject",
//         accessor: "subject",
//     },
//     {
//         header: "Preview",
//         accessor: "preview",
//     },
//     {
//         header: "Actions",
//         accessor: "action",
//     },
// ];



const MessagePage = () => {
    return (<div className="">All Message</div>);
    //     const [searchTerm, setSearchTerm] = useState<string>('');

    //     const renderRow = (message: Message) => (
    //         <tr key={message.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-Apurplelight">
    //             <td className="p-4">{message.sender}</td>
    //             <td className="p-4">{message.date}</td>
    //             <td className="p-4">{message.subject}</td>
    //             <td className="p-4">{message.preview}</td>
    //             <td className="p-4">
    //                 <div className="flex items-center gap-2">
    //                     <Link href={`/messages/${message.id}`}>
    //                         <button className="w-7 h-7 flex items-center justify-center rounded-full bg-Asky">
    //                             <Image src="/view.png" alt="View" width={16} height={16} />
    //                         </button>
    //                     </Link>
    //                     {role === "admin" && (
    //                         <button className="w-7 h-7 flex items-center justify-center rounded-full bg-Apurple">
    //                             <Image src="/delete.png" alt="Delete" width={16} height={16} />
    //                         </button>
    //                     )}
    //                 </div>
    //             </td>
    //         </tr>
    //     );
    //     return (
    //         <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
    //             {/* TOP */}
    //             <div className="flex items-center justify-between">
    //                 <h1 className="text-lg font-semibold">Messages</h1>
    //                 <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
    //                     <TableSearch onSearch={setSearchTerm} />
    //                     <div className="flex items-center gap-4 self-end">
    //                         <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Ayellow">
    //                             <Image src="/filter.png" alt="Filter" width={14} height={14} />
    //                         </button>
    //                         <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Ayellow">
    //                             <Image src="/sort.png" alt="Sort" width={14} height={14} />
    //                         </button>
    //                         {role === "admin" && (
    //                             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Ayellow">
    //                                 <Image src="/plus.png" alt="Compose" width={14} height={14} />
    //                             </button>
    //                         )}
    //                     </div>
    //                 </div>
    //             </div>
    //  {/* LIST */}
    //  <Table columns={columns()} renderRow={renderRow} data={messagesData.filter(message =>
    //                 message.subject.toLowerCase().includes(searchTerm.toLowerCase())
    //             )} />
    //             {/* PAGINATION */}
    //             <Pagination />
    //         </div>
    // );
};

export default MessagePage;