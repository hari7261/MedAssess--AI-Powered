# 🏥 MedAssess - Healthcare Assessment & Information Platform

[![Made with hari7261](https://img.shields.io/badge/Made%20with-hari7261-ff69b4.svg)](https://hariompandit.me/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.11-blue.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green.svg)](https://supabase.io/)


## 🌟 Overview

MedAssess is an advanced healthcare platform designed to offer a comprehensive range of health assessment tools, facilitate connections with healthcare providers, and provide valuable medical resources. This report highlights the core features and technical implementations within the codebase.

---

## **Technical Architecture**

### **Frontend Framework**
- **Primary Framework**: React with TypeScript
- **Routing**: Utilizes React Router DOM (BrowserRouter, Routes, Route components)
- **Data Fetching**: Implemented via React Query (QueryClient, QueryClientProvider)
  - Configured with default options: no retries and no refetching on window focus
- **UI Components**: Custom UI components (Toaster, Sonner, TooltipProvider)

### **Authentication System**
- Implements protected routes using a `ProtectedRoute` component
- Secure login system accessible via the `/login` path
- All primary application routes are wrapped in the `ProtectedRoute` component
- **User Registration:** New user registration system
- **Medical Professional Access:**
  - Doctors directory and management
  - Hospitals directory and management

---

## **Application Features**

### **Health Assessment Tools**
MedAssess offers multiple disease-specific assessment tools, including:
- **Chronic Disease Assessments:**
  - Cancer (`/cancer-assessment`)
  - Diabetes (`/diabetes-assessment`)
  - Heart Disease (`/heart-assessment`)
- **Infectious Disease Assessments:**
  - Malaria (`/malaria-assessment`)
  - Dengue (`/dengue-assessment`)
  - COVID-19 (`/covid-assessment`)
  - Common Cold (`/cold-assessment`)
- **General Disease Information**

### **Healthcare Provider Connections**
- **Doctor Directory** (`/doctors`): Integrated with Supabase real-time database
- **Hospital Directory** (`/hospitals`): Integrated with Supabase real-time database
- **Appointment Scheduling** (`/appointments`): Utilizes Web3Form API for secure doctor-patient interactions

### **AI and Communication Tools**
MedAssess incorporates AI-driven functionalities:
- **General AI Chat** (`/ChatWithAI`): Provides medical recommendations and information
- **Advanced GPT Interface** (`/AdvancedGPT`): Uses a Gemini API, trained specifically for healthcare-related queries
- **ExcelChatBot (ClgGPT)**: Specialized chatbot for medical-related data
- **Integrated Chatbot Widget**
- **Video Chat Functionality**
- **Embedded Third-Party Chatbot** (Chatbase.co)
  - **Integration**: iframe-based implementation
  - **Chat URL**: [Chatbase Bot](https://www.chatbase.co/chatbot-iframe/FyxC_onseWv71CeYviSkg)
  - **User Interface**:
    - Floating chat button (💬) positioned at the bottom-right
    - Expandable chat window with smooth animation
    - Chatbot is disabled on authentication pages

### **Appointment Management**
- **Booking and Managing Appointments**

### **Health Information Resources**
- **About Section**
- **Overview**
- **FAQ Section** (`/faq`): Provides clarity on common queries
- **Contact Information**
- **Services Overview**
- **News & Events** (`/news-events`): Platform updates and healthcare news
- **Disease Information Pages** (`/disease-info`): Comprehensive educational content
- **Government Health Schemes** (`/GovtHealthSchemes`): Secure access to central government healthcare programs
- **State-Specific Health Schemes** (`/StateSchemes`): State-level health initiatives and policies

### **Government and Financial Services**
- **Insurance Options** (`/insurance`)
- **Payment Processing** (`/payment`): Supports both online transactions and in-person payments

### **Legal Information**
- **Terms and Conditions**

---

## **User Interface Design**
- Fully responsive and user-friendly layout
- Floating chatbot with toggle functionality
- **Chatbot UI Specifications:**
  - Circular chat button (60px × 60px) with a blue background (#007BFF)
  - Sliding animation for the chat window
  - Expandable iframe (300px × 400px)

---

## **Code Structure Observations**
- Well-organized page components with dedicated files
- Some redundant route definitions (`/appointments`, `/payment`)
- React’s `useState` hook manages UI states (e.g., chatbot visibility)
- Implements `useLocation` hook for location-aware functionalities

---

## **Security Implementations**
- **Route Protection:** Authentication-based security using `ProtectedRoute`
- **Data Privacy:**
  - User and doctor-related data are not stored in the platform’s database
  - Appointments are directly sent to the selected doctor via **Doctor-Specific Appointment Routing Algorithm**
  - Unique Web3Forms API key for each doctor ensures secure form submissions
- **Chatbot Security Measures:**
  - Restricted keywords and phrase filtering to prevent misuse
- **Data Security Protocols:**
  - AES-256 encryption for stored data
  - TLS/SSL encryption for data transmission
  - bcrypt or Argon2 for password hashing
- **Additional Security Layers:**
  - Role-Based Access Control (RBAC)
  - Multi-Factor Authentication (MFA)
  - Audit logging for data access
  - Tokenization of sensitive identifiers
- **Compliance Measures:**
  - HIPAA compliance mechanisms (for U.S. healthcare systems)
  - Automated session timeouts
  - IP restrictions for administrative access

### **Doctor Verification Process**
- Medical professionals must undergo verification before joining the platform
- Document validation is mandatory
- External links are not allowed—Google Drive links are required for secure document uploads

### **Insurance Security & Trust**
- MedAssess acts as a **secure bridge** between insurance providers and users
- All insurance-related data and links are verified for authenticity

---

## **Third-Party Integrations**
- **Chatbase.co**: Embedded chatbot functionality
- **React Query**: Optimized data fetching and state management

---

## **Conclusion**
MedAssess is a robust healthcare platform that combines cutting-edge AI-driven assessments, secure provider connections, and essential medical resources. With its strong security measures, responsive UI, and future-ready payment integrations, the platform ensures a reliable and efficient user experience. Further refinements, including optimization of routing structures and third-party API enhancements, will continue to enhance its overall functionality.

