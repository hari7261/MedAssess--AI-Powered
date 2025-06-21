import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  CheckIcon,
  Clock,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

// Form schema
const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  gender: z.string({ required_error: "Please select your gender" }),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Valid zip code is required" }),
  emergencyName: z.string().min(2, { message: "Emergency contact name is required" }),
  emergencyRelation: z.string().min(2, { message: "Relationship is required" }),
  emergencyPhone: z.string().min(10, { message: "Valid emergency phone is required" }),

  // Medical Information
  reasonForVisit: z.string().min(10, { message: "Please provide a reason for your visit" }),
  medicalHistory: z.string().optional(),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  groupNumber: z.string().optional(),

  // Appointment Details
  preferredDate: z.date({ required_error: "Preferred date is required" }),
  preferredTime: z.string({ required_error: "Please select a preferred time" }),
  appointmentType: z.string({ required_error: "Please select appointment type" }),
  doctor: z.string({ required_error: "Please select a doctor" }),
  department: z.string({ required_error: "Please select a department" }),

  // Additional Information
  preferredLanguage: z.string().default("English"),
  accessibilityNeeds: z.array(z.string()).optional(),
  referralInfo: z.string().optional(),

  // Terms and Conditions
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept terms and conditions" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface AppointmentFormProps {
  onSuccess: (data: any) => void;
}

// Doctor API key mapping
const DOCTOR_API_KEYS = {
"ADD HEERE API KEY OF THE DOCTORS."
};

// Doctor email mapping (for reference in form data)
const DOCTOR_EMAILS = {
  "dr-smith": "dr.smith@medassess.com",
  "dr-arulalan": "dr.arulalan@medassess.com",
  "dr-barani": "dr.barani@medassess.com",
  "dr-johnson": "dr.johnson@medassess.com",
  "dr-williams": "dr.williams@medassess.com",
  "no-preference": "appointments@medassess.com"
};

// Doctor specialization details
const DOCTOR_DETAILS = {
  "dr-smith": {
    name: "Dr. Smith",
    specialty: "Cardiology",
    fee: "₹500",
    preferredTimes: ["morning-early", "afternoon-early"],
    preferredAppointmentTypes: ["new-patient", "follow-up", "routine-checkup"],
    specialization: "Heart diseases, hypertension, and cardiac rehabilitation",
    department: "cardiology"
  },
  "dr-arulalan": {
    name: "Dr. Arulalan",
    specialty: "Neurology",
    fee: "₹8000",
    preferredTimes: ["afternoon-late", "evening"],
    preferredAppointmentTypes: ["consultation", "specialist"],
    specialization: "Brain disorders, stroke, and neurological conditions",
    department: "neurology"
  },
  "dr-barani": {
    name: "Dr. Barani",
    specialty: "Orthopedics",
    fee: "₹500",
    preferredTimes: ["morning-late", "afternoon-early"],
    preferredAppointmentTypes: ["specialist", "follow-up"],
    specialization: "Joint problems, bone fractures, and sports injuries",
    department: "orthopedics"
  },
  "dr-johnson": {
    name: "Dr. Johnson",
    specialty: "Dermatology",
    fee: "₹300",
    preferredTimes: ["morning-early", "afternoon-late"],
    preferredAppointmentTypes: ["new-patient", "routine-checkup"],
    specialization: "Skin conditions, allergies, and cosmetic dermatology",
    department: "dermatology"
  },
  "dr-williams": {
    name: "Dr. Williams",
    specialty: "Pediatrics",
    fee: "₹100",
    preferredTimes: ["morning-late", "evening"],
    preferredAppointmentTypes: ["new-patient", "emergency", "routine-checkup"],
    specialization: "Child healthcare, vaccinations, and developmental issues",
    department: "pediatrics"
  }
};

