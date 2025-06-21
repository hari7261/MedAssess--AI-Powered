import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Register: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formError, setFormError] = useState('');
  const [urlErrors, setUrlErrors] = useState({ photo_id_url: '', medical_license_url: '' });
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    role: '',
    registration_number: '',
    years_of_experience: '',
    institution: '',
    specialization: '',
    graduation_date: '',
    registration_date: '',
    hospital_address: '',
    agree_to_verification: false,
    photo_id_url: '',
    medical_license_url: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Validate Google Drive URLs in real-time
    if (name === 'photo_id_url' || name === 'medical_license_url') {
      validateDriveUrl(name, value);
    }
  };

  // Regex to validate Google Drive URL
  const driveUrlPattern = /^https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)[a-zA-Z0-9_-]+/;

  const validateDriveUrl = (field: string, url: string) => {
    if (!url) {
      setUrlErrors(prev => ({ ...prev, [field]: 'This field is required' }));
    } else if (!driveUrlPattern.test(url)) {
      setUrlErrors(prev => ({ 
        ...prev, 
        [field]: 'Please provide a valid Google Drive link (e.g., https://drive.google.com/file/d/...)'
      }));
    } else {
      setUrlErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    if (parseInt(formData.years_of_experience) < 2) {
      setFormError('You must have at least 2 years of experience to register');
      return false;
    }
    
    if (!formData.agree_to_verification) {
      setFormError('You must agree to the verification process');
      return false;
    }

    // Check URL validity before submission
    if (!driveUrlPattern.test(formData.photo_id_url) || !driveUrlPattern.test(formData.medical_license_url)) {
      setFormError('Please provide valid Google Drive links for both Photo ID and Medical License');
      return false;
    }

    setFormError('');
    return true;
  };

  const nextStep = () => {
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      const submissionData = new FormData();
      submissionData.append('access_key', '4e87fc6a-57b0-4dc7-aba8-cc3aa7bb4ab6');
      Object.keys(formData).forEach(key => {
        submissionData.append(key, String(formData[key]));
      });
      submissionData.append('from_name', "MedAssist Doctor or Staff Registration");
      submissionData.append('subject', "New Doctor Or Staff Registration Request");

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submissionData,
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          role: '',
          registration_number: '',
          years_of_experience: '',
          institution: '',
          specialization: '',
          graduation_date: '',
          registration_date: '',
          hospital_address: '',
          agree_to_verification: false,
          photo_id_url: '',
          medical_license_url: ''
        });
        setFormStep(1);
        setUrlErrors({ photo_id_url: '', medical_license_url: '' });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error("Error:", error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const timelineSteps = [
    { title: 'Registration', description: 'Complete and submit the registration form with your details', icon: '📝' },
    { title: 'Manual Verification', description: 'Our team reviews your submitted information', icon: '👁️' },
    { title: 'Document Verification', description: 'We verify your credentials with the relevant institutions', icon: '📄' },
    { title: 'Qualification Approval', description: 'Your profile is approved and added to our platform', icon: '✅' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <section className="py-10 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-green-800 mb-8">Verification Process</h2>
          <div className="flex flex-col md:flex-row justify-between items-start max-w-4xl mx-auto">
            {timelineSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center mb-6 md:mb-0 w-full md:w-1/4 px-2"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-3">
                  {step.icon}
                </div>
                <div className="h-1 bg-green-500 w-full my-2 hidden md:block"></div>
                <h3 className="text-lg font-semibold text-green-700 mb-1 mt-2">{step.title}</h3>
                <p className="text-sm text-gray-600 text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 bg-blue-50 p-4 rounded-lg max-w-2xl mx-auto">
            <p className="text-gray-700">
              <span className="font-bold text-blue-800">Note:</span> We require a minimum of 2 years of professional experience. 
              All credentials will be verified with the institutions and organizations provided.
            </p>
          </div>
        </div>
      </section>

      <section id="register" className="py-16 bg-white">
        <div className="container mx-auto px-4 py-10">
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Healthcare Professional Registration</h2>
            <p className="text-gray-600 mb-8 text-center">Join our network of qualified medical professionals</p>
            
            {formError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 text-center">
                {formError}
              </div>
            )}

            <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg mb-6">
              <p className="text-sm">
                <span className="font-bold">Important:</span> Provide Google Drive URLs to your Photo ID and Medical License. 
                Ensure the links are publicly accessible and start with "https://drive.google.com/". 
                Only JPG, PNG, or PDF formats are accepted.
              </p>
            </div>

            <div className="flex justify-center mb-8">
              {[1, 2, 3].map((step) => (
                <div 
                  key={step}
                  className={`w-3 h-3 mx-1 rounded-full ${formStep === step ? 'bg-green-600' : 'bg-gray-300'}`} 
                />
              ))}
            </div>
            
            {formStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-semibold text-green-800 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      placeholder="Dr. John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="doctor@hospital.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Role *</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    >
                      <option value="">Select your role</option>
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="medical_technician">Medical Technician</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="administrative_staff">Administrative Staff</option>
                    </select>
                  </motion.div>
                  <div className="flex justify-end mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                    >
                      Next Step
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {formStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-semibold text-green-800 mb-4">Professional Information</h3>
                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Registration/License Number *</label>
                    <input
                      type="text"
                      name="registration_number"
                      value={formData.registration_number}
                      onChange={handleChange}
                      required
                      placeholder="MD12345678"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience *</label>
                    <input
                      type="number"
                      name="years_of_experience"
                      value={formData.years_of_experience}
                      onChange={handleChange}
                      required
                      min="2"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                    <p className="text-sm text-gray-500 mt-1">Minimum 2 years required</p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization *</label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      required
                      placeholder="Cardiology, Pediatrics, General Practice, etc."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Institution/Hospital *</label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                      placeholder="City General Hospital"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>
                  <div className="flex justify-between mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition"
                    >
                      Previous
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                    >
                      Next Step
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {formStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-semibold text-green-800 mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hospital/Clinic Address *</label>
                    <textarea
                      name="hospital_address"
                      value={formData.hospital_address}
                      onChange={handleChange}
                      required
                      placeholder="Full address of your primary practice"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      rows={3}
                    ></textarea>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Graduation Date *</label>
                    <input
                      type="date"
                      name="graduation_date"
                      value={formData.graduation_date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Date *</label>
                    <input
                      type="date"
                      name="registration_date"
                      value={formData.registration_date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Photo ID Google Drive URL *</label>
                    <input
                      type="url"
                      name="photo_id_url"
                      value={formData.photo_id_url}
                      onChange={handleChange}
                      required
                      placeholder="https://drive.google.com/file/d/..."
                      className={`w-full px-4 py-3 rounded-lg border ${urlErrors.photo_id_url ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                    />
                    {urlErrors.photo_id_url ? (
                      <p className="text-xs text-red-500 mt-1">{urlErrors.photo_id_url}</p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">Provide a public Google Drive link to your government-issued ID</p>
                    )}
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Medical License Google Drive URL *</label>
                    <input
                      type="url"
                      name="medical_license_url"
                      value={formData.medical_license_url}
                      onChange={handleChange}
                      required
                      placeholder="https://drive.google.com/file/d/..."
                      className={`w-full px-4 py-3 rounded-lg border ${urlErrors.medical_license_url ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                    />
                    {urlErrors.medical_license_url ? (
                      <p className="text-xs text-red-500 mt-1">{urlErrors.medical_license_url}</p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">Provide a public Google Drive link to your professional license</p>
                    )}
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} className="form-group mt-4">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agree_to_verification"
                        checked={formData.agree_to_verification}
                        onChange={(e) => setFormData({
                          ...formData,
                          agree_to_verification: e.target.checked
                        })}
                        required
                        className="mt-1 mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the verification process and confirm that all information provided is accurate. 
                        I understand that my credentials will be verified with the institutions listed.
                      </span>
                    </label>
                  </motion.div>
                  <div className="flex justify-between mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition"
                    >
                      Previous
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading || !!urlErrors.photo_id_url || !!urlErrors.medical_license_url}
                      className={`px-8 py-3 rounded-lg text-white font-semibold transition
                        ${(isLoading || urlErrors.photo_id_url || urlErrors.medical_license_url) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
                      `}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </span>
                      ) : 'Submit Application'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.form>
        </div>
      </section>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100 }}
              animate={{ 
                scale: 1, 
                y: 0,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                } 
              }}
              exit={{ scale: 0.5, y: 100 }}
              className="bg-white rounded-xl p-8 max-w-md m-4 text-center relative overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-green-800 mb-4"
              >
                Application Submitted!
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-gray-600 mb-6">
                  Thank you for registering with MedAssist. We'll review your information and verify your credentials with the relevant institutions.
                </p>
                <p className="text-gray-600 font-semibold mb-6">
                  You'll receive an email notification once your verification is complete.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg mb-6">
                  <p className="text-blue-800 text-sm">
                    Verification typically takes 3-5 business days.
                  </p>
                </div>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition shadow-md"
                >
                  Close
                </button>
              </motion.div>
              <div className="absolute -top-6 -right-6 text-4xl rotate-12 opacity-10">💉</div>
              <div className="absolute -bottom-6 -left-6 text-4xl -rotate-12 opacity-10">🩺</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Register;