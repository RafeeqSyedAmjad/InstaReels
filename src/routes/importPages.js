import {lazy} from 'react';


export const Feed = lazy(()=> import('../page/Feed/feed'));
export const Login = lazy(() => import('../page/Login/Login'));
export const Profile = lazy(() => import('../page/Profile/Profile'));
export const Signup = lazy(() => import('../page/Signup/Signup'));

