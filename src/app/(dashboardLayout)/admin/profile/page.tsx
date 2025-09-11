import ProfileCard from '@/components/profile/ProfileCard';
import React from 'react';

const AdminProfile = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold px-1 py-3">Admin Profile</h2>
             <div>
                <ProfileCard/>
             </div>
        </div>
    );
};

export default AdminProfile; 