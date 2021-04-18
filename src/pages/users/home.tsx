import { Table, Space, Button } from 'antd';
import { connect } from 'umi';
import UserModal from './components/UserModal';
import { useState } from 'react';
const IndexPage = (props) => {
  const [modalVisible, setVisible] = useState(false);
  const [recordData, setRecord] = useState();
  const closeHandler = () => {
    setVisible(false);
  };
  const addHandler = () => {
    setVisible(true);
    setRecord(undefined);
  };
  const editHandler = (record) => {
    setVisible(true);
    setRecord(record);
  };
  const DeleteHandler = (record) => {
    props.dispatch({
      type: 'users/delete',
      payload: record,
    });
  };

  const finishEdit = (values) => {
    if (recordData != undefined) {
      props.dispatch({
        type: 'users/edit',
        payload: {
          values,
          recordData,
        },
      });
    } else {
      props.dispatch({
        type: 'users/add',
        payload: values,
      });
    }
    setVisible(false);
  };

  //values here is provided by ant design Form component
  //recordData from table record, has ID property
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
          <a
            onClick={() => {
              DeleteHandler(record);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>users index page</h1>
      <Button type="primary" onClick={addHandler}>
        Add New
      </Button>
      <UserModal
        modalVisible={modalVisible}
        closeHandler={closeHandler}
        recordData={recordData}
        finishEdit={finishEdit}
      ></UserModal>
      <Table
        columns={column}
        dataSource={props.userData.data}
        rowKey="id"
        loading={props.loading}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log('loading', state);
  return {
    userData: state.users,
    loading: state.loading.models.users,
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
