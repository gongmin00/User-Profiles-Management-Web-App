import { Table, Space } from 'antd';
import { connect } from 'umi';
import UserModal from './components/UserModal';
import { useState } from 'react';
const IndexPage = (props) => {
  const [modalVisible, setVisible] = useState(false);
  const [recordData, setRecord] = useState();
  const closeHandler = () => {
    setVisible(false);
  };

  const editHandler = (record) => {
    setVisible(true);
    setRecord(record);
  };

  const finishEdit = (values) => {
    setVisible(false);
    props.dispatch({
      type: 'users/edit',
      payload: {
        values,
        recordData,
      },
    });
  };

  //values here is provided by ant design Form component
  //recordData from table
  const column = [
    {
      title: 'ID',
      //refers to table title display in front end
      dataIndex: 'id',
      //refers to keys data source
      key: 'Id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      // render: (text) => {
      //   <Space>
      //     <a
      //       onClick={() => {
      //         setVisible(true);
      //       }}
      //     >
      //       Edit
      //     </a>
      //     <a>Delete</a>
      //   </Space>;
      // },
      render: (text, record) => (
        <Space>
          <a
            onClick={() => {
              editHandler(record);
            }}
          >
            Edit
          </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>users index page</h1>
      <UserModal
        modalVisible={modalVisible}
        closeHandler={closeHandler}
        recordData={recordData}
        finishEdit={finishEdit}
      ></UserModal>
      <Table columns={column} dataSource={props.userData.data} rowKey="id" />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userData: state.users,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     finishEdit: (values) =>
//       dispatch({
//         type: 'users/edit',
//         payload: values,
//       }),
//   };
// };

export default connect(mapStateToProps)(IndexPage);
