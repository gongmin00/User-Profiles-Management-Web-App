import { Modal, Form, Input, message } from 'antd';
import userModel from '../model';
import { useEffect, FC } from 'react';
import { singleDataType } from '../data';

interface UserModalType {
  recordData: singleDataType | undefined;
  modalVisible: boolean;
  closeHandler: () => void;
  finishEdit: (values: any) => void;
}

const UserModal: FC<UserModalType> = (props) => {
  const { recordData, modalVisible, closeHandler, finishEdit } = props;
  const [form] = Form.useForm();
  //useForm is react hook only for functional component
  const failHandler = (error: any) => {
    message.error(error.errorFields[0].errors[0]);
  };
  useEffect(() => {
    if (recordData === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue(recordData);
    }
  }, [modalVisible]);
  const formOnOk = () => {
    form.submit();
  };
  return (
    <Modal
      title="User Modal"
      visible={modalVisible}
      onOk={formOnOk}
      onCancel={closeHandler}
      forceRender
    >
      <Form
        name="user form"
        form={form}
        onFinishFailed={failHandler}
        onFinish={finishEdit}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
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
