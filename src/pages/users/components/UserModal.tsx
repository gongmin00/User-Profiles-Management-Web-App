import { Modal, Form, Input } from 'antd';
import userModel from '../model';
import { useEffect } from 'react';

const UserModal = (props) => {
  const [form] = Form.useForm();
  //useForm is react hook only for functional component
  useEffect(() => {
    if (props.recordData === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue(props.recordData);
    }
  }, [props.modalVisible]);
  const formOnOk = () => {
    form.submit();
  };
  return (
    <Modal
      title="User Modal"
      visible={props.modalVisible}
      onOk={formOnOk}
      onCancel={props.closeHandler}
      forceRender
    >
      <Form name="user form" form={form} onFinish={props.finishEdit}>
        <Form.Item name="name" label="Name">
          <Input></Input>
        </Form.Item>
        <Form.Item name="email" label="E-mail">
          <Input></Input>
        </Form.Item>
        <Form.Item name="create_time" label="Created Time">
          <Input></Input>
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Input></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
