import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "4e87fc6a-57b0-4dc7-aba8-cc3aa7bb4ab6",
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message Sent Successfully! 🎉",
          description: "We'll get back to you as soon as possible.",
          className: "bg-green-500 text-white",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-r from-medical-primary to-medical-dark flex items-center justify-center mb-12">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-200">We're here to help and answer any questions you might have</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-medical-primary mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-medical-light p-3 rounded-full">
                    <Mail className="w-6 h-6 text-medical-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">hariompandit5556@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-medical-light p-3 rounded-full">
                    <Phone className="w-6 h-6 text-medical-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+91 7261033994 </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-medical-light p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-medical-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">EXCEL ENGINEERING COLLEGE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-medical-primary mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="h-32 w-full"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-medical-primary hover:bg-medical-dark transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;