import Announcements from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
// import FormModal from "@/components/FormModal";
// import Performance from "@/components/Performance";
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
        <div className="bg-Asky py-6 px-6 rounded-md flex-1 flex gap-4"></div>
        {/* SMALL CARD  */}
        <div className="flex-1"></div>
        </div>
         {/* BOTTOM */}
        <div className="">Schedule</div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        r
        {/* <Performance /> */}
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
