// "use client"

// import { useState, useEffect } from "react"
// import { AlertTriangle, X, Shield, Calendar, Thermometer, Wind, Snowflake, AlertCircle, Bell } from "lucide-react"

// // Define seasons and their corresponding months in India
// const SEASONS = {
//   SPRING: { name: "Spring", months: [2, 3, 4], icon: Wind, color: "green" }, // March-May
//   SUMMER: { name: "Summer", months: [5, 6, 7], icon: Thermometer, color: "amber" }, // June-August
//   AUTUMN: { name: "Autumn", months: [8, 9, 10], icon: Wind, color: "orange" }, // September-November
//   WINTER: { name: "Winter", months: [11, 0, 1], icon: Snowflake, color: "blue" }, // December-February
// }

// // Seasonal disease data
// const SEASONAL_DISEASES = {
//   SPRING: {
//     risks: ["Allergies", "Asthma", "Common Cold", "Chickenpox", "Measles", "Mumps", "Typhoid"],
//     precautions: [
//       "Wear masks when outdoors",
//       "Avoid pollen exposure during peak hours",
//       "Boost immunity with vitamin C-rich foods",
//       "Stay hydrated and maintain personal hygiene",
//       "Get vaccinated for seasonal diseases",
//       "Use air purifiers indoors if possible",
//       "Consult doctor if you have persistent allergic symptoms",
//     ],
//   },
//   SUMMER: {
//     risks: [
//       "Dehydration",
//       "Heatstroke",
//       "Food Poisoning",
//       "Malaria",
//       "Dengue",
//       "Chikungunya",
//       "Typhoid",
//       "Jaundice",
//       "Cholera",
//     ],
//     precautions: [
//       "Stay hydrated with water and electrolyte solutions",
//       "Avoid exposure to direct sunlight between 11am-4pm",
//       "Use mosquito repellents and nets",
//       "Avoid stagnant water around your home",
//       "Consume fresh, properly cooked food",
//       "Wash fruits and vegetables thoroughly",
//       "Wear light, breathable clothing",
//     ],
//   },
//   AUTUMN: {
//     risks: [
//       "Flu",
//       "Pneumonia",
//       "Asthma",
//       "Joint Pain",
//       "Viral Fever",
//       "Dengue",
//       "Leptospirosis",
//       "Respiratory infections",
//     ],
//     precautions: [
//       "Get vaccinated against seasonal flu",
//       "Maintain good hand hygiene",
//       "Keep warm during temperature fluctuations",
//       "Avoid crowded places during flu outbreaks",
//       "Strengthen immunity with balanced diet",
//       "Stay dry during rainy days",
//       "Seek medical attention for persistent fever",
//     ],
//   },
//   WINTER: {
//     risks: [
//       "Cold",
//       "Flu",
//       "Heart Issues",
//       "Bronchitis",
//       "Skin Dryness",
//       "Pneumonia",
//       "Joint pain and arthritis flare-ups",
//       "Hypothermia in extreme cold regions",
//     ],
//     precautions: [
//       "Dress warmly in layers, especially covering extremities",
//       "Take vitamin D supplements due to reduced sunlight",
//       "Stay indoors during extreme cold waves",
//       "Keep skin moisturized to prevent dryness and cracking",
//       "Maintain indoor humidity levels",
//       "Exercise regularly to improve circulation",
//       "Get flu vaccination if not already done",
//     ],
//   },
// }

// // Breaking health alerts data
// const BREAKING_ALERTS = [
//   {
//     id: 1,
//     title: "Human Metapneumovirus (HMPV) Outbreak",
//     period: "Jan-Feb 2025",
//     description: "Affects children & elderly, causing severe respiratory issues.",
//     precautions: "Wear masks, maintain hygiene, and seek medical help if breathing difficulties arise.",
//     severity: "high",
//     isNew: true,
//   },
//   {
//     id: 2,
//     title: "Mysterious Brain Disease in Jammu & Kashmir",
//     period: "Dec 2024 - Ongoing",
//     description: "Fatal cases reported, possibly linked to contaminated water.",
//     precautions: "Avoid spring water and report unusual neurological symptoms immediately.",
//     severity: "high",
//     isNew: true,
//   },
//   {
//     id: 3,
//     title: "Leprosy Cases Resurgence",
//     period: "Ongoing",
//     description: "Still prevalent in some regions, causing nerve damage if untreated.",
//     precautions: "Early diagnosis & treatment can prevent severe complications.",
//     severity: "medium",
//     isNew: false,
//   },
// ]

// export default function SeasonalDiseaseAlert() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [currentSeason, setCurrentSeason] = useState<keyof typeof SEASONAL_DISEASES>("SPRING")
//   const [activeTab, setActiveTab] = useState<"seasonal" | "breaking">("seasonal")

//   useEffect(() => {
//     // Determine current season based on current month
//     const determineCurrentSeason = () => {
//       const currentMonth = new Date().getMonth() // 0-11

//       for (const [season, data] of Object.entries(SEASONS)) {
//         if (data.months.includes(currentMonth)) {
//           return season as keyof typeof SEASONAL_DISEASES
//         }
//       }

//       return "SPRING" // Default fallback
//     }

//     setCurrentSeason(determineCurrentSeason())

//     // Show popup when component mounts (page loads)
//     setIsOpen(true)

//     // Add event listener for page visibility changes
//     document.addEventListener("visibilitychange", handleVisibilityChange)

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange)
//     }
//   }, [])

//   // Handle visibility change to show popup when user returns to the site
//   const handleVisibilityChange = () => {
//     if (document.visibilityState === "visible") {
//       setIsOpen(true)
//     }
//   }

//   const closePopup = () => {
//     setIsOpen(false)
//   }

//   // Get current season data
//   const getCurrentSeasonData = () => {
//     const seasonKey = currentSeason
//     return {
//       name: SEASONS[seasonKey].name,
//       icon: SEASONS[seasonKey].icon,
//       color: SEASONS[seasonKey].color,
//       risks: SEASONAL_DISEASES[seasonKey].risks,
//       precautions: SEASONAL_DISEASES[seasonKey].precautions,
//     }
//   }

//   // Get color classes based on season or severity
//   const getColorClasses = (type: "bg" | "text" | "border", value: string) => {
//     const colorMap: Record<string, Record<string, string>> = {
//       green: {
//         bg: "bg-green-50",
//         text: "text-green-700",
//         border: "border-green-200",
//       },
//       amber: {
//         bg: "bg-amber-50",
//         text: "text-amber-700",
//         border: "border-amber-200",
//       },
//       orange: {
//         bg: "bg-orange-50",
//         text: "text-orange-700",
//         border: "border-orange-200",
//       },
//       blue: {
//         bg: "bg-blue-50",
//         text: "text-blue-700",
//         border: "border-blue-200",
//       },
//       red: {
//         bg: "bg-red-50",
//         text: "text-red-700",
//         border: "border-red-200",
//       },
//       high: {
//         bg: "bg-red-50",
//         text: "text-red-700",
//         border: "border-red-200",
//       },
//       medium: {
//         bg: "bg-amber-50",
//         text: "text-amber-700",
//         border: "border-amber-200",
//       },
//       low: {
//         bg: "bg-blue-50",
//         text: "text-blue-700",
//         border: "border-blue-200",
//       },
//     }

//     return colorMap[value]?.[type] || colorMap.blue[type]
//   }

//   const currentSeasonData = getCurrentSeasonData()
//   const SeasonIcon = currentSeasonData.icon

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
//       <div className="relative w-full max-w-2xl rounded-lg border bg-white shadow-lg overflow-hidden">
//         {/* Header */}
//         <div
//           className={`px-6 py-4 flex items-center justify-between ${getColorClasses("text", currentSeasonData.color)} ${getColorClasses("bg", currentSeasonData.color)} border-b ${getColorClasses("border", currentSeasonData.color)}`}
//         >
//           <div className="flex items-center gap-2">
//             <AlertTriangle className="h-5 w-5" />
//             <h2 className="font-bold text-lg">Stay Safe! Seasonal & Trending Disease Alerts</h2>
//           </div>
//           <button
//             onClick={closePopup}
//             className="rounded-full p-1 hover:bg-black/5 transition-colors"
//             aria-label="Close alert"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b">
//           <button
//             className={`flex-1 py-2.5 px-4 text-sm font-medium ${activeTab === "seasonal" ? `${getColorClasses("text", currentSeasonData.color)} border-b-2 ${getColorClasses("border", currentSeasonData.color)}` : "text-gray-500"}`}
//             onClick={() => setActiveTab("seasonal")}
//           >
//             <div className="flex items-center justify-center gap-2">
//               <Calendar className="h-4 w-4" />
//               Seasonal Diseases
//             </div>
//           </button>
//           <button
//             className={`flex-1 py-2.5 px-4 text-sm font-medium ${activeTab === "breaking" ? "text-red-600 border-b-2 border-red-500" : "text-gray-500"}`}
//             onClick={() => setActiveTab("breaking")}
//           >
//             <div className="flex items-center justify-center gap-2">
//               <Bell className="h-4 w-4" />
//               Breaking Alerts
//               <span className="flex h-2 w-2 relative">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
//               </span>
//             </div>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="max-h-[60vh] overflow-y-auto">
//           {activeTab === "seasonal" ? (
//             <div className="p-6">
//               {/* Current Season */}
//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-3">
//                   <SeasonIcon className={`h-5 w-5 ${getColorClasses("text", currentSeasonData.color)}`} />
//                   <h3 className={`font-bold text-lg ${getColorClasses("text", currentSeasonData.color)}`}>
//                     Current Season: {currentSeasonData.name} ({getSeasonMonths(currentSeason)})
//                   </h3>
//                 </div>