export function AppointmentForm({ onSuccess }: AppointmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const navigate = useNavigate(); // Add useNavigate hook

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      phone: "",
      emergencyName: "",
      emergencyRelation: "",
      emergencyPhone: "",
      reasonForVisit: "",
      medicalHistory: "",
      allergies: "",
      currentMedications: "",
      insuranceProvider: "",
      policyNumber: "",
      groupNumber: "",
      preferredLanguage: "English",
      accessibilityNeeds: [],
      referralInfo: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmissionError(null);
    
    try {
      // Get the selected doctor
      const selectedDoctor = data.doctor;
      
      // Get the appropriate API key based on the selected doctor
      const apiKey = DOCTOR_API_KEYS[selectedDoctor as keyof typeof DOCTOR_API_KEYS] || DOCTOR_API_KEYS.default;
      
      // Web3Forms API integration
      const formData = new FormData();
      formData.append("access_key", apiKey);
      
      // Add doctor email to form data for reference
      const doctorEmail = DOCTOR_EMAILS[selectedDoctor as keyof typeof DOCTOR_EMAILS] || "Unknown";
      formData.append("doctorEmail", doctorEmail);
      
      // Convert form data to API format
      Object.entries(data).forEach(([key, value]) => {
        if (key === "dateOfBirth" || key === "preferredDate") {
          formData.append(key, format(value as Date, "yyyy-MM-dd"));
        } else if (key === "accessibilityNeeds" && Array.isArray(value)) {
          formData.append(key, value.join(", "));
        } else {
          formData.append(key, String(value));
        }
      });

      // Add form identifier and customize subject based on selected doctor
      formData.append("from_name", "MedAssess Appointment System");
      
      // Customize subject based on appointment type and doctor
      const doctorName = selectedDoctor.replace("dr-", "Dr. ").replace("-", " ");
      const appointmentType = data.appointmentType.replace(/-/g, " ");
      const customSubject = `New ${appointmentType} Appointment Request for ${
        selectedDoctor === "no-preference" ? "Available Doctor" : doctorName
      }`;
      
      formData.append("subject", customSubject);

      // Send form data
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        // Navigate to payment page with appointment data
        navigate("/payment", { 
          state: { 
            appointmentData: {
              ...data,
              doctorEmail,
              doctorDetails: DOCTOR_DETAILS[selectedDoctor as keyof typeof DOCTOR_DETAILS],
              submissionTime: new Date().toISOString(),
            } 
          } 
        });
      } else {
        console.error("Form submission failed:", result);
        setSubmissionError("There was a problem submitting your form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionError("There was a problem connecting to our appointment system. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const accessibilityOptions = [
    { id: "wheelchair", label: "Wheelchair Access" },
    { id: "interpreter", label: "Sign Language Interpreter" },
    { id: "assistance", label: "Personal Assistance" },
    { id: "other", label: "Other Accessibility Needs" },
  ];

  return (
    <div className="medical-gradient p-6 rounded-xl shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information Section */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-6 flex items-center">
                <User className="mr-2 h-6 w-6" /> Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                          format(field.value, "PPP")
                          ) : (
                          <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-2 border-b flex justify-between items-center">
                        <Select
                          value={field.value ? field.value.getFullYear().toString() : new Date().getFullYear().toString()}
                          onValueChange={(year) => {
                          const newDate = new Date(field.value || new Date());
                          newDate.setFullYear(parseInt(year));
                          field.onChange(newDate);
                          }}
                        >
                          <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                          {Array.from({ length: 124 }, (_, i) => 
                            new Date().getFullYear() - i
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                            {year}
                            </SelectItem>
                          ))}
                          </SelectContent>
                        </Select>
                        
                        <Select
                          value={field.value ? (field.value.getMonth() + 1).toString() : (new Date().getMonth() + 1).toString()}
                          onValueChange={(month) => {
                          const newDate = new Date(field.value || new Date());
                          newDate.setMonth(parseInt(month) - 1);
                          field.onChange(newDate);
                          }}
                        >
                          <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                            <SelectItem key={month} value={month.toString()}>
                            {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
                            </SelectItem>
                          ))}
                          </SelectContent>
                        </Select>
                        </div>
                        <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Phone className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                          <Input placeholder="(123) 456-7890" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Mail className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                          <Input placeholder="your@email.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <MapPin className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                          <Input placeholder="123 Main St" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <h3 className="text-xl font-semibold text-green-600 mt-8 mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="emergencyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Emergency Contact Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="emergencyRelation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="Spouse, Parent, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="emergencyPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Medical Information */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-6">Medical Information</h2>
              
              <FormField
                control={form.control}
                name="reasonForVisit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Visit</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe the reason for your visit" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <FormField
                  control={form.control}
                  name="medicalHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical History</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Past illnesses, surgeries, or chronic conditions" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Include any past illnesses, surgeries, or chronic conditions.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allergies</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Medication, food, or environmental allergies" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        List any medication, food, or environmental allergies.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="currentMedications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Medications</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List all current medications, including dosage" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Include name, dosage, and frequency of all medications.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              
              <h3 className="text-xl font-semibold text-green-600 mt-8 mb-4">Insurance Information (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="insuranceProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Provider</FormLabel>
                      <FormControl>
                        <Input placeholder="Insurance Provider" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="policyNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Policy Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Policy Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="groupNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Group Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Appointment Details */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-6 flex items-center">
                <CalendarIcon className="mr-2 h-6 w-6" /> Appointment Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || // Can't select dates in the past
                              date > new Date(new Date().setMonth(new Date().getMonth() + 3)) // Can't select dates more than 3 months in the future
                            }
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="preferredTime"
                  render={({ field }) => {
                    // Get currently selected doctor
                    const selectedDoctor = form.getValues("doctor");
                    // Get available times for the selected doctor
                    const availableTimes = selectedDoctor && selectedDoctor !== "no-preference" && DOCTOR_DETAILS[selectedDoctor]
                      ? DOCTOR_DETAILS[selectedDoctor].preferredTimes
                      : ["morning-early", "morning-late", "afternoon-early", "afternoon-late", "evening"];
                    
                    return (
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                          disabled={!selectedDoctor}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                <SelectValue placeholder="Select time" />
                              </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTimes.includes("morning-early") && 
                              <SelectItem value="morning-early">Early Morning (8:00 AM - 10:00 AM)</SelectItem>
                            }
                            {availableTimes.includes("morning-late") && 
                              <SelectItem value="morning-late">Late Morning (10:00 AM - 12:00 PM)</SelectItem>
                            }
                            {availableTimes.includes("afternoon-early") && 
                              <SelectItem value="afternoon-early">Early Afternoon (12:00 PM - 2:00 PM)</SelectItem>
                            }
                            {availableTimes.includes("afternoon-late") && 
                              <SelectItem value="afternoon-late">Late Afternoon (2:00 PM - 4:00 PM)</SelectItem>
                            }
                            {availableTimes.includes("evening") && 
                              <SelectItem value="evening">Evening (4:00 PM - 6:00 PM)</SelectItem>
                            }
                          </SelectContent>
                        </Select>
                        {selectedDoctor ? (
                          availableTimes.length > 0 ? (
                            <FormDescription>
                              Please select from the available time slots.
                            </FormDescription>
                          ) : (
                            <FormDescription className="text-amber-600">
                              No time slots available for the selected doctor.
                            </FormDescription>
                          )
                        ) : (
                          <FormDescription className="text-amber-600">
                            Please select a doctor first to see available time slots.
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <FormField
                  control={form.control}
                  name="appointmentType"
                  render={({ field }) => {
                    // Get currently selected doctor
                    const selectedDoctor = form.getValues("doctor");
                    // Get available appointment types for the selected doctor
                    const availableTypes = selectedDoctor && selectedDoctor !== "no-preference" && DOCTOR_DETAILS[selectedDoctor]
                      ? DOCTOR_DETAILS[selectedDoctor].preferredAppointmentTypes
                      : ["new-patient", "follow-up", "consultation", "emergency", "routine-checkup", "specialist"];
                    
                    return (
                      <FormItem>
                        <FormLabel>Appointment Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                          disabled={!selectedDoctor}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTypes.includes("new-patient") && 
                              <SelectItem value="new-patient">New Patient Visit</SelectItem>
                            }
                            {availableTypes.includes("follow-up") && 
                              <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                            }
                            {availableTypes.includes("consultation") && 
                              <SelectItem value="consultation">Consultation</SelectItem>
                            }
                            {availableTypes.includes("emergency") && 
                              <SelectItem value="emergency">Emergency Visit</SelectItem>
                            }
                            {availableTypes.includes("routine-checkup") && 
                              <SelectItem value="routine-checkup">Routine Checkup</SelectItem>
                            }
                            {availableTypes.includes("specialist") && 
                              <SelectItem value="specialist">Specialist Appointment</SelectItem>
                            }
                          </SelectContent>
                        </Select>
                        {selectedDoctor ? (
                          <FormDescription>
                            Please select appointment type based on your needs.
                          </FormDescription>
                        ) : (
                          <FormDescription className="text-amber-600">
                            Please select a doctor first to see available appointment types.
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                
                <FormField
                  control={form.control}
                  name="doctor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Doctor & Consultant fee</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          
                          // When doctor is selected, automatically set the department
                          if (value !== "no-preference" && DOCTOR_DETAILS[value]) {
                            form.setValue("department", DOCTOR_DETAILS[value].department);
                            
                            // Reset the preferred time if the current selection isn't available for this doctor
                            const currentTime = form.getValues("preferredTime");
                            const doctorAvailableTimes = DOCTOR_DETAILS[value].preferredTimes || [];
                            
                            if (currentTime && !doctorAvailableTimes.includes(currentTime)) {
                              form.setValue("preferredTime", "");
                            }
                          }
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select doctor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="dr-smith">Dr. Smith (Cardiology) - ₹500 - Heart specialist</SelectItem>
                          <SelectItem value="dr-arulalan">Dr. Arulalan (Neurology) - ₹8000 - Brain & nervous system</SelectItem>
                          <SelectItem value="dr-barani">Dr. Barani (Orthopedics) - ₹500 - Bone & joint specialist</SelectItem>
                          <SelectItem value="dr-johnson">Dr. Johnson (Dermatology) - ₹300 - Skin conditions</SelectItem>
                          <SelectItem value="dr-williams">Dr. Williams (Pediatrics) - ₹100 - Child healthcare</SelectItem>
                          <SelectItem value="no-preference">No Preference</SelectItem>
                        </SelectContent>
                      </Select>
                      {field.value && field.value !== "no-preference" && DOCTOR_DETAILS[field.value] && (
                        <div className="mt-2 text-sm text-muted-foreground bg-slate-50 p-2 rounded-md">
                          <p><strong>Specializes in:</strong> {DOCTOR_DETAILS[field.value].specialization}</p>
                          <p><strong>Available times:</strong> {DOCTOR_DETAILS[field.value].preferredTimes.map(time => 
                            time === "morning-early" ? "Early Morning (8:00 AM - 10:00 AM)" :
                            time === "morning-late" ? "Late Morning (10:00 AM - 12:00 PM)" :
                            time === "afternoon-early" ? "Early Afternoon (12:00 PM - 2:00 PM)" :
                            time === "afternoon-late" ? "Late Afternoon (2:00 PM - 4:00 PM)" : "Evening (4:00 PM - 6:00 PM)"
                          ).join(", ")}</p>
                          <p><strong>Appointment types:</strong> {DOCTOR_DETAILS[field.value].preferredAppointmentTypes.map(type => 
                            type.replace(/-/g, " ")
                          ).join(", ")}</p>
                        </div>
                      )}
                      <FormDescription>
                        Your appointment request will be sent directly to the selected doctor.
                        Please note you can only select from the doctor's available times.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department/Specialty</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="dermatology">Dermatology</SelectItem>
                          <SelectItem value="endocrinology">Endocrinology</SelectItem>
                          <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="obstetrics">Obstetrics & Gynecology</SelectItem>
                          <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                          <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="psychiatry">Psychiatry</SelectItem>
                          <SelectItem value="general">General Medicine</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Additional Information */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-6">Additional Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="preferredLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Language</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="Mandarin">Mandarin</SelectItem>
                          <SelectItem value="Hindi">Hindi</SelectItem>
                          <SelectItem value="Arabic">Arabic</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="referralInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referral Information (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Name of referring doctor or source" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Please provide the name of the referring doctor if applicable.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="accessibilityNeeds"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Accessibility Needs (if any)</FormLabel>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {accessibilityOptions.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="accessibilityNeeds"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), item.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Terms and Conditions */}
          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the terms and conditions
                      </FormLabel>
                      <FormDescription>
                        By scheduling this appointment, I consent to receive medical treatment and agree to the privacy policy.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
                        <div className="mt-8 flex justify-center">
                          <Button 
                            type="submit" 
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-md"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </span>
                            ) : (
                              <span className="flex items-center">
                                Book Appointment
                                <CheckIcon className="ml-2 h-5 w-5" />
                              </span>
                            )}
                          </Button>
                        </div>
                        
                        {submissionError && (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md text-center">
                            {submissionError}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </form>
                </Form>
              </div>
  );
}