import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { auth } from '../lib/api/auth';

const INITCONTEXT: any = {}; // 말 그대로 초기값. 새로 시작하거나 정상 흐름이 아닐경우를 상정한다.

export const AuthContext = createContext<any>(INITCONTEXT);

export function AuthProvider() {
  const [userValue, setUserValue] = useState<{ isPending: boolean; user: any }>(
    {
      isPending: false,
      user: {},
    },
  );

  const getUser = async () => {
    try {
      setUserValue((prev) => ({
        ...prev,
        isPending: true,
      }));
      const response = await auth.get('/user/me');
      setUserValue((prev) => ({
        ...prev,
        user: response.data,
      }));
    } catch (e) {
      setUserValue((prev) => ({
        ...prev,
        user: undefined,
      }));
    } finally {
      setUserValue((prev) => ({
        ...prev,
        isPending: false,
      }));
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userValue }}>
      <Outlet />
    </AuthContext.Provider>
  );
}