//                 <div
//                   className={`p-4 rounded-lg ${getColorClasses("bg", currentSeasonData.color)} ${getColorClasses("border", currentSeasonData.color)} border mb-4`}
//                 >
//                   <h4 className="font-semibold mb-2">🔹 High Risk Diseases:</h4>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {currentSeasonData.risks.map((risk, index) => (
//                       <span
//                         key={index}
//                         className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClasses("bg", "white")} ${getColorClasses("text", currentSeasonData.color)} border ${getColorClasses("border", currentSeasonData.color)}`}
//                       >
//                         {risk}
//                       </span>
//                     ))}
//                   </div>

//                   <h4 className="font-semibold mb-2">🔹 Recommended Precautions:</h4>
//                   <ul className="space-y-1.5 text-sm">
//                     {currentSeasonData.precautions.map((precaution, index) => (
//                       <li key={index} className="flex items-start gap-2">
//                         <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
//                         <span>{precaution}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Other Seasons (Collapsed) */}
//               <div className="space-y-3">
//                 <h3 className="font-semibold text-gray-700">Other Seasons:</h3>
//                 {Object.entries(SEASONS).map(([season, data]) => {
//                   if (season === currentSeason) return null
//                   return (
//                     <details key={season} className="group">
//                       <summary
//                         className={`flex cursor-pointer items-center justify-between rounded-lg ${getColorClasses("bg", data.color)} px-4 py-2 text-sm font-medium`}
//                       >
//                         <div className="flex items-center gap-2">
//                           <data.icon className="h-4 w-4" />
//                           <span>
//                             {data.name} ({getSeasonMonths(season as keyof typeof SEASONAL_DISEASES)})
//                           </span>
//                         </div>
//                       </summary>
//                       <div className="mt-2 px-4 pb-2 pt-1 text-sm">
//                         <div className="mb-2">
//                           <h4 className="font-medium mb-1">High Risk Diseases:</h4>
//                           <div className="flex flex-wrap gap-1.5">
//                             {SEASONAL_DISEASES[season as keyof typeof SEASONAL_DISEASES].risks.map((risk, index) => (
//                               <span key={index} className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
//                                 {risk}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                         <div>
//                           <h4 className="font-medium mb-1">Precautions:</h4>
//                           <ul className="space-y-1 text-xs text-gray-600">
//                             {SEASONAL_DISEASES[season as keyof typeof SEASONAL_DISEASES].precautions.map(
//                               (precaution, index) => (
//                                 <li key={index} className="flex items-start gap-1.5">
//                                   <Shield className="h-3 w-3 mt-0.5 flex-shrink-0" />
//                                   <span>{precaution}</span>
//                                 </li>
//                               ),
//                             )}
//                           </ul>
//                         </div>
//                       </div>
//                     </details>
//                   )
//                 })}
//               </div>
//             </div>
//           ) : (
//             <div className="p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <AlertCircle className="h-5 w-5 text-red-600" />
//                 <h3 className="font-bold text-lg text-red-600">Breaking Health Alerts</h3>
//               </div>

//               <div className="space-y-4">
//                 {BREAKING_ALERTS.map((alert) => (
//                   <div
//                     key={alert.id}
//                     className={`p-4 rounded-lg ${getColorClasses("bg", alert.severity)} border ${getColorClasses("border", alert.severity)} relative overflow-hidden`}
//                   >
//                     {alert.isNew && (
//                       <div className="absolute top-0 right-0">
//                         <div className="bg-red-500 text-white text-xs px-2 py-0.5 font-bold transform rotate-12 translate-x-2 -translate-y-1">
//                           NEW
//                         </div>
//                       </div>
//                     )}

//                     <div className="flex justify-between items-start mb-2">
//                       <h4 className={`font-bold ${getColorClasses("text", alert.severity)}`}>{alert.title}</h4>
//                       <span className="text-xs bg-white px-2 py-0.5 rounded-full border">{alert.period}</span>
//                     </div>

//                     <p className="text-gray-700 mb-3 text-sm">{alert.description}</p>

//                     <div className="bg-white p-3 rounded border text-sm">
//                       <span className="font-medium">Stay Safe:</span> {alert.precautions}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
//           <div className="text-xs text-gray-500">
//             Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
//           </div>
//           <button
//             onClick={closePopup}
//             className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             Dismiss
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Helper function to get month names for a season
// function getSeasonMonths(season: keyof typeof SEASONAL_DISEASES): string {
//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ]
//   const months = SEASONS[season].months.map((m) => monthNames[m])

//   if (season === "WINTER") {
//     return `${months[0]}-${months[2]}`
//   }

//   return `${months[0]}-${months[2]}`
// }

