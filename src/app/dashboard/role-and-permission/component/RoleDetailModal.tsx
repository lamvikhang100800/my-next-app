import handelAPI from '@/apis/handelAPI';
import { Modal, Form, Input, Select, notification } from 'antd';
import React, { useEffect } from 'react';

const { Option } = Select;

interface RoleDetailModalProps {
    visible: boolean;
    role: string | null;
    onCancel: () => void;
    permissions: { id: string; name: string }[]; 
    users:{id:string , name: string}[];
}

const RoleDetailModal: React.FC<RoleDetailModalProps> = ({ visible, onCancel, role, permissions , users }) => {
    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            
            const req = await handelAPI('/api/authoriz/update-role-and-permission', values, 'post');
    
            if (req.data) {
                notification.success({
                    message: 'Success',
                    description: 'Role updated successfully!',
                });
    
                form.resetFields(); 
                onCancel();
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Failed to update role.',
                });
                
            }
        } catch (error) {
            console.error("Error during role update:", error); 
            notification.error({
                message: 'Error',
                description: 'An error occurred while updating the role. Please try again.',
            });
        }
    };

    const getRoleDetail = async () => {
        if (!role) return; 
        const data = { role_id: role };
        try {
            const res = await handelAPI('/api/authoriz/role-detail', data, 'post');
            console.log(res.data.role.name);
            form.setFieldsValue({
                role_id: res.data.role.id,
                name: res.data.role.name,
                description: res.data.role.description,
                selectedPermissionsIds: res.data.role.permissions.map((per: { id: string }) => per.id),
                selectedUsersIds: res.data.role.user.map((user: { id: string }) => user.id),
            });
        } catch (error) {
            console.error("Error fetching role details:", error);
        }
    };

    useEffect(() => {
        if (visible) {
            getRoleDetail(); 
        }
    }, [visible, role]); 

    return (
        <Modal
            title="Role Details"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="role_id" hidden>
                    <Input type="hidden" />
                </Form.Item>
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
                <Form.Item
                    name="selectedPermissionsIds"
                    label="Select Permission"
                    rules={[{ required: true, message: 'Please select at least one permission!' }]}
                >
                    <Select mode="multiple" placeholder="Select Permissions" allowClear>
                        {permissions.map((per) => (
                            <Option key={per.id} value={per.id}>
                                {per.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="selectedUsersIds"
                    label="Select User"
                >
                    <Select mode="multiple" placeholder="Select User" allowClear>
                        {users.map((u) => (
                            <Option key={u.id} value={u.id}>
                                {u.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RoleDetailModal;
