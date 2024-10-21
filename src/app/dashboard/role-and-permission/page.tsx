'use client'
import handelAPI from '@/apis/handelAPI';
import { Button, Card, Col, Collapse, notification, Row } from 'antd';
import React, { useEffect, useState } from "react";
import AddRoleModal from './component/AddRoleModal';
import AddPermissionModal from './component/AddPermissionModal';
import { SettingOutlined } from '@ant-design/icons';
import RoleDetailModal from './component/RoleDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { authoriSelector, AuthoriState } from '@/redux/reducers/authouziReducer';
import { useRouter } from 'next/navigation';


interface Role {
    id: string,
    name: string,
    description: string
}
interface User{
    id:string,
    name:string
}

interface Permisson {
    id: string,
    name: string,
    description: string
}
interface RoleAndPermissonData {
    role: Role[],
    permissions: Permisson[],
    users: User[];
}


const RoleAndPermisson = () => {

    const permissions = useSelector(authoriSelector);
    const router = useRouter();
    const [data, setData] = useState<RoleAndPermissonData>({ role: [], permissions: [] , users: [] });

    const [isAddRoleModalVisible, setIsAddRoleModalVisible] = useState(false);
    const [isAddPermissionModalVisible, setIsAddPermissionModalVisible] = useState(false);

    const [isRoleDetailModalVisible, setIsRoleDetailModalVisible] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);


    useEffect(() => {
        getRoleAndPermisson();
        checkPermission();
    }, []);



    const getRoleAndPermisson = async () => {
        try {
            const res = await handelAPI('/api/authoriz/role-and-permisson', null, 'get');
            setData(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const checkPermission = () => {
        const permissionExists = permissions.some(permission => permission.name === 'read-auth');
        if (!permissionExists) {
            router.replace('/dashboard');
        }

    };


    const isDisabledCreate = !permissions.some(permission => permission.name === 'create-auth');

    const isDisabledUpdate = !permissions.some(permission => permission.name === 'update-auth');




    // Define items for Collapse
    const roleItems = data.role.map((r) => ({
        key: r.id.toString(),
        label: r.name,
        children: (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <p style={{ margin: 0, flexGrow: 1 }}>
                    <strong>Description:</strong> {r.description}
                </p>
                <Button
                    disabled={isDisabledUpdate}
                    type="primary"
                    size="small"
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                        setSelectedRoleId(r.id);
                        setIsRoleDetailModalVisible(true);
                    }}
                >
                    <SettingOutlined />
                </Button>
            </div>
        ),
    }));



    const permissionItems = data.permissions.map((p) => ({
        key: p.id.toString(),
        label: p.name,
        children: <p> <strong>Decription :</strong> {p.description}</p>,
    }));

    // Handle Add button click
    const handleAddRole = async (values: { name: string; description: string }) => {
        try {
            const req = await handelAPI('/api/authoriz/add-role', values, 'post');
            if (req.data) {
                notification.success({
                    message: 'Success',
                    description: 'Role added successfully!',
                });

                await getRoleAndPermisson();
                setIsAddRoleModalVisible(false);

            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to add role. Please try again.',
            });
        }
    };



    const handleAddPermission = async (values: { name: string; description: string }) => {
        try {
            const req = await handelAPI('/api/authoriz/add-permission', values, 'post');
            if (req.data) {
                notification.success({
                    message: 'Success',
                    description: 'Permission added successfully!',
                });

                await getRoleAndPermisson();
                setIsAddPermissionModalVisible(false);
            }

        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to add Permission. Please try again.',
            });
        }

    };



    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Role" bordered={true}
                        extra={
                            <Button disabled={isDisabledCreate} style={{ backgroundColor: '#1890ff', color: '#fff' }} onClick={() => setIsAddRoleModalVisible(true)}

                            > Add</Button>}
                    >
                        <Collapse>
                            <Collapse items={roleItems} />
                        </Collapse>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Permisson" bordered={true}
                        extra={<Button disabled={isDisabledCreate} style={{ backgroundColor: '#1890ff', color: '#fff' }} onClick={() => setIsAddPermissionModalVisible(true)}  > Add</Button>}
                    >
                        <Collapse items={permissionItems} />
                    </Card>
                </Col>
            </Row>

            {/* Modal for adding Role */}
            <AddRoleModal
                visible={isAddRoleModalVisible}
                onCreate={handleAddRole}
                onCancel={() => setIsAddRoleModalVisible(false)}
            />



            {/* Modal for adding Permission */}
            <AddPermissionModal
                visible={isAddPermissionModalVisible}
                onCreate={handleAddPermission}
                onCancel={() => setIsAddPermissionModalVisible(false)}
            />


            <RoleDetailModal
            visible={isRoleDetailModalVisible}
            role={selectedRoleId}
            onCancel={() => setIsRoleDetailModalVisible(false)}
            permissions={data.permissions}
            users = {data.users}
            />

        </>
    );
}

export default RoleAndPermisson;