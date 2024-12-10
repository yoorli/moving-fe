import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { auth } from '../lib/api/auth';

const INITCONTEXT: any = {}; // 말 그대로 초기값. 새로 시작하거나 정상 흐름이 아닐경우를 상정한다.

export const AuthContext = createContext<any>(INITCONTEXT);

export function AuthProvider() {
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const response = await auth.get('/user/me');
      setUser(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      <Outlet />
    </AuthContext.Provider>
  );
}
