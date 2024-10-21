'use client'
import { useState, useEffect } from 'react';
import Loading from '../loading';
import { authSelector, AuthState, clearAuth } from '@/redux/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import handelAPI from '@/apis/handelAPI';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter()
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  
  const auth: AuthState = useSelector(authSelector);
  useEffect(() => {
    setMounted(true);
    
    const validateToken =async ()=>{
      if(auth.token){
          try {
            const res = await handelAPI('/api/auth/me', null, 'post');
            if (!res.data) {
                dispatch(clearAuth()); 
                router.replace('/auth/login');
            }
        } catch (error) {
            console.error('Error validating token:', error);
            dispatch(clearAuth()); 
            router.replace('/auth/login');
        }
      }else{
        router.replace('/auth/login');
      }
       
    }

    validateToken();

  }, [auth.token, router , dispatch]);

  if (!mounted) {
    return <Loading/>; 
  }

  return <>{children}</>; 
};

export default LayoutWrapper;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

