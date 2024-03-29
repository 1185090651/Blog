import { Form, Input, Modal, notification } from 'antd';
import React, { useState } from 'react';
const { TextArea } = Input;
import request from '@/request';

interface IProps {
  visible: boolean;
  setVisible: Function;
}

const CreateBookModel: React.FC<IProps> = ({ visible, setVisible }) => {
    // 异步添加
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const handleOk = async () => {
        await form.validateFields();
        const data = form.getFieldsValue();
        setConfirmLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res = await request({
            url: '/api/admin/book',
            method: 'POST',
            data
        }).catch(err => {
            notification.error({
                message: err
            });
        });
        if (res) {
            notification.success({
                message: '新建知识库成功!'
            });
        }
        setConfirmLoading(false);
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <Modal
            title="新建知识库"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="确认"
            cancelText="取消"
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    label="名称"
                    name="name"
                    rules={[{ required: true, message: '请输入知识库名称!' }]}
                >
                    <Input placeholder="如: 产品文档" autoComplete="off" />
                </Form.Item>
                <Form.Item label="简介" name="description">
                    <TextArea
                        autoComplete="off"
                        autoSize={{ minRows: 2 }}
                        placeholder="如: 产品设计与研发"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateBookModel;
