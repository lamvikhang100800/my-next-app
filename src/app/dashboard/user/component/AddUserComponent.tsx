import { Modal, Form, Input } from 'antd';
import React from 'react';

interface AddUserModalProps {
    visible: boolean;
    onCreate: (values: { code:string , name: string; username:string, email:string , password:string , password_confirmation:string  }) => void;
    onCancel: () => void;
    
}

const AddUserModal: React.FC<AddUserModalProps> = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const handleOk = async () => {
        const values = await form.validateFields();
        const success : any = await onCreate(values);
        if(success){
            form.resetFields();
        }
    };

    return (
        <Modal
            title="Add User"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="code"
                    label="Code"
                    rules={[
                        { required: true, message: 'Please enter code!' },
                        { pattern: /^\S*$/, message: 'User code cannot contain spaces!' }


                    ]}
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="username"
                    label="User Name"
                    rules={[
                        { required: true, message: 'Please enter user name!' },
                        { pattern: /^\S*$/, message: 'User name cannot contain spaces!' }

                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Please enter the email!' },
                            {type:'email', message: 'Please enter a valid email address!'}
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: 'Please enter the Password!' },
                        { min: 6, message: 'Password must be at least 6 characters.' }
                    ]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item
                    name="password_confirmation"
                    label="Confirm Password"
                    dependencies={['password']} 
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm your password" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddUserModal;
