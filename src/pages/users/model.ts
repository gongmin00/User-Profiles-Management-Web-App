import { Reducer, Effect, Subscription } from 'umi';
import {
  getRemoteList,
  editRemoteList,
  deleteRemoteList,
  addRemoteItem,
} from './service';
import { singleDataType } from './data';

export interface userStateType {
  data: singleDataType[];
  meta: {
    total: number;
    per_page: number;
    page: number;
  };
}
interface userModelType {
  namespace: 'users';
  state: userStateType;
  reducers: {
    getList: Reducer<userStateType>;
    //这里是泛型
  };
  effects: {
    getRemote: Effect;
    edit: Effect;
    delete: Effect;
    add: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const userModel: userModelType = {
  namespace: 'users',
  state: {
    data: [],
    meta: {
      total: 0,
      per_page: 10,
      page: 1,
    },
  },
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *getRemote(action, effects) {
      // const metaData = yield effects.select((state) => state.users.meta);
      const { page, per_page } = action.payload;
      const data = yield effects.call(getRemoteList, { page, per_page });
      yield effects.put({
        type: 'getList',
        payload: data,
        //这里的data是个数组，如果不变成对象的话会报错
      });
    },
    *edit(action, effects) {
      // const { values, id } = action.payload;
      const id = action.payload.recordData.id;
      const values = action.payload.values;
      const data = yield effects.call(editRemoteList, { values, id });
      const { page, per_page } = yield effects.select(
        (state: any) => state.users.meta,
      );
      yield effects.put({
        type: 'getRemote',
        payload: {
          page: page,
          per_page: per_page,
        },
      });
      //刷新页面
    },
    *delete(action, effects) {
      const id = action.payload.id;
      yield effects.call(deleteRemoteList, { id });
      const { page, per_page } = yield effects.select(
        (state: any) => state.users.meta,
      );
      yield effects.put({
        type: 'getRemote',
        payload: {
          page: page,
          per_page: per_page,
        },
      });
      //刷新页面
    },
    *add(action, effects) {
      const values = action.payload;
      yield effects.call(addRemoteItem, { values });
      const { page, per_page } = yield effects.select(
        (state: any) => state.users.meta,
      );
      console.log('add', page, per_page);
      yield effects.put({
        type: 'getRemote',
        payload: {
          page,
          per_page,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location, action) => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'getRemote',
            payload: {
              page: 1,
              per_page: 5,
            },
          });
        }
      });
    },
  },
};

export default userModel;
