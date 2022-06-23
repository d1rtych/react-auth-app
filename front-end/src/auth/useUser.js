import { useEffect, useState } from "react";
import { useToken } from "./useToken";

export const useUser = () => {
  const [token] = useToken();

  const getPayloadFormToken = (token) => {
    const encodedPayload = token.split('.')[1];
    return JSON.parse(atob(encodedPayload));
  }

  const [user, setUser] = useState(() => {
    if (!token) return null;

    return getPayloadFormToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFormToken(token));
    }
  }, [token]);

  return user;
};
