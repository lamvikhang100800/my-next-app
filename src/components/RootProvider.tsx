'use client';

import { Provider } from 'react-redux';
import store from '@/redux/store'; 
import PusherTest from './Pusher';
import PusherNotification from './Pusher';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>
        {children}
        <PusherNotification />
        </Provider>;
};

export default Providers;
