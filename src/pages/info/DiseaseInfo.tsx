import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/ui/hero-section";
import { PlusCircle, MinusCircle, ExternalLink } from 'lucide-react';

const HealthConditionCard = ({ disease }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden mb-8 border-2 border-blue-50 hover:border-blue-200 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Image Section */}
      <div className="md:w-1/3 relative">
        <img
          src={disease.image}
          alt={disease.name}
          className="w-full h-64 md:h-full object-cover brightness-90 hover:brightness-110 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-blue-500/20 hover:bg-transparent transition-all duration-300"></div>
      </div>

      {/* Content Section */}
      <div className="md:w-2/3 p-6 space-y-4">
        <motion.h2
          className="text-3xl font-bold text-blue-800 mb-4 flex items-center justify-between"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {disease.name}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {expanded ? <MinusCircle /> : <PlusCircle />}
          </button>
        </motion.h2>

        {/* Collapsible Sections */}
        <div className="space-y-4 text-gray-700">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={expanded ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <section>
              <h3 className="font-semibold text-xl text-blue-700 mb-2">Overview</h3>
              <p>{disease.overview}</p>
            </section>

            <section className="mt-4">
              <h3 className="font-semibold text-xl text-blue-700 mb-2">Symptoms</h3>
              <ul className="list-disc list-inside space-y-1">
                {disease.symptoms.split(',').map((symptom, idx) => (
                  <li key={idx} className="text-gray-600">{symptom.trim()}</li>
                ))}
              </ul>
            </section>

            <section className="mt-4">
              <h3 className="font-semibold text-xl text-blue-700 mb-2">Causes</h3>
              <p>{disease.causes}</p>
            </section>

            <section className="mt-4">
              <h3 className="font-semibold text-xl text-blue-700 mb-2">Prevention</h3>
              <p>{disease.prevention}</p>
            </section>

            <section className="mt-4">
              <h3 className="font-semibold text-xl text-blue-700 mb-2">Treatment</h3>
              <p>{disease.treatment}</p>
            </section>

            <section className="mt-4">
              <h3 className="font-semibold text-xl text-blue-700 mb-2">FAQs</h3>
              {disease.faqs.map((faq, idx) => (
                <div key={idx} className="mb-2 bg-blue-50 p-3 rounded">
                  <p className="font-medium text-blue-900">{faq.question}</p>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </section>

            <section className="mt-4">
              <h3 className="font-semibold text-xl text-blue-700 mb-2">Resources</h3>
              <div className="space-y-2">
                {disease.resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="mr-2" size={16} />
                    {resource}
                  </a>
                ))}
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const HealthInformationPage = () => {
  const [healthConditions] = useState([
    {
      name: "Hypertension",
      overview: "High blood pressure increasing the risk of heart diseases.",
      symptoms: "Headaches, shortness of breath, nosebleeds.",
      causes: "Stress, high salt intake, obesity, genetics.",
      prevention: "Healthy diet, exercise, stress management.",
      treatment: "Lifestyle changes, antihypertensive medications.",
      faqs: [
        { question: "Is hypertension curable?", answer: "No, but it can be managed." },
        { question: "Can hypertension cause complications?", answer: "Yes, it can lead to heart disease and stroke." },
      ],
      resources: ["https://www.cdc.gov/bloodpressure/index.htm", "https://www.who.int/news-room/fact-sheets/detail/hypertension"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Diabetes",
      overview: "A chronic condition that affects blood sugar regulation.",
      symptoms: "Increased thirst, frequent urination, fatigue.",
      causes: "Insulin resistance, genetics, lifestyle factors.",
      prevention: "Healthy eating, regular exercise, maintaining a healthy weight.",
      treatment: "Insulin therapy, oral medications, lifestyle changes.",
      faqs: [
        { question: "Is diabetes reversible?", answer: "Type 2 diabetes can sometimes be managed or reversed with lifestyle changes." },
        { question: "Can diabetes lead to other health issues?", answer: "Yes, it can cause complications like kidney disease and vision problems." },
      ],
      resources: ["https://www.diabetes.org/", "https://www.who.int/health-topics/diabetes"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Asthma",
      overview: "A chronic condition causing airway inflammation and difficulty breathing.",
      symptoms: "Wheezing, shortness of breath, chest tightness.",
      causes: "Allergens, pollution, respiratory infections, genetics.",
      prevention: "Avoiding triggers, managing allergies, regular check-ups.",
      treatment: "Inhalers, corticosteroids, bronchodilators.",
      faqs: [
        { question: "Is asthma curable?", answer: "No, but it can be managed with proper treatment." },
        { question: "Can asthma worsen over time?", answer: "It can if not properly managed or treated." },
      ],
      resources: ["https://www.lung.org/lung-health-diseases/lung-disease-lookup/asthma", "https://www.who.int/news-room/fact-sheets/detail/asthma"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Stroke",
      overview: "A medical emergency where blood flow to the brain is disrupted.",
      symptoms: "Sudden weakness, trouble speaking, vision problems.",
      causes: "Blood clots, burst blood vessels in the brain.",
      prevention: "Controlling blood pressure, healthy diet, avoiding smoking.",
      treatment: "Clot-busting medications, surgery, physical therapy.",
      faqs: [
        { question: "Can stroke be prevented?", answer: "Yes, by managing risk factors like hypertension." },
        { question: "Is recovery possible after a stroke?", answer: "Yes, rehabilitation can help regain abilities." },
      ],
      resources: ["https://www.stroke.org/", "https://www.who.int/health-topics/cerebrovascular-disease"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "COPD (Chronic Obstructive Pulmonary Disease)",
      overview: "A group of lung diseases that block airflow.",
      symptoms: "Shortness of breath, chronic cough, wheezing.",
      causes: "Smoking, long-term exposure to irritants.",
      prevention: "Avoiding smoking, reducing exposure to pollutants.",
      treatment: "Bronchodilators, oxygen therapy, pulmonary rehabilitation.",
      faqs: [
        { question: "Is COPD curable?", answer: "No, but symptoms can be managed." },
        { question: "Can non-smokers get COPD?", answer: "Yes, due to exposure to other lung irritants." },
      ],
      resources: ["https://www.goldcopd.org/", "https://www.who.int/health-topics/chronic-obstructive-pulmonary-disease"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Heart Disease",
      overview: "A range of conditions affecting heart health.",
      symptoms: "Chest pain, shortness of breath, fatigue.",
      causes: "High cholesterol, smoking, obesity, genetics.",
      prevention: "Healthy diet, regular exercise, managing stress.",
      treatment: "Medications, lifestyle changes, surgery (if necessary).",
      faqs: [
        { question: "Can heart disease be reversed?", answer: "Some conditions can improve with lifestyle changes." },
        { question: "Are women at risk of heart disease?", answer: "Yes, it affects both men and women." },
      ],
      resources: ["https://www.heart.org/en", "https://www.who.int/health-topics/cardiovascular-diseases"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Cancer",
      overview: "Uncontrolled growth of abnormal cells in the body.",
      symptoms: "Unexplained weight loss, fatigue, lumps, persistent pain.",
      causes: "Genetics, lifestyle factors, environmental exposures.",
      prevention: "Avoiding tobacco, healthy diet, regular screenings.",
      treatment: "Surgery, chemotherapy, radiation therapy, immunotherapy.",
      faqs: [
        { question: "Is cancer always fatal?", answer: "No, many types are treatable if detected early." },
        { question: "Can lifestyle changes reduce cancer risk?", answer: "Yes, especially avoiding smoking and a poor diet." },
      ],
      resources: ["https://www.cancer.org/", "https://www.who.int/health-topics/cancer"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Arthritis",
      overview: "Inflammation of joints causing pain and stiffness.",
      symptoms: "Joint pain, swelling, reduced range of motion.",
      causes: "Aging, joint injury, autoimmune disorders.",
      prevention: "Maintaining a healthy weight, regular exercise.",
      treatment: "Pain relievers, anti-inflammatory medications, physical therapy.",
      faqs: [
        { question: "Is arthritis preventable?", answer: "Not entirely, but symptoms can be managed." },
        { question: "Can arthritis worsen over time?", answer: "Yes, without treatment it can progress." },
      ],
      resources: ["https://www.arthritis.org/", "https://www.who.int/health-topics/arthritis"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Obesity",
      overview: "Excess body fat increasing health risks.",
      symptoms: "Weight gain, difficulty with physical activity, fatigue.",
      causes: "Poor diet, lack of exercise, genetics.",
      prevention: "Healthy eating, regular exercise, maintaining a calorie balance.",
      treatment: "Dietary changes, exercise plans, medical interventions.",
      faqs: [
        { question: "Can obesity lead to other health conditions?", answer: "Yes, it increases the risk of diabetes, heart disease, and hypertension." },
        { question: "Is obesity genetic?", answer: "Genetics can play a role, but lifestyle is a key factor." },
      ],
      resources: ["https://www.cdc.gov/obesity/index.html", "https://www.who.int/health-topics/obesity"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Alzheimer's Disease",
      overview: "A progressive brain disorder affecting memory and thinking.",
      symptoms: "Memory loss, confusion, difficulty with problem-solving.",
      causes: "Age, genetics, brain cell damage.",
      prevention: "Regular mental and physical activity, healthy diet.",
      treatment: "Medications, cognitive therapy, supportive care.",
      faqs: [
        { question: "Is Alzheimer's curable?", answer: "No, but treatments can slow progression." },
        { question: "Can Alzheimer's be inherited?", answer: "Genetics can increase risk, but it's not directly inherited." },
      ],
      resources: ["https://www.alz.org/", "https://www.who.int/news-room/fact-sheets/detail/dementia"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Anxiety Disorders",
      overview: "Excessive fear or worry impacting daily life.",
      symptoms: "Restlessness, rapid heartbeat, difficulty concentrating.",
      causes: "Stress, trauma, genetics, brain chemistry.",
      prevention: "Stress management, regular exercise, therapy.",
      treatment: "Therapy, medications, relaxation techniques.",
      faqs: [
        { question: "Can anxiety disorders be cured?", answer: "No, but they can be effectively managed." },
        { question: "Are anxiety disorders common?", answer: "Yes, they are among the most common mental health conditions." },
      ],
      resources: ["https://www.nimh.nih.gov/health/topics/anxiety-disorders", "https://www.who.int/news-room/fact-sheets/detail/mental-health"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Depression",
      overview: "A mood disorder causing persistent feelings of sadness.",
      symptoms: "Loss of interest, fatigue, feelings of worthlessness.",
      causes: "Genetics, brain chemistry, life events.",
      prevention: "Seeking support, regular exercise, healthy lifestyle.",
      treatment: "Therapy, antidepressant medications, lifestyle changes.",
      faqs: [
        { question: "Is depression treatable?", answer: "Yes, most people recover with proper treatment." },
        { question: "Can depression occur without a clear cause?", answer: "Yes, it can be triggered by internal factors." },
      ],
      resources: ["https://www.nimh.nih.gov/health/topics/depression", "https://www.who.int/news-room/fact-sheets/detail/depression"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Migraine",
      overview: "A neurological condition causing intense headaches.",
      symptoms: "Throbbing pain, sensitivity to light and sound, nausea.",
      causes: "Stress, hormonal changes, certain foods, genetics.",
      prevention: "Avoiding triggers, stress management, maintaining a regular sleep schedule.",
      treatment: "Pain relievers, triptans, preventive medications.",
      faqs: [
        { question: "Are migraines hereditary?", answer: "Yes, they often run in families." },
        { question: "Can migraines be prevented?", answer: "Avoiding triggers can help reduce frequency." },
      ],
      resources: ["https://www.migraineresearchfoundation.org/", "https://www.who.int/news-room/fact-sheets/detail/headache-disorders"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Osteoporosis",
      overview: "A condition where bones become weak and brittle.",
      symptoms: "Back pain, loss of height, fractures.",
      causes: "Calcium deficiency, hormonal changes, aging.",
      prevention: "Adequate calcium and vitamin D, regular weight-bearing exercise.",
      treatment: "Calcium supplements, bone-strengthening medications, physical therapy.",
      faqs: [
        { question: "Is osteoporosis reversible?", answer: "No, but bone density can be improved with treatment." },
        { question: "Who is at risk for osteoporosis?", answer: "Postmenopausal women and older adults are at higher risk." },
      ],
      resources: ["https://www.nof.org/", "https://www.who.int/news-room/fact-sheets/detail/osteoporosis"],
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Allergies",
      overview: "Immune system reactions to specific substances.",
      symptoms: "Sneezing, itching, swelling, difficulty breathing.",
      causes: "Pollen, dust, certain foods, insect stings.",
      prevention: "Avoiding allergens, keeping environments clean.",
      treatment: "Antihistamines, nasal sprays, immunotherapy.",
      faqs: [
        { question: "Can allergies go away?", answer: "Some can improve over time, but others may persist." },
        { question: "Are allergies dangerous?", answer: "Some can cause severe reactions like anaphylaxis." },
      ],
      resources: ["https://www.aaaai.org/", "https://www.who.int/news-room/fact-sheets/detail/allergies"],
      image: "https://via.placeholder.com/150",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection
        title="Health Information and Resources"
        description="Comprehensive guide to understanding, preventing, and managing common diseases."
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {healthConditions.map((disease, index) => (
          <HealthConditionCard key={index} disease={disease} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HealthInformationPage;