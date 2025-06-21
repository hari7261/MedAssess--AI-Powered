"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, X, Shield, ExternalLink } from "lucide-react"

interface AlertData {
  title: string
  description: string
  precautions: string[]
  severity: "low" | "medium" | "high"
  learnMoreLink?: string
}

// Example alert data - replace with your actual data or API call
const currentAlert: AlertData = {
  title: "COVID-19 Alert",
  description:
    "There is an increased number of COVID-19 cases in your area. Please take necessary precautions to stay safe.",
  precautions: [
    "Wear a mask in crowded places",
    "Maintain social distancing",
    "Wash your hands frequently",
    "Get vaccinated if you haven't already",
  ],
  severity: "medium",
  learnMoreLink: "https://www.cdc.gov/coronavirus/2019-ncov/index.html",
}

export default function HealthAlertPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show popup when component mounts (page loads)
    setIsOpen(true)

    // Add event listener for page visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  // Handle visibility change to show popup when user returns to the site
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      setIsOpen(true)
    }
  }

  const closePopup = () => {
    setIsOpen(false)
  }

  // Get background color based on severity
  const getSeverityColor = (severity: AlertData["severity"]) => {
    switch (severity) {
      case "low":
        return "bg-blue-50 border-blue-200"
      case "medium":
        return "bg-amber-50 border-amber-200"
      case "high":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  // Get text color based on severity
  const getSeverityTextColor = (severity: AlertData["severity"]) => {
    switch (severity) {
      case "low":
        return "text-blue-700"
      case "medium":
        return "text-amber-700"
      case "high":
        return "text-red-700"
      default:
        return "text-gray-700"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div
        className={`relative w-full max-w-lg rounded-lg border ${getSeverityColor(currentAlert.severity)} shadow-lg overflow-hidden`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 flex items-center justify-between ${getSeverityTextColor(currentAlert.severity)} border-b border-current/20`}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <h2 className="font-bold text-lg">{currentAlert.title}</h2>
          </div>
          <button
            onClick={closePopup}
            className="rounded-full p-1 hover:bg-black/5 transition-colors"
            aria-label="Close alert"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 bg-white">
          <p className="text-gray-700 mb-4">{currentAlert.description}</p>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Recommended Precautions:
            </h3>
            <ul className="space-y-2">
              {currentAlert.precautions.map((precaution, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="inline-block h-5 w-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-600">{precaution}</span>
                </li>
              ))}
            </ul>
          </div>

          {currentAlert.learnMoreLink && (
            <a
              href={currentAlert.learnMoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-sm font-medium ${getSeverityTextColor(currentAlert.severity)} hover:underline`}
            >
              Learn more <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={closePopup}
            className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}

