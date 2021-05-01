import { Table, Space, Button, Pagination, message } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { connect, Dispatch, Loading, userStateType } from 'umi';
import UserModal from './components/UserModal';
import { useState, FC } from 'react';
import { singleDataType } from './data';
import { getRemoteList, editRemoteList, addRemoteItem } from './service';

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
  const [confirmLoadingValue, setComfirmLoading] = useState<boolean>(false);
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

  const finishEdit = async (values: any) => {
    setComfirmLoading(true);
    let finishFun;
    let id = 0;
    if (recordData != undefined) {
      finishFun = editRemoteList;
      id = recordData.id;
    } else {
      finishFun = addRemoteItem;
    }
    const result = await finishFun({ values, id });
    if (result) {
      message.success(`${recordData != undefined ? 'edit' : 'add'} successed`);
      setVisible(false);
      dispatch({
        type: 'users/getRemote',
        payload: {
          page: userData.meta.page,
          per_page: userData.meta.per_page,
        },
      });
      setComfirmLoading(false);
    } else {
      message.error(`${recordData != undefined ? 'edit' : 'add'} failed`);
      setComfirmLoading(false);
    }
  };
  const pageHandler = (page: number, pageSize?: number) => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page,
        per_page: pageSize ? pageSize : userData.meta.per_page,
      },
    });
  };
  const pageSizeHandler = (current: number, size: number) => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: current,
        per_page: size,
      },
    });
  };
  const reloadHandler = () => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: userData.meta.page,
        per_page: userData.meta.per_page,
      },
    });
  };
  //values here is provided by ant design Form component
  //recordData from table record, has ID property

  // const proTableHandler = async ({
  //   pageSize,
  //   current,
  // }: {
  //   pageSize: number;
  //   current: number;
  // }) => {
  //   const usersList = await getRemoteList({
  //     page: current,
  //     per_page: pageSize,
  //   });
  //   return {
  //     data: usersList.data,
  //     success: true,
  //     total: usersList.meta.total,
  //   };
  // };
  const column: ProColumns<singleDataType>[] = [
    {
      title: 'ID',
      //refers to table title display in front end
      dataIndex: 'id',
      //refers to keys data source
      key: 'Id',
      valueType: 'text',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      valueType: 'text',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      valueType: 'text',
    },
    {
      title: 'Create-Time',
      dataIndex: 'create_time',
      key: 'create_time',
      valueType: 'dateTime',
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
      render: (text: any, record: singleDataType) => (
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

      <UserModal
        modalVisible={modalVisible}
        closeHandler={closeHandler}
        recordData={recordData}
        finishEdit={finishEdit}
        confirmLoading={confirmLoadingValue}
      ></UserModal>
      <ProTable
        columns={column}
        dataSource={userData.data}
        rowKey="id"
        loading={userListLoading}
        search={false}
        pagination={false}
        options={{
          density: true,
          fullScreen: true,
          reload: reloadHandler,
          setting: true,
        }}
        headerTitle="User Profile Table"
        toolBarRender={() => [
          <Button type="primary" onClick={addHandler}>
            Add New
          </Button>,
        ]}
      />
      <Pagination
        total={userData.meta.total}
        current={userData.meta.page}
        onChange={pageHandler}
        onShowSizeChange={pageSizeHandler}
        pageSize={userData.meta.per_page}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
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
