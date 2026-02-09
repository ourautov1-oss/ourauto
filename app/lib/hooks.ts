import { useEffect, useState } from 'react';
import { supabase } from './supabase';


export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  // Only dealer role, remove unused userRole and router

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsLoading(false);
          return;
        }

        // Dealer profile check removed: getUserProfile not implemented
      } catch (err) {
        console.error('Error checking auth:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {
    isLoading,
  };
}

export async function redirectByRole() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }

  // Dealer profile check removed: getUserProfile not implemented
  return null;
}
