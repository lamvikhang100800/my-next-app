'use client';
import React, { useState , useEffect } from "react";
import {  Form, Input, Button, Typography } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import Loading from "../loading";
import Link from "next/link";
import handelAPI from "@/apis/handelAPI";
import { notification } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { addAuth, authSelector, AuthState, clearAuth } from "@/redux/reducers/authReducer";
import { useRouter } from "next/navigation";

interface SignIn{
    email:  string,
    password: string
}

const Login = () => {
    
    const [form] = Form.useForm();
    const [loading , setLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const auth: AuthState = useSelector(authSelector);
    useEffect(()=>{
        const validateToken = async () => {
            if (auth.token) {
                try {
                    const res = await handelAPI('/api/auth/me', null, 'post');
                    if (res.data) {
                        router.replace('/dashboard');
                    } else {
                        dispatch(clearAuth()); 
                        router.replace('/auth/login');
                    }
                } catch (error) {
                    console.error('Error validating token:', error);
                    dispatch(clearAuth()); 
                    router.replace('/auth/login');
                }
            }
        };

        validateToken();
    },[auth.token , router]);
  
    const handelSignIn = async (values: SignIn) => {
        setLoading(true); 
        try {

            const res = await handelAPI('/api/auth/login', values ,'post')
            if(res.data){
                const authData = {
                    token: res.data.access_token,
                    role:'',
                    _id:res.data.user_id,
                    name:'',
                }
                dispatch(addAuth(authData));
                localStorage.setItem('token', res.data.access_token);
                localStorage.setItem('user_id', res.data.user_id);
                router.replace('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
            notification.error({
                message: 'Login Failed',
                description: 'Please check your credentials and try again.',
            });
        } finally {
            setLoading(false); 
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            form.submit(); 
        }
    };
    
    if (loading) {
        return <Loading />;
    }

    return (
            <div className="container-fuild " style={{height:'100vh' }}>
                    <div className="row" style={{height:'100vh'}}>
                        <div className="d-none d-md-block col-6 p-0" style={{
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: `url('../bg-login-2.jpg')`,
                            backgroundSize:'cover',
                            backgroundPosition: 'center'
                        }}>

                        </div>
                        <div className="col-sm-12 col-md-6 p-0">
                            <div className="container d-flex" style={{height:'100%', alignItems:'center'}}>
                                <div className="col-sm-12 col-md-12 col-lg-8 offset-lg-2">
                                    <div className="mb-4">
                                        <Typography.Title className="mb-0">Sign In </Typography.Title>
                                    </div>
                                    <Form  onKeyDown={handleKeyDown} form={form} layout='vertical' onFinish={ handelSignIn} size="large" >
                                        <Form.Item name={'email'} label='Email' rules={[
                                            {'required':true , 'message':'Please Enter Your Email !'},
                                            {'type':'email' , 'message':'Please enter a valid email address!'}
                                            ]} >
                                            <Input placeholder='' type='email-address' allowClear/>
                                        </Form.Item>

                                        <Form.Item name={'password'} label='Password' rules={[{
                                            'required':true , 
                                            'message':'Please Enter Your Password !'
                                            }]} >
                                            <Input.Password placeholder=''  allowClear/>
                                        </Form.Item>
                                    </Form>
                                    <div className="mt-4">
                                        <Checkbox>
                                            Remember Me
                                        </Checkbox>
                                    </div>

                                    <div className="mt-4">
                                        <Button  loading={loading}    htmlType='submit' block type='primary' onClick={ ()=> form.submit()} >Sign In</Button>
                                    </div>
                                    <div className="mt-4">
                                        <Typography.Text>
                                            Don't have an account?  <strong><Link style={{color:'black'}}  href="register">Sign Up</Link></strong>
                                        </Typography.Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    );
};

export default Login;
