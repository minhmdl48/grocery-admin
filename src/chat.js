import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { getToken } from './utils/auth';

// Cấu hình Pusher với thông tin từ .env
window.Pusher = Pusher;
const token = getToken();
const echo = new Echo({
    broadcaster: 'pusher',
    key: '5769438d197b0268a885',
    cluster: 'ap1',
    encrypted: true,
    forceTLS: true,
    // authEndpoint: 'http://192.168.1.22:8000/broadcasting/auth', // Adjust to your backend
    // auth: {
    //     headers: {
    //         Authorization: `Bearer ${token}`, // Include the token if using API authentication
    //     },
    // },
});

export default echo;