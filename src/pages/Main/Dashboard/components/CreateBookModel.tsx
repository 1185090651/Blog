import { Form, Input, Modal, notification } from "antd";
import React, { useState } from "react";
const { TextArea } = Input;
import request from '@/request';

interface Props {
  visible: boolean;
  setVisible: Function;
}

const CreateBookModel: React.FC<Props> = ({ visible, setVisible }) => {
  // 异步添加
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const handleOk = async () => {
      await form.validateFields()
      const data = form.getFieldsValue()
      setConfirmLoading(true)
      const res = await request({
          url: '/book',
          method: 'POST',
          data
      })
      notification.success({
          message: '新建知识库成功!'
      })
      setConfirmLoading(false)
  };
  const handleCancel = () => {};
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
          name="username"
          rules={[{ required: true, message: "请输入知识库名称!" }]}
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
