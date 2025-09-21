import React from 'react';
// FIX: Corrected import path for constants
import { ICONS } from '../constants';
// FIX: Corrected import path for types
import { RoomData } from '../types';

const roomData: RoomData[] = [
    { type: 'ICU Beds', count: 25, icon: ICONS.ICU_BED },
    { type: 'General Beds', count: 120, icon: ICONS.GENERAL_BED },
    { type: 'VIP Rooms', count: 12, icon: ICONS.VIP_ROOM },
];

const RoomOccupancyWidget: React.FC = () => {
    const headingId = "room-occupancy-heading";
    return (
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md" aria-labelledby={headingId}>
            <h2 id={headingId} className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100">Room Occupancy</h2>
            <div className="space-y-4">
                {roomData.map(room => (
                    <div key={room.type} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <div className="flex items-center">
                            <div className="p-2 bg-teal-100 text-teal-600 rounded-md mr-3" aria-hidden="true">
                                {room.icon}
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700 dark:text-slate-200">{room.type}</p>
                            </div>
                        </div>
                        <p className="font-bold text-lg text-slate-800 dark:text-slate-100">{room.count}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RoomOccupancyWidget;
