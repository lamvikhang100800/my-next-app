import { Modal, Form, Input } from 'antd';
import React from 'react';

interface AddRoleModalProps {
    visible: boolean;
    onCreate: (values: { name: string; description: string }) => void;
    onCancel: () => void;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const handleOk = async () => {
        const values = await form.validateFields();
        onCreate(values);
        form.resetFields();
    };

    return (
        <Modal
            title="Add Role"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Role Name"
                    rules={[{ required: true, message: 'Please enter the role name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter the description!' }]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddRoleModal;
