import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  user_id: number;
  org_id: number;
  role: string;
  user_name: string;
  is_org_admin: boolean;
  exp: number;
};

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true); //ADD THIS

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setAuthenticated(false);
      setLoading(false); //  important
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);

      // Expiry check
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("access_token");
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      setUser(decoded);
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    } finally {
      setLoading(false); 
    }
  }, []);

  return {
    authenticated,
    user,
    role: user?.role,
    isOrgAdmin: user?.is_org_admin,
    loading, 
  };
}
