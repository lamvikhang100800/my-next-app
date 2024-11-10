import { useEffect } from 'react';
import { notification } from 'antd';
import Pusher from 'pusher-js';
import { authSelector, AuthState } from '@/redux/reducers/authReducer';
import { useSelector } from 'react-redux';

interface PusherEventData {
  type: string; 
  message: string;
  url?: string; 
}

const PusherNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const auth: AuthState = useSelector(authSelector);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (process.env.NODE_ENV === 'development') {
        Pusher.logToConsole = true;
      }

      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      });

      const channel = pusher.subscribe(`user-${auth._id}`);
      channel.bind('notification-event', (data: PusherEventData ) => {
        
        api.info({
          message: 'Notification !',
          description: data.message,
          ...(data.url && { link: data.url }),
        });
      });

      return () => {
        pusher.unsubscribe(`user-${auth._id}`);
      };
    }
  }, [api]);  

  return <>{contextHolder}</>; 
};

export default PusherNotification;
