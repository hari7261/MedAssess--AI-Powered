import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import MobileSidebar from "./MobileSidebar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const getUserEmail = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email);
      }
    };
    getUserEmail();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <MobileSidebar />
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-medical-primary">MedAssess</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="cursor-pointer">Assessments</NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50 bg-white shadow-lg rounded-lg w-[300px] sm:w-[350px] lg:w-[400px]">
                      <div className="grid gap-2 p-4">
                        <Link to="/cancer-assessment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Breast Cancer Assessment (Female)
                        </Link>
                        <Link to="/heart-assessment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Heart Assessment
                        </Link>
                        <Link to="/diabetes-assessment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Diabetes Assessment
                        </Link>
                        <Link to="/malaria-assessment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Malaria Assessment
                        </Link>
                        <Link to="/dengue-assessment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Dengue Assessment
                        </Link>
                        <Link to="/covid-assessment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          COVID-19 Assessment
                        </Link>
                        <Link to="/cold-assessment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Cold Assessment
                        </Link>

                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="cursor-pointer">More</NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50 bg-white shadow-lg rounded-lg w-[300px] sm:w-[350px] lg:w-[400px]">
                      <div className="grid gap-2 p-4">
                        <Link to="/overview" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Overview
                        </Link>
                        <Link to="/team" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Team
                        </Link>
                        <Link to="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Services
                        </Link>
                        <Link to="/news-events" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          News & Events
                        </Link>
                        <Link to="/terms-and-conditions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Terms & Conditions
                        </Link>
                        <Link to="/FAQ" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          FAQ
                        </Link>
                        <Link to="/ChatWithAI" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Chat With AI
                        </Link>
                        <Link to="/AdvancedGPT" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Advanced AI Chat
                        </Link>

                        <Link to="/disease-info" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Disease Info
                        </Link>
                        <Link to="/GovtHealthSchemes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Government Health Schemes
                        </Link>
                        <Link to="/StateSchemes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          State Gov Schemes
                        </Link>
                        <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Join Our Platform
                        </Link>




                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link to="/doctors" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Doctors
              </Link>
              <Link to="/hospitals" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Hospitals
              </Link>
              <Link to="/about" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {userEmail && (
              <span className="text-sm text-gray-600 hidden sm:block">{userEmail}</span>
            )}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-medical-primary hover:text-medical-dark"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};