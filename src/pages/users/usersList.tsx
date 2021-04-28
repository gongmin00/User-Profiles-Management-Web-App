import { Table, Space, Button } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { connect, Dispatch, Loading, userStateType } from 'umi';
import UserModal from './components/UserModal';
import { useState, FC } from 'react';
import { singleDataType } from './data';
import { getRemoteList } from './service';

interface UserListType {
  userData: userStateType;
  dispatch: Dispatch;
  userListLoading: boolean;
}
const usersList: FC<UserListType> = ({
  userData,
  dispatch,
  userListLoading,
}) => {
  const [modalVisible, setVisible] = useState(false);
  const [recordData, setRecord] = useState<singleDataType | undefined>();
  const closeHandler = () => {
    setVisible(false);
  };
  const addHandler = () => {
    setVisible(true);
    setRecord(undefined);
  };
  const editHandler = (record: singleDataType) => {
    setVisible(true);
    setRecord(record);
  };
  const DeleteHandler = (record: singleDataType) => {
    dispatch({
      type: 'users/delete',
      payload: record,
    });
  };

  const finishEdit = (values: any) => {
    if (recordData != undefined) {
      dispatch({
        type: 'users/edit',
        payload: {
          values,
          recordData,
        },
      });
    } else {
      dispatch({
        type: 'users/add',
        payload: values,
      });
    }
    setVisible(false);
  };

  //values here is provided by ant design Form component
  //recordData from table record, has ID property

  const proTableHandler = async ({
    pageSize,
    current,
  }: {
    pageSize: number;
    current: number;
  }) => {
    const usersList = await getRemoteList({
      page: current,
      per_page: pageSize,
    });
    return {
      data: usersList.data,
      success: true,
      total: usersList.meta.total,
    };
  };
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
      render: (text: string, record: singleDataType) => (
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
      <ProTable
        request={proTableHandler}
        columns={column}
        // dataSource={userData.data}
        rowKey="id"
        loading={userListLoading}
        search={false}
      />
    </div>
  );
};
const mapStateToProps = ({
  users,
  loading,
}: {
  users: userStateType;
  loading: Loading;
}) => {
  return {
    userData: users,
    userListLoading: loading.models.users,
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

export default connect(mapStateToProps)(usersList);
