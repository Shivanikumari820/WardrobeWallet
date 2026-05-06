import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import PersonalInfo from '../components/schedule/PersonalInfo';
import AddressInfo from '../components/schedule/AddressInfo';
import ScheduleDetails from '../components/schedule/ScheduleDetails';
import SuccessMessage from '../components/schedule/SuccessMessage';
import Hero from '../components/schedule/Hero';
import SectionHeader from '../components/ui/SectionHeader';
import { showErrorToast } from '../utils/toast';

const SchedulePage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        pincode: '',
        date: '',
        timeSlot: '',
        clothTypes: [],
        estimatedQuantity: '',
        specialInstructions: ''
    });

    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClothTypeChange = (type) => {
        setFormData(prev => ({
            ...prev,
            clothTypes: prev.clothTypes.includes(type)
                ? prev.clothTypes.filter(t => t !== type)
                : [...prev.clothTypes, type]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = localStorage.getItem('user');
        if (!user) {
            showErrorToast('You are not login');
            navigate('/login');
            return;
        }
        try {
            const response = await fetch('https://cloth2cash.onrender.com/api/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setCurrentStep(4);
            } else {
                alert('Failed to schedule pickup');
            }
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            alert('Server error');
        }
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInfo formData={formData} handleInputChange={handleInputChange} />;
            case 2:
                return <AddressInfo formData={formData} handleInputChange={handleInputChange} />;
            case 3:
                return <ScheduleDetails
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleClothTypeChange={handleClothTypeChange}
                />;
            case 4:
                return <SuccessMessage formData={formData} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Hero />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 sm:py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto relative z-10">

                    <SectionHeader
                        subtitle="Schedule Now"
                        title="Book Your Pickup"
                        className="mb-6 sm:mb-8"
                    />

                    <div className="flex justify-center mb-6 sm:mb-8">
                        <div className="flex items-center space-x-2 sm:space-x-4 px-4">
                            {[1, 2, 3, 4].map((step) => (
                                <div key={step} className="flex items-center">
                                    <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 shadow-lg ${currentStep >= step
                                        ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-green-400/50 scale-110'
                                        : 'bg-white text-gray-400 border-2 border-gray-200'
                                        }`}>
                                        {step === 4 ? <CheckCircle size={16} className="sm:w-6 sm:h-6" /> : step}
                                    </div>
                                    {step < 4 && (
                                        <div className={`w-8 sm:w-16 h-1 sm:h-2 rounded-full transition-all duration-300 ${currentStep > step ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gray-200'
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div id="schedule-form" className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8 relative overflow-hidden">

                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full translate-y-12 -translate-x-12"></div>

                        <form onSubmit={handleSubmit} className="relative z-10">
                            {renderStepContent()}


                            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 sm:mt-10">
                                {currentStep > 1 && currentStep < 4 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Previous
                                        </span>
                                    </button>
                                )}

                                {currentStep < 3 && (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="group w-full sm:w-auto sm:ml-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            Next
                                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </button>
                                )}

                                {currentStep === 3 && (
                                    <button
                                        type="submit"
                                        className="group w-full sm:w-auto sm:ml-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Schedule Pickup
                                        </span>
                                    </button>
                                )}

                                {currentStep === 4 && (
                                    <button
                                        type="button"
                                        onClick={() => window.location.href = '/'}
                                        className="group w-full sm:w-auto mx-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            Back to Home
                                        </span>
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SchedulePage;