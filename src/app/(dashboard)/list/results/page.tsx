import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import Link from "next/link";
import { role,  resultsData } from "@/lib/data";
import FormModel from "@/components/FormModal";

type Result = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
    student: string;
    date: string;
    type: "exam"|"assignment";
    score: number;
};


const columns = () => [
    {
        header: "Subject",
        accessor: "subject",
    },
    {
        header: "Student",
        accessor: "student",
    },
    {
        header: "Score",
        accessor: "score",
        className: "hidden md:table-cell",
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden lg:table-cell",

    },
    {
        header: "Class",
        accessor: "class",
        className: "hidden md:table-cell",

    },
    
    {
        header: "Date",
        accessor: "date",
        className: "hidden lg:table-cell",
    },
   
    {
        header: "Actions",
        accessor: "action",
    },
];



const ResultListPage = () => {
    const renderRow = (item: Result) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-Apurplelight">
            <td className="flex items-center gap-4 p-4 ">{item.subject}</td>
            <td className="font-semibold">{item.student}</td>
            <td className="hidden md:table-cell">{item.score}</td>
            <td className="hidden lg:table-cell">{item.teacher}</td>
            <td className="hidden md:table-cell">{item.class}</td>
            <td className="hidden lg:table-cell">{item.date}</td>
            <td >
                <div className="flex items-center gap-2">
                    <Link href={"/list/Capacity/${item.id}"}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-Asky">
                            <Image src="/edit.png" alt="" width={16} height={16} />
                        </button>
                    </Link>
                    {role === "admin" &&
                        (
                        // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-Apurple">
                        //     <Image src="/delete.png" alt="" width={16} height={16} />
                        // </button>
                        <FormModel table="result" type="delete" id={item.id}/>
                    )}
                </div>
            </td>
        </tr>
    )
    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
            {/* TOP  */}
            <div className="flex items-center justify-between">
                <h1 className=" hidden md:block text-lg font-semibold">All Results</h1>
                <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Ayellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Ayellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        {role === "admin" &&
                            (
                            // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Ayellow">
                            //     <Image src="/plus.png" alt="" width={14} height={14} />
                            // </button>
                            <FormModel table="result" type="create" />
                            )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns()} renderRow={renderRow} data={resultsData} />
            {/* PAGINATION  */}
            <Pagination />
        </div>
    );
};
export default ResultListPage;