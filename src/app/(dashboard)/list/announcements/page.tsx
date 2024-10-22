import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import { role,  announcementsData } from "@/lib/data";
import FormModel from "@/components/FormModal";
import React from "react";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Announcement, Class, Prisma } from "@prisma/client";

type AnnouncementList =Announcement&{class:Class};

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

const renderRow = (item: AnnouncementList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-Apurplelight">
        <td className="flex items-center gap-4 p-4">{item.title}</td>
        <td className="font-semibold">{item.class.name}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-IN").format(item.date)}</td>
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
);

const AnnouncementListPage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined }
}) => {
    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    const query: Prisma.AnnouncementWhereInput = {}
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        query.OR = [
                            {  class: { name: { contains: value, mode: "insensitive"  } } },
                            { title: { contains: value, mode: "insensitive" } },
                        ];
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [data, count] = await prisma.$transaction([
        prisma.announcement.findMany(
            {
                where: query,
                include: {
                    class: true,
                },
                take: ITEM_PER_PAGE,
                skip: ITEM_PER_PAGE * (p - 1),
            }),
        prisma.announcement.count(
            {
                where: query,
            }),
    ]);
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
                            <FormModel table="announcement" type="create" />
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
export default AnnouncementListPage;