import { Reducer, Effect, Subscription } from 'umi';
import {
  getRemoteList,
  editRemoteList,
  deleteRemoteList,
  addRemoteItem,
} from './service';
interface userModelType {
  namespace: 'users';
  state: {};
  reducers: {
    getList: Reducer;
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
  state: {},
  reducers: {
    getList(state, action) {
      console.log(action.payload);
      return action.payload;
    },
  },
  effects: {
    *getRemote(action, effects) {
      const data = yield effects.call(getRemoteList);
      console.log(data);
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
      yield effects.put({
        type: 'getRemote',
      });
      //刷新页面
    },
    *delete(action, effects) {
      const id = action.payload.id;
      yield effects.call(deleteRemoteList, { id });
      yield effects.put({
        type: 'getRemote',
      });
      //刷新页面
    },
    *add(action, effects) {
      const values = action.payload;
      yield effects.call(addRemoteItem, { values });
      yield effects.put({
        type: 'getRemote',
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location, action) => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};

export default userModel;
