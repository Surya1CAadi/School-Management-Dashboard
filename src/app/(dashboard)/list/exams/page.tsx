import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import Link from "next/link";
import { role,examsData } from "@/lib/data";
import FormModel from "@/components/FormModal";

type Exam = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
    date: string;
};


// Define possible roles as a union type
type Role = 'admin' | 'teacher' | 'staff' | 'student' | 'parent';

const columnAccess: Record<Role, string[]> = {
    admin: ["subject", "class", "teacher", "date", "action"],
    teacher: ["subject", "class", "teacher", "date"],
    staff: ["subject", "class", "teacher", "date"],
    student: ["subject", "class", "teacher", "date"],
    parent: ["subject", "class", "teacher", "date"],
};

// Ensure `role` is of type `Role`
const currentRole: Role = role as Role;

// Define columns with role-based access
const columns = () => {
    const accessibleColumns = columnAccess[currentRole] || []; // Get columns accessible by the role

    return [
        {
            header: "Subject",
            accessor: "subject",
            // className: "hidden lg:table-cell",
          },
         
          {
            header: "Class",
            accessor: "class",
            // className: "hidden md:table-cell",
          },
          {
            header: "Teacher",
            accessor: "teacher",
            className: "hidden md:table-cell",
    
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


const ExamsListPage = () => {
    const renderRow =(item:Exam)=>(
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-Apurplelight">
            <td className="flex items-center gap-4 p-4 font-semibold">{item.subject}</td>
            <td className="">{item.class}</td>
            
            <td className="hidden md:table-cell">{item.teacher}</td>
            <td className="hidden md:table-cell">{item.date}</td>
            <td >
                <div className="flex items-center gap-2">
                {role === "admin" &&
                        (<>
                            <FormModel table="exam" type="update" data={item} />
                            <FormModel table="exam" type="delete" id={item.id} />
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
                <h1 className=" hidden md:block text-lg font-semibold">All Exams</h1>
                <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Ayellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Ayellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        {role ==="admin" &&
                    (
                    <FormModel table="exam" type="create" />

                    )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns()} renderRow={renderRow} data={examsData}/>
            {/* PAGINATION  */}
            <Pagination />
        </div>
    );
};
export default ExamsListPage;