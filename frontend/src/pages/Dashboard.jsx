import React, { useEffect, useState } from 'react';
import { FiClock, FiCheckCircle, FiEye, FiHome, FiAlertTriangle, FiCreditCard, FiSkipForward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    views: 0
  });
  const [recentListings, setRecentListings] = useState([]);
  const [trialStatuses, setTrialStatuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real scenario, this might come from a dedicated /stats endpoint.
    // For this module, we'll fetch the listings and compute.
    const fetchDashboardData = async () => {
      try {
        const { data } = await api.get('/listings/my-listings');
        const listings = data.data;

        const approvedCount = listings.filter(l => l.status === 'Approved').length;
        const pendingCount = listings.filter(l => l.status === 'Pending').length;
        const totalViews = listings.reduce((acc, curr) => acc + (curr.viewCount || 0), 0);

        setStats({
          total: listings.length,
          approved: approvedCount,
          pending: pendingCount,
          views: totalViews
        });
        
        // Show all recent listings
        setRecentListings(listings);

        // Fetch trial status
        const trialResponse = await api.get('/payments/user/trial-status');
        setTrialStatuses(trialResponse.data.data);

      } catch (error) {
        console.error('Error fetching dashboard stats', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handlePaymentClick = (listingId) => {
    navigate('/listings/payment', { state: { listingId } });
  };

  const expiringListings = trialStatuses.filter(status => status.needsPayment || status.daysUntilExpiry <= 3);

  const endTrialForListing = async (listingId) => {
    try {
      await api.post(`/listings/${listingId}/end-trial`);
      toast.success('Free trial ended successfully! Payment is now required.');
      
      // Refresh the trial status
      const trialResponse = await api.get('/payments/user/trial-status');
      setTrialStatuses(trialResponse.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to end trial');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, John doe!</h1>
        <p className="text-gray-500">Here's an overview of your boarding listings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Listings */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start text-gray-500 mb-4">
            <span className="text-sm font-medium">Total Listings</span>
            <FiHome className="w-5 h-5 text-gray-400" />
          </div>
          <span className="text-3xl font-bold text-gray-800">{stats.total}</span>
        </div>

        {/* Approved */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col text-green-600">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-gray-500">Approved</span>
            <FiCheckCircle className="w-5 h-5" />
          </div>
          <span className="text-3xl font-bold">{stats.approved}</span>
        </div>

        {/* Pending */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col text-orange-500">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-gray-500">Pending</span>
            <FiClock className="w-5 h-5" />
          </div>
          <span className="text-3xl font-bold">{stats.pending}</span>
        </div>

        {/* Total Views */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col text-blue-600">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-gray-500">Total Views</span>
            <FiEye className="w-5 h-5" />
          </div>
          <span className="text-3xl font-bold">{stats.views}</span>
        </div>
      </div>

      {/* Payment Alerts Section */}
      {expiringListings.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FiAlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-lg font-bold text-red-800">Payment Required</h2>
          </div>
          <div className="space-y-3">
            {expiringListings.map(listing => (
              <div key={listing._id} className="bg-white rounded-lg p-4 border border-red-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{listing.title}</p>
                    {listing.needsPayment ? (
                      <p className="text-sm text-red-600">Your free trial has expired. Make a payment to continue.</p>
                    ) : (
                      <p className="text-sm text-orange-600">Trial expires in {listing.daysUntilExpiry} day{listing.daysUntilExpiry !== 1 ? 's' : ''}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handlePaymentClick(listing._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <FiCreditCard />
                    Make Payment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <a href="/listings/add" className="bg-blue-600 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-700 font-medium">
            + Add New Boarding
          </a>
          <a href="/listings" className="bg-white border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-50 font-medium">
            View All Listings
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Listings</h2>
        <div className="divide-y divide-gray-100">
          {recentListings.map(listing => (
            <div key={listing._id} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-800">{listing.title} {listing.status === 'Pending' && '- Pending Approval'}</p>
                <p className="text-sm text-gray-500">{listing.accommodationType} • Rs. {listing.monthlyRent}/month</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  listing.status === 'Approved' ? 'bg-green-100 text-green-700' :
                  listing.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {listing.status}
                </span>
                {/* Check if this listing is in trial and add end trial button */}
                {(() => {
                  const trialStatus = trialStatuses.find(ts => ts._id === listing._id);
                  return trialStatus && trialStatus.paymentStatus === 'trial' && !trialStatus.needsPayment ? (
                    <button
                      onClick={() => endTrialForListing(listing._id)}
                      className="bg-orange-500 text-white px-3 py-1 rounded text-xs font-medium hover:bg-orange-600 flex items-center gap-1"
                      title="End free trial early"
                    >
                      <FiSkipForward />
                      End Trial
                    </button>
                  ) : null;
                })()}
                <a href={`/listings`} className="text-blue-600 text-sm font-medium">View</a>
              </div>
            </div>
          ))}
          {recentListings.length === 0 && (
            <p className="text-gray-500 text-sm py-2">No recent listings found.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
