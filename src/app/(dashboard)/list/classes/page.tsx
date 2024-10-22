import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { role, classesData } from "@/lib/data";
import FormModel from "@/components/FormModal";
import { ITEM_PER_PAGE } from "../../../../lib/settings";
import prisma from "@/lib/prisma";
import { Class, Grade, Prisma, Teacher } from "@prisma/client";

type ClassList = Class & { supervisor: Teacher } & { grade: Grade }

// Define possible roles as a union type
type Role = 'admin' | 'teacher' | 'staff' | 'student' | 'parent';

const columnAccess: Record<Role, string[]> = {
    admin: ["classname", "capacity", "grade", "supervisor", "action"],
    teacher: ["classname", "capacity", "grade", "supervisor"],
    staff: ["classname", "capacity", "grade", "supervisor"],
    student: ["classname", "capacity", "grade", "supervisor"],
    parent: ["classname", "capacity", "grade", "supervisor"],
};

// Ensure `role` is of type `Role`
const currentRole: Role = role as Role;

// Define columns with role-based access
const columns = () => {
    const accessibleColumns = columnAccess[currentRole] || []; // Get columns accessible by the role

    return [
        {
            header: "Class Name",
            accessor: "classname",
            // className: "hidden lg:table-cell",
        },

        {
            header: "Capacity",
            accessor: "capacity",
            className: "hidden md:table-cell",
        },
        {
            header: "Grade",
            accessor: "grade",
            className: "hidden md:table-cell",

        },
        {
            header: "Supervisor",
            accessor: "supervisor",
            // className: "hidden md:table-cell",

        },
        {
            header: "Actions",
            accessor: "action",
        },
    ].filter(column => accessibleColumns.includes(column.accessor));
};



const renderRow = (item: ClassList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-Apurplelight">
        <td className="flex items-center gap-4 p-4 font-semibold">{item.name}</td>
        <td className="hidden md:table-cell">{item.capacity}</td>

        <td className="hidden md:table-cell">{item.name[0]}</td>
        <td className="">{item.supervisor.name + " " + item.supervisor.surname}</td>
        <td >
            <div className="flex items-center gap-2">
                {role === "admin" &&
                    (<>
                        <FormModel table="class" type="update" data={item} />
                        <FormModel table="class" type="delete" id={item.id} />
                    </>
                    )}
            </div>
        </td>
    </tr>
)


const ClassesListPAge = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined }
}) => {
    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    const query: Prisma.ClassWhereInput = {}
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "supervisorId":
                        query.supervisorId = value;
                        break;
                    case "search":
                        query.OR = [
                            { name: { contains: value, mode: "insensitive" } },
                            { supervisor: { name: { contains: value, mode: "insensitive" } } },
                        ]
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [data, count] = await prisma.$transaction([
        prisma.class.findMany(
            {
                where: query,
                include: {
                    supervisor: true,
                },
                take: ITEM_PER_PAGE,
                skip: ITEM_PER_PAGE * (p - 1),
            }),
        prisma.class.count(
            {
                where: query,
            }),
    ]);
    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
            {/* TOP  */}
            <div className="flex items-center justify-between">
                <h1 className=" hidden md:block text-lg font-semibold">All Classes</h1>
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
                                <FormModel table="class" type="create" />
                            )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns()} renderRow={renderRow} data={data} />
            {/* PAGINATION  */}
            <Pagination page={p} count={count} />
        </div>
    );
};
export default ClassesListPAge;