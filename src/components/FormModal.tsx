"use client"

import Image from "next/image";

const FormModel = ({ table, type, data, id }: {
    table: "teacher" | "student" | "parent" | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
    type: "create" | "delete" | "update";
    data?: any;
    id?: number;
}) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-Ayellow" 
    : type === "update" ? "bg-Asky" : "bg-Apurple";
    return <>
        <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}>
        <Image src={`/${type}.png`} alt='' width={16} height={16} />
        </button> 
    </>

}
export default FormModel;
