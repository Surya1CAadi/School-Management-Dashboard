import Image from "next/image";

const TableSearch = () => {
    return (
        <div className=''>
           {/* TOP  */}
           <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
                <Image src="/search.png" alt="" width={16} height={16} />
                <input type='text' placeholder='search...' className='w-[200px] p-2 bg-transparent outline-none'/>
            </div>
        </div>
    );
}
export default TableSearch;
