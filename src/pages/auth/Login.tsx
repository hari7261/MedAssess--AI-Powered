import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (sessionError) {
          console.error("Session error:", sessionError);
          await supabase.auth.signOut();
          setError("Please sign in again to continue.");
          setIsLoading(false);
          return;
        }
        
        if (session?.user) {
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        }
        
        setIsLoading(false);
      } catch (err) {
        if (!mounted) return;
        console.error("Error checking session:", err);
        setError("An unexpected error occurred. Please try signing in again.");
        setIsLoading(false);
      }
    };

    // Initial session check
    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === 'SIGNED_IN' && session) {
        // Verify the session is valid
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !sessionData.session) {
          console.error("Session verification failed:", sessionError);
          setError("Authentication failed. Please try again.");
          return;
        }

        toast({
          title: "Success",
          description: "Successfully signed in!",
        });
        
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else if (event === 'SIGNED_OUT') {
        setError(null);
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, location, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="relative py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')] opacity-10 bg-cover bg-center" />
        <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-medical-primary">Welcome to MedAssess</h1>
            <p className="mt-2 text-gray-600">Your trusted healthcare companion</p>
          </div>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
              {error.includes("invalid request") && (
                <p className="text-xs mt-2 text-red-500">
                  This may be caused by a redirect URI mismatch. Ensure that the redirect URI in 
                  Google Cloud Console matches the application URL.
                </p>
              )}
            </div>
          )}
          <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#0284c7',
                      brandAccent: '#0369a1',
                    },
                  },
                },
              }}
              providers={['google']}
              // Use your production URL here instead of window.location.origin
              // Make sure this matches EXACTLY what's configured in Google Cloud Console
              redirectTo={import.meta.env.VITE_AUTH_REDIRECT_URL || window.location.origin}
              onError={(error) => {
                console.error('Auth error:', error);
                setError(error.message);
                toast({
                  variant: "destructive",
                  title: "Authentication Error",
                  description: error.message,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
