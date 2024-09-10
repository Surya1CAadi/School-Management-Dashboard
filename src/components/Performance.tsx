"use client"
import Image from 'next/image';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 92, fill: "#C3EBFA" },
    { name: 'Group B', value: 8, fill: "#FAE27C" },
];

const Performance = () => {
    return (
        <div className="bg-white rounded-md h-80 relative">
            <div className="flex items-center justify-between ">
                <h1 className="text-xl font-semibold m-4">Performance</h1>
                <Image src="/moreDark.png" alt='' width={16} height={16} className='m-4 '/>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart >
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        fill="#8884d8"
                        
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4/5 text-center" >
                <h1 className="text-3xl font-semibold m-1">9.2</h1>
                <p className='text-xs text-gray-300 m-1'>of 10 max LTS</p>
            </div>
            <h2 className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center">1st Semester - 2nd Semester</h2>
        </div>
    )
}
export default Performance;