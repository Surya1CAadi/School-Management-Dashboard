import Announcements from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
import FormModel from "@/components/FormModal";
import Performance from "@/components/Performance";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const SingleTeacherPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-Asky py-6 px-6 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image src="/jigy.jpg" alt="" width={144} height={144} className="w-36 h-36 rounded-full object-cover" />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
            <div className="flex items.center gap-4">
              <h1 className="text-xl font-semibold">Jigyasu Saini</h1>
              <FormModel table="teacher" type="update" data={
               { id: 1,
                username: "Jigyasu Saini",
                email: "john@doe.com",
                password:"password",
                firstName:"Jigyasu",
                lastName:"Saini",
                phone: "1234567890",
                address: "123 Main St, Anytown, USA",
                bloodType:"A+",
                dateOfBirth:"2000-02-02",
                sex:"male",
                img:
                  "/abhi.jpg?auto=compress&cs=tinysrgb&w=1200",
              }}
              />
              </div>
              <p className="text-sm text-gray-500">
                ✨Brew, sip, and savor the journey! 🍃 </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" height={14} width={14} />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" height={14} width={14} />
                  <span>January 2025</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" height={14} width={14} />
                  <span>Jigyasu@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" height={14} width={14} />
                  <span>7234070013</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARD  */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex  gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] ">
              <Image src="/singleAttendance.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleBranch.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div className="">
                <h1 className="text-xl font-semibold">2</h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleLesson.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleClass.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1 className="text-xl font-semibold">Teacher's Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Sortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md  bg-Askylight" href="/">Teacher's Classes</Link>
            <Link className="p-3 rounded-md  bg-Apurplelight" href="/">Teacher's Students</Link>
            <Link className="p-3 rounded-md  bg-Ayellowlight" href="/">Teacher's Lessons</Link>
            <Link className="p-3 rounded-md  bg-pink-50" href="/">Teacher's Exams</Link>
            <Link className="p-3 rounded-md  bg-Askylight" href="/">Teacher's Assignments</Link>
          </div>
        </div>
        <Performance/>
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
