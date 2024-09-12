import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import Link from "next/link";
import { role,  announcementsData } from "@/lib/data";
import FormModel from "@/components/FormModal";

type Announcement = {
    id: number;
    title: string;
    class: string;
    date: string;
};

// Define possible roles as a union type
type Role = 'admin' | 'teacher' | 'staff' | 'student' | 'parent';

const columnAccess: Record<Role, string[]> = {
    admin: ["title", "class", "date", "action"],
    teacher: ["title", "class", "date"],
    staff: ["title", "class", "date"],
    student: ["title", "class", "date"],
    parent: ["title", "class", "date"],
};

// Ensure `role` is of type `Role`
const currentRole: Role = role as Role;

// Define columns with role-based access
const columns = () => {
    const accessibleColumns = columnAccess[currentRole] || []; // Get columns accessible by the role

    return [
        {
            header: "Title",
            accessor: "title",
        },

        {
            header: "Class",
            accessor: "class",
    
        },
        {
            header: "Date",
            accessor: "date",
            className: "hidden md:table-cell",
        },       
        {
            header: "Actions",
            accessor: "action",
        },

    ].filter(column => accessibleColumns.includes(column.accessor));
};


const AnnouncementListPage = () => {
    const renderRow = (item: Announcement) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-Apurplelight">
            <td className="flex items-center gap-4 p-4">{item.title}</td>
            <td className="font-semibold">{item.class}</td>
            <td className="hidden md:table-cell">{item.date}</td>
            <td >
                <div className="flex items-center gap-2">
                    {role === "admin" &&
                        (<>
                        <FormModel table="announcement" type="update" data={item}/>
                        <FormModel table="announcement" type="delete" id={item.id}/>
                        </>
                    )}
                </div>
            </td>
        </tr>
    )
    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
            {/* TOP  */}
            <div className="flex items-center justify-between">
                <h1 className=" hidden md:block text-lg font-semibold">All Announcements</h1>
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
                            <FormModel table="announcement" type="create" />
                            )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns()} renderRow={renderRow} data={announcementsData} />
            {/* PAGINATION  */}
            <Pagination />
        </div>
    );
};
export default AnnouncementListPage;