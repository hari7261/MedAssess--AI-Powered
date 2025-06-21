import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const MobileSidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col space-y-4 mt-4">
          <div>
            <button
              className="text-gray-900 font-semibold text-lg px-4 py-2 w-full text-left hover:bg-gray-100"
              onClick={() => toggleDropdown("assessments")}
            >
              Assessments
            </button>
            {openDropdown === "assessments" && (
              <div className="pl-4">
                <Link to="/cancer-assessment" className="block p-2 hover:bg-gray-100 rounded-md">
                  Cancer Assessment
                </Link>
                <Link to="/heart-assessment" className="block p-2 hover:bg-gray-100 rounded-md">
                  Heart Assessment
                </Link>
                <Link to="/diabetes-assessment" className="block p-2 hover:bg-gray-100 rounded-md">
                  Diabetes Assessment
                </Link>
                <Link to="/malaria-assessment" className="block p-2 hover:bg-gray-100 rounded-md">
                  Malaria Assessment
                </Link>
                <Link to="/dengue-assessment" className="block p-2 hover:bg-gray-100 rounded-md">
                  Dengue Assessment
                </Link>
                <Link to="/covid-assessment" className="block p-2 hover:bg-gray-100 rounded-md">
                  COVID-19 Assessment
                </Link>
                <Link to="/cold-assessment" className="block p-2 hover:bg-gray-100 rounded-md">
                  Cold Assessment
                </Link>


              </div>
            )}
          </div>

          <div>
            <button
              className="text-gray-900 font-semibold text-lg px-4 py-2 w-full text-left hover:bg-gray-100"
              onClick={() => toggleDropdown("resources")}
            >
              Resources
            </button>
            {openDropdown === "resources" && (
              <div className="pl-4">
                <Link to="/doctors" className="block p-2 hover:bg-gray-100 rounded-md">
                  Find Doctors
                </Link>
                <Link to="/hospitals" className="block p-2 hover:bg-gray-100 rounded-md">
                  Find Hospitals
                </Link>
                <Link to="/ChatWithAI" className="block p-2 hover:bg-gray-100 rounded-md">
                  Chat With AI
                </Link>
                <Link to="/AdvancedGPT" className="block p-2 hover:bg-gray-100 rounded-md">
                  Advanced AI-Chat
                </Link>

                <Link to="/GovtHealthSchemes" className="block p-2 hover:bg-gray-100 rounded-md">
                  Government Health Schemes
                </Link>
                <Link to="/StateSchemes" className="block p-2 hover:bg-gray-100 rounded-md">
                  State Gov Schemes
                </Link>
                <Link to="/register" className="block p-2 hover:bg-gray-100 rounded-md">
                  Join Our Platform
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              className="text-gray-900 font-semibold text-lg px-4 py-2 w-full text-left hover:bg-gray-100"
              onClick={() => toggleDropdown("moreOptions")}
            >
              More Options
            </button>
            {openDropdown === "moreOptions" && (
              <div className="pl-4">
                <Link to="/about" className="block p-2 hover:bg-gray-100 rounded-md">
                  About
                </Link>
                <Link to="/overview" className="block p-2 hover:bg-gray-100 rounded-md">
                  Overview
                </Link>
                <Link to="/team" className="block p-2 hover:bg-gray-100 rounded-md">
                  Our Team
                </Link>
                <Link to="/services" className="block p-2 hover:bg-gray-100 rounded-md">
                  Services
                </Link>
                <Link to="/news-events" className="block p-2 hover:bg-gray-100 rounded-md">
                  News & Events
                </Link>
                <Link to="/terms-and-conditions" className="block p-2 hover:bg-gray-100 rounded-md">
                  Terms & Conditions
                </Link>
              </div>
            )}
          </div>

          <Link to="/contact" className="text-gray-500 hover:text-gray-900 px-4 py-2">
            Contact
          </Link>
          <Link to="/faq" className="text-gray-500 hover:text-gray-900 px-4 py-2">
            FAQ
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
