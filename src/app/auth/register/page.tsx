'use client';
import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import Loading from "../loading";

interface SignUp {
    email: string,
    password: string,
    name: string,
    birthDay: Date,
    phone: number,
    address: string,
}

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handelSignUp = async (values: SignUp) => {
        setLoading(true);

        try {
            console.log(values);
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log('Sign Up successful');
        } catch (error) {
            console.error('Sign Up failed:', error);
        } finally {
            setLoading(false);
        }
    }


    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-fluid" style={{ height: '100vh' }}>
            <div className="row" style={{ height: '100vh' }}>
                <div className="d-none d-md-block col-6 p-0" style={{
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url('../bg-login.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
                <div className="col-sm-12 col-md-6 p-0">
                    <div className="container d-flex" style={{ height: '100%', alignItems: 'center' }}>
                        <div className="col-sm-12 col-md-12 col-lg-8 offset-lg-2">
                            <div className="mb-4">
                                <Typography.Title className="mb-0">Create New Account</Typography.Title>
                                <Typography.Paragraph className="mb-0">Welcome to us!</Typography.Paragraph>
                            </div>
                            <Form form={form} layout='vertical' onFinish={handelSignUp} size="large">
                                <Form.Item name={'name'} label='Name' rules={[
                                    { required: true, message: 'Please Enter Your Name!' },
                                    {
                                        pattern: /^[A-Za-z]+$/,
                                        message: 'Name can only contain letters!',
                                    },
                                ]}>
                                    <Input placeholder="" type='text' />
                                </Form.Item>

                                <Form.Item name={'email'} label='Email' rules={[
                                    { required: true, message: 'Please Enter Your Email!' },
                                    { type: 'email', message: 'Please enter a valid email address!' }
                                ]}>
                                    <Input placeholder='' type='email' allowClear />
                                </Form.Item>

                                <Form.Item name={'password'} label='Password' rules={[{ required: true, message: 'Please Enter Your Password!' }]}>
                                    <Input placeholder='' type='password' allowClear />
                                </Form.Item>

                                <Form.Item name={'confirm-password'} label='Confirm Password' rules={[
                                    { required: true, message: 'Please Enter Your Password!' },
                                    {
                                        validator: (_, value) => {
                                            if (!value || value === form.getFieldValue('password')) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The Confirm Password do not match!'));
                                        }
                                    }
                                ]}>
                                    <Input placeholder='' type='password' allowClear />
                                </Form.Item>

                                <Form.Item
                                    name={'agree'}
                                    valuePropName="checked" 
                                    rules={[{ required: true, message: 'You must agree to the terms!' }]}
                                >
                                    <Checkbox>
                                        I agree to <strong> Terms and Conditions </strong> 
                                    </Checkbox>
                                </Form.Item>

                                <div className="mt-4">
                                    <Button loading={loading} htmlType='submit' block type='primary'>Sign Up</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
