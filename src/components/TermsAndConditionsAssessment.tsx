import React, { useState } from "react";
import {
    Shield,
    AlertCircle,
    LockIcon,
    FileText,
} from "lucide-react";

interface TermsAndConditionsAssessmentProps {
    onAcceptTerms: () => void; // Callback when terms are accepted
}

const TermsAndConditionsAssessment: React.FC<TermsAndConditionsAssessmentProps> = ({ onAcceptTerms }) => {
    const [isConsentChecked, setIsConsentChecked] = useState(false);

    const handleConsentSubmit = () => {
        if (isConsentChecked) {
            onAcceptTerms(); // Notify parent component that terms are accepted
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl max-w-2xl w-full mx-4">
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    Terms and Conditions Consent
                </h2>

                <div className="max-h-96 overflow-y-auto mb-6 pr-4">
                    <div className="mb-4 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">
                            Platform Purpose
                        </h3>
                        <p className="text-gray-700">
                            <strong className="text-red-500">Critical Notice:</strong> Digital health assessment platform for self-evaluation. <strong className="text-red-500">NOT A MEDICAL DIAGNOSIS REPLACEMENT.</strong>
                        </p>
                    </div>
                    <div className="mb-4 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">
                            Risk Acknowledgment
                        </h3>
                        <p className="text-gray-700">
                            <strong className="text-red-500">Mandatory User Agreement:</strong><br />
                            - Immediate doctor consultation for moderate/high-risk assessments<br />
                            - Platform results are <strong className="text-red-500">NOT 100% DIAGNOSTIC</strong>
                        </p>
                    </div>
                    <div className="mb-4 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">
                            Data Privacy
                        </h3>
                        <p className="text-gray-700">
                            <strong className="text-red-500">Privacy Commitment:</strong><br />
                            - End-to-end data encryption<br />
                            - Strict confidentiality protocols<br />
                            - No unauthorized data sharing
                        </p>
                    </div>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="consentCheckbox"
                        checked={isConsentChecked}
                        onChange={() => setIsConsentChecked(!isConsentChecked)}
                        className="mr-2"
                    />
                    <label
                        htmlFor="consentCheckbox"
                        className="text-gray-700"
                    >
                        I have read and agree to the Terms and Conditions
                    </label>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleConsentSubmit}
                        disabled={!isConsentChecked}
                        className={`
                            px-6 py-2 rounded-lg 
                            ${isConsentChecked
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }
                        `}
                    >
                        Accept Terms
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditionsAssessment;