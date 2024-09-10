import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import Link from "next/link";
import { role, attendanceData } from "@/lib/data";
import FormModel from "@/components/FormModal";

type Attendance = {
    id: number;
    name: string;
    class: string; // Added field for class
    totalDays: number;
    daysPresent: number;
    presentPercent: number; // e.g., percentage of days present
    comments: string;
};

const columns = () => [
    {
        header: "Name",
        accessor: "name",
    },
    {
        header: "Class",
        accessor: "class",
    },
    {
        header: "Total Days",
        accessor: "totalDays",
        className: "hidden md:table-cell",
    },
    {
        header: "Days Present",
        accessor: "daysPresent",
        className: "hidden lg:table-cell",

    },
    {
        header: "Present (%)",
        accessor: "presentPercent",
        className: "hidden md:table-cell",
        // Add percentage of attendance
    },
    {
        header: "Comments",
        accessor: "comments",
        className: "hidden lg:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];


const AttendanceListPage = () => {
    const renderRow = (item: Attendance) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-Apurplelight">
            <td className="flex items-center gap-4 p-4 font-semibold">{item.name}</td>
            <td className="">{item.class}</td>
            <td className="hidden md:table-cell">{item.totalDays}</td>
            <td className="hidden lg:table-cell">{item.daysPresent}</td>
            <td className="hidden md:table-cell">{item.presentPercent}%</td>
            <td className="hidden lg:table-cell">{item.comments}</td>
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
                        <FormModel table="attendance" type="delete" id={item.id}/>

                    )}
                </div>
            </td>
        </tr>
    )
    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
            {/* TOP  */}
            <div className="flex items-center justify-between">
                <h1 className=" hidden md:block text-lg font-semibold">All Attendance</h1>
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
                            <FormModel table="attendance" type="create" />
                            )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns()} renderRow={renderRow} data={attendanceData} />
            {/* PAGINATION  */}
            <Pagination />
        </div>
    );
};
export default AttendanceListPage;