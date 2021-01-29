import React, { 
  createContext,  
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { getUserInfo } from 'api/Auth';

export const userStore = createContext<any>({});
const { Provider } = userStore;

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserInfo();
      setUserData(response);
    }
    fetchData();
  }, [])

  return (
    <Provider value={userData}>
      {children}
    </Provider>
  )
};

export default UserProvider;
