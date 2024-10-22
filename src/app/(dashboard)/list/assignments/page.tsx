import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import React from "react";
import { role, assignmentsData } from "@/lib/data";
import FormModel from "@/components/FormModal";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "../../../../lib/settings";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";

type AssignmentsList = Assignment & {
    lesson: {
        subject: Subject;
        class: Class;
        teacher: Teacher
    };
};

// Define possible roles as a union type
type Role = 'admin' | 'teacher' | 'staff' | 'student' | 'parent';

const columnAccess: Record<Role, string[]> = {
    admin: ["subject", "class", "teacher", "dueDate", "action"],
    teacher: ["subject", "class", "teacher", "dueDate"],
    staff: ["subject", "class", "teacher", "dueDate"],
    student: ["subject", "class", "teacher", "dueDate"],
    parent: ["subject", "class", "teacher", "dueDate"],
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
        },
        {
            header: "Class",
            accessor: "class",
        },
        {
            header: "Teacher",
            accessor: "teacher",
            className: "hidden md:table-cell",
        },
        {
            header: "Due Date",
            accessor: "dueDate",
            className: "hidden md:table-cell",
        },
        {
            header: "Actions",
            accessor: "action",
        },
    ].filter(column => accessibleColumns.includes(column.accessor));
};



const renderRow = (item: AssignmentsList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-Apurplelight">
        <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
        <td className="font-semibold">{item.lesson.class.name}</td>

        <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-IN").format(item.dueDate)}</td>
        <td >
            <div className="flex items-center gap-2">
                {role === "admin" &&
                    (
                        <>
                            <FormModel table="assignment" type="update" data={item} />
                            <FormModel table="assignment" type="delete" id={item.id} />
                        </>
                    )}
            </div>
        </td>
    </tr>
)


const AssignnmentListPage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined }
}) => {
    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    const query: Prisma.AssignmentWhereInput = {};
    query.lesson = {};
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "classId":
                        query.lesson.classId = parseInt(value);
                        break;
                    case "teacherId":
                        query.lesson.teacherId = value;
                        break;
                    case "search":
                        query.OR = [
                            { lesson: { subject: { name: { contains: value, mode: "insensitive" } } } },
                            { lesson: { teacher: { name: { contains: value, mode: "insensitive" } } } },
                            { lesson: { teacher: { surname: { contains: value, mode: "insensitive" } } } },
                            { lesson: { class: { name: { contains: value, mode: "insensitive" } } } },
                        ];
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [data, count] = await prisma.$transaction([
        prisma.assignment.findMany(
            {
                where: query,
                include: {
                    lesson: {
                        select: {
                            subject: { select: { name: true } },
                            class: { select: { name: true } },
                            teacher: { select: { name: true, surname: true } },
                        },
                    },
                },
                take: ITEM_PER_PAGE,
                skip: ITEM_PER_PAGE * (p - 1),

            }),
        prisma.assignment.count(
            {
                where: query,
            }),
    ]);
    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
            {/* TOP  */}
            <div className="flex items-center justify-between">
                <h1 className=" hidden md:block text-lg font-semibold">All Assignments</h1>
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
                                <FormModel table="assignment" type="create" />
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
export default AssignnmentListPage;