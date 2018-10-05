import * as cardsService from '../service/cards';
// import request from '../util/request';

const delay = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
};
export default {
  namespace : 'cards',
  state     : {
    cardsList: [ ],
    statistic: {},
  },
  effects: {
    // param _ means action
    * queryList(_, sagaEffects) {
      const listData = [{
        id: 1,
        name : 'umi',
        desc : '极快的类 Next.js 的 React 应用框架',
        url  : 'https://umijs.org'
      },
      {
        id: 2,
        name : 'antd',
        desc : '一个服务于企业级产品的设计体系',
        url  : 'https://ant.design/index-cn'
      },
      {
        id: 3,
        name : 'antd-pro',
        desc : '一个服务于企业级产品的设计体系',
        url  : 'https://ant.design/index-cn'
      }
      ];
      const { call, put } = sagaEffects;

      yield call(delay, 1000);

      yield put({ type: 'initList', payload: listData });
    },
    * getStatistic({ payload }, { call, put }) {
      const rsp = yield call(cardsService.getStatistic, payload);
      yield put({
        type: 'saveStatistic',
        payload: {
          id: payload,
          data: rsp.result,
        },
      });
      return rsp;
    },
  },
  reducers: {
    initList(state, { payload }) {
      const cardsList = [...payload];
      return {
        ...state,
        cardsList
      };
    },
    addOne(state, { payload }) {
      return {
        ...state,
        cardsList: [...state.cardsList, payload]
      };
    },
    saveStatistic(state, { payload: { id, data } }) {
      return {
        ...state,
        statistic: {
          ...state.statistic,
          [id]: data,
        },
      }
    },
  }
};
