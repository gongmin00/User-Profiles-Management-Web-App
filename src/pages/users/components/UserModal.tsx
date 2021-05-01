import { Modal, Form, Input, message, DatePicker, Switch } from 'antd';
import userModel from '../model';
import { useEffect, FC } from 'react';
import { singleDataType } from '../data';
import moment from 'moment';
interface UserModalType {
  recordData: singleDataType | undefined;
  modalVisible: boolean;
  closeHandler: () => void;
  finishEdit: (values: any) => void;
  confirmLoading: boolean;
}

const UserModal: FC<UserModalType> = (props) => {
  const {
    recordData,
    modalVisible,
    closeHandler,
    finishEdit,
    confirmLoading,
  } = props;
  const [form] = Form.useForm();
  //useForm is react hook only for functional component
  const failHandler = (error: any) => {
    message.error(error.errorFields[0].errors[0]);
  };
  useEffect(() => {
    if (recordData === undefined) {
      form.resetFields();
      //when add new button is clicked
    } else {
      form.setFieldsValue({
        ...recordData,
        create_time: moment(recordData.create_time),
        status: recordData.status === '1' ? true : false,
      });
      //when edit buttion is clicked,
      //set time value before render into form, because form value is not working
    }
  }, [modalVisible]);
  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
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
      confirmLoading={confirmLoading}
    >
      <Form
        {...formLayout}
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
          {/* <Input></Input> */}
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="status" label="Status" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
