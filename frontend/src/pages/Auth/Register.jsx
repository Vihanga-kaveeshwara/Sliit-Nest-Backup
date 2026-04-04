import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axiosConfig';
import { FiUser, FiMail, FiLock, FiShield, FiEye, FiEyeOff, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || '/roommates';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password');
  const selectedRole = watch('role');

  const onSubmit = async (data) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        gender: data.gender,
        age: parseInt(data.age, 10),
        email: data.email,
        password: data.password,
        role: data.role,
      };

      await api.post('/auth/register', payload);
      toast.success('Registration successful! Please verify your email.');
      navigate('/verify-email', { state: { email: data.email, redirectTo } });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Registration failed');
      console.error("Registration Error", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="flex justify-center flex-col items-center gap-2">
          <img src="/logo.png" alt="SLIIT Nest" className="w-16 h-16 object-contain" />
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
          <p className="text-gray-500 text-sm">Join SLIIT Nest today</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl z-10">
        <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-blue-500/10 sm:rounded-2xl sm:px-10 border border-white/50 relative">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white/50`}
                    placeholder="John"
                    {...register('firstName', { 
                      required: 'First name is required',
                      maxLength: { value: 20, message: 'Max 20 characters' }
                    })}
                  />
                </div>
                {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white/50`}
                    placeholder="Doe"
                    {...register('lastName', { 
                      required: 'Last name is required',
                      maxLength: { value: 20, message: 'Max 20 characters' }
                    })}
                  />
                </div>
                {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white/50`}
                    placeholder="07xxxxxxxx"
                    {...register('phoneNumber', { 
                      required: 'Phone number is required',
                      pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' }
                    })}
                  />
                </div>
                {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <select
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.gender ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white/50 appearance-none`}
                    {...register('gender', { required: 'Please specify gender' })}
                  >
                    <option value="">Select gender...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_120px] gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white/50`}
                    placeholder="123 Main St"
                    {...register('address', { 
                      required: 'Address is required',
                      maxLength: { value: 50, message: 'Max 50 characters' }
                    })}
                  />
                </div>
                {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.age ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white/50`}
                    placeholder="18"
                    {...register('age', { 
                      required: 'Age is required',
                      valueAsNumber: true,
                      min: { value: 10, message: 'Age must be between 10 and 100' },
                      max: { value: 100, message: 'Age must be between 10 and 100' }
                    })}
                  />
                </div>
                {errors.age && <p className="mt-1 text-xs text-red-600">{errors.age.message}</p>}
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address {selectedRole === 'Student' || !selectedRole ? '(@sliit.lk / @my.sliit.lk)' : ''}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white/50`}
                  placeholder={selectedRole === 'Student' || !selectedRole ? 'you@my.sliit.lk' : 'you@example.com'}
                  {...register('email', { 
                    required: 'Email is required',
                    validate: (value) => {
                      if (selectedRole === 'Student' || !selectedRole) {
                        return /^[a-zA-Z0-9._%+-]+@(my\.)?sliit\.lk$/.test(value) || 'Only @sliit.lk or @my.sliit.lk emails are allowed for Students';
                      }
                      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Must be a valid email address';
                    }
                  })}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiShield className="text-gray-400" />
                </div>
                <select
                  className={`block w-full pl-10 pr-3 py-3 border ${errors.role ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white/50 appearance-none`}
                  {...register('role', { required: 'Please select a role' })}
                >
                  <option value="">Select a role...</option>
                  <option value="Student">Student</option>
                  <option value="Owner">Boarding Owner</option>
                </select>
              </div>
              {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white/50`}
                  placeholder="••••••••"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' }
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`block w-full pl-10 pr-10 py-3 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white/50`}
                  placeholder="••••••••"
                  {...register('confirmPassword', { 
                    required: 'Please confirm password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.02] transition-all"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <Link
              to="/login"
              state={{ redirectTo }}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
