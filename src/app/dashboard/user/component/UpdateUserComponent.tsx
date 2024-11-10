import { Modal, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const { Option } = Select;

interface DataType {
    id: string;
    code: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    status: string; 
}

interface UpdateUserModalProps {
    visible: boolean;
    onCreate: (values: DataType) => void;
    onCancel: () => void;
    user: any

}

const UpdateUserModal: React.FC< UpdateUserModalProps> = ({ visible, onCreate, onCancel , user}) => {
    
    const [form] = Form.useForm();

    const handleOk = async () => {
        const values = await form.validateFields();
        onCreate(values);
        form.resetFields();
    };
    useEffect(()=>{
        if(user){
            form.setFieldsValue(user);
        }
    },[user,form]);

    return (
        <Modal
            title="Add User"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                    <Form.Item
                        name="id"
                        hidden
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
                    <Input readOnly/>
                </Form.Item>
                <Form.Item
                    name="code"
                    label="User Code"
                    rules={[
                        { required: true, message: 'Please enter user code!' },
                        { pattern: /^\S*$/, message: 'User code cannot contain spaces!' }

                    ]}
                >
                    <Input readOnly/>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Please enter the email!' },
                            {type:'email', message: 'Please enter a valid email address!'}
                    ]}
                >
                    <Input readOnly/>
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        { required: true, message: 'Please enter the Address!' },
                    ]}
                >
                    <Input placeholder="Enter your address" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        { required: true, message: 'Please enter the Phone!' },
                        { pattern: /^\d+$/, message: 'Phone number must contain only numbers!' }
                    ]}
                >
                    <Input placeholder="Enter your phone" />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select a status!' }]}
                >
                    <Select placeholder="Select status" >
                        <Option value="ACT">Active</Option>
                        <Option value="DEL">Delete</Option>
                    </Select>
                </Form.Item>

               
            </Form>
        </Modal>
    );
};

export default UpdateUserModal;
