'use client'
import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Input, Button, notification } from "antd";
import handelAPI from "@/apis/handelAPI";
import { FilterDropdownProps } from "antd/es/table/interface";
import { ColumnType } from "antd/es/table";
import AddUserModal from "./component/AddUserComponent";
import UpdateUserModal from "./component/UpdateUserComponent";
import { EditOutlined } from "@ant-design/icons";

interface DataType {
    id: string;
    code: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    status: string; 
}

const User: React.FC = () => {
    const columns: ColumnType<DataType>[] = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Please enter code"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button type="primary" onClick={() => confirm()} size="small" style={{ width: 90 }}>
                            Search
                        </Button>
                        <Button onClick={() => clearFilters && clearFilters()} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value: any, record: DataType) => record.code.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Please enter email"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button type="primary" onClick={() => confirm()} size="small" style={{ width: 90 }}>
                            Search
                        </Button>
                        <Button onClick={() => clearFilters && clearFilters()} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value: any, record: DataType) => record.email.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a: DataType, b: DataType) => a.phone.localeCompare(b.phone),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Active', value: 'ACT' },
                { text: 'Inactive', value: 'DEL' },
            ],
            onFilter: (value: React.Key | boolean, record: DataType) => record.status === value,
            render: (status: string) => (
                <Tag color={status === 'ACT' ? 'green' : 'volcano'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: DataType) => (
                <Space size="middle">
                    <Button type="primary"    onClick={() => handelShowUser(record)}><EditOutlined /></Button>
                </Space>
            ),
        },
    ];

    const [user, setUser] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
    const [isUpdateUserModalVisible, setIsUpdateUserModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<DataType | null>(null);

    const getUser = async () => {
        setLoading(true);
        try {
            const res = await handelAPI('/api/user/index', null, 'post');
            if (res && res.data) {
                setUser(res.data as DataType[]);
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getUser();
    }, []);

    const handelAddUser = async (values: {code:string ,name: string; username: string; email: string; password: string; password_confirmation: string }) => {
        try {
            const req = await handelAPI('/api/user/create', values, 'post');
            if (req.data) {
                notification.success({
                    message: 'Success',
                    description: 'User added successfully!',
                });
                return true
            }
            setIsAddUserModalVisible(false);
            getUser();
        } catch (error: any) {
            const errorMessage = error.response?.data;

            const errorDescriptions = Object.values(errorMessage)
            .flat()
            .join(', '); 

            notification.error({
                message: 'Error',
                description: errorDescriptions || 'Failed to add User. Please try again.',
            });
            return false;
        }
        return true;
    };

    const handelShowUser = (user: DataType) => {
        setSelectedUser(user);
        setIsUpdateUserModalVisible(true);
    };

    const handelUpdateUser = async (values: DataType) => {
        try {
            const req = await handelAPI('/api/user/update', values, 'put');
            if (req.data) {
                notification.success({
                    message: 'Success',
                    description: 'User updated successfully!',
                });
                getUser();
            }
            setIsUpdateUserModalVisible(false);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to update User. Please try again.',
            });
        }
    };

    return (
        <div>
            <h2>User Manager</h2>
            <Button
                onClick={() => setIsAddUserModalVisible(true)}
                style={{ backgroundColor: '#1890ff', color: '#fff', marginBottom: '10px' }}
            >
                Add User
            </Button>

            <Table
                columns={columns}
                dataSource={user}
                rowKey="id"
                loading={loading}
                pagination={{
                    pageSize: 10,
                    total: user.length,
                }}
            />

            <AddUserModal
                visible={isAddUserModalVisible}
                onCreate={handelAddUser}
                onCancel={() => setIsAddUserModalVisible(false)}
            />

            <UpdateUserModal
                visible={isUpdateUserModalVisible}
                onCreate={handelUpdateUser}
                onCancel={() => setIsUpdateUserModalVisible(false)}
                user={selectedUser}
            />
        </div>
    );
};

export default User;
