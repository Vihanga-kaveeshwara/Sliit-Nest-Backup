import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiUser, FiMail, FiShield, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import MyRoommatePosts from './MyRoommatePosts';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <Link
          to="/roommates"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b2b56] hover:text-indigo-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg border border-blue-100 transition"
        >
          <FiArrowLeft size={15} /> Back to Roommates
        </Link>
      </div>
      
      <div className="bg-white shadow rounded-2xl overflow-hidden border border-gray-100">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <div className="px-8 flex flex-col md:flex-row gap-6 items-start pb-8">
          <div className="-mt-12">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
              <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl">
                {user.firstName ? user.firstName.charAt(0) : <FiUser size={40} />}
              </div>
            </div>
          </div>
          
          <div className="pt-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {user.firstName} {user.lastName}
                  {user.role === 'Student' && user.isVerified && (
                    <span title="SLIIT Verified Student" className="text-blue-500">
                      <FiCheckCircle size={20} />
                    </span>
                  )}
                </h2>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <FiMail /> {user.email}
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <FiShield size={14} /> {user.role}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="bg-white shadow rounded-2xl p-8 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-4 mb-6">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
            <p className="font-semibold text-gray-900">{user.firstName || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
            <p className="font-semibold text-gray-900">{user.lastName || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
            <p className="font-semibold text-gray-900">{user.phoneNumber || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
            <p className="font-semibold text-gray-900">{user.address || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
            <p className="font-semibold text-gray-900">{user.gender || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Age</label>
            <p className="font-semibold text-gray-900">{user.age || 'N/A'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">Email <span className="text-xs text-red-500">(Cannot be changed)</span></label>
            <p className="font-semibold text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
      {/* My Roommate Posts - Students only */}
      {user.role === 'Student' && <MyRoommatePosts />}

    </div>
  );
};

export default Profile;
