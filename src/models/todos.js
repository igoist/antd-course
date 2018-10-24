import request from '../util/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise
import { message } from 'antd';

const delay = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
};

let counter = 2;

export default {
  namespace: 'todos',
  state: {
    data: [
      { id: 0, text: '~~~~~~0', complete: false },
      { id: 1, text: '~~~~~~1', complete: false },
    ],
    filter: 'SHOW_ALL'
  },
  effects: {
    *queryInitTodo(_, sagaEffects) {
      const { call, put } = sagaEffects;
      // const endPointURI = '/dev/random_joke';

      yield call(delay, 1000);

      try {
        // const puzzle = yield call(request, endPointURI);
        // yield put({ type: 'addNewTodo', payload: puzzle });

        // yield call(delay, 100);

        // const puzzle2 = yield call(request, endPointURI);
        // yield put({ type: 'addNewTodo', payload: { text: '~~~~~~', complete: false } });
      } catch(e) {
        message.error('数据获取失败');
      }
    }
  },
  reducers: {
    addNewTodo(state, { payload: newTodo }) {
      return {
        ...state,
        data: [...state.data, { ...newTodo, id: counter++ }],
      }
    },
    deleteTodo(state, { id }) {
      return {
        ...state,
        data: state.data.filter(item => item.id !== id),
      }
    },
    toggleTodo(state, { id }) {
      return {
        ...state,
        data: state.data.map(item =>
          (item.id === id)
          ? {...item, completed: !item.completed}
          : item
        ),
      }
    },
    setFilter(state, { filter }) {
      return {
        ...state,
        filter
      }
    },
  }
};
