import {take, put, fork} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  SET_CART_ITEMS,
  setItemDetails
} from './../actions';

export function* loadItemDetails(item) {
  console.info('item: ', item);
  const { id } = item;
  const response = yield fetch(`http://localhost:8081/items/${id}`);
  // console.log('resonse: ', response.ok);
  const data = yield response.json();
  const info = data[0];
  // console.log('info: ', info);
  yield put(setItemDetails(info))
}
export function* itemDetailsSaga() {
  const { items } = yield take(SET_CART_ITEMS);
  yield items.map(item => fork(loadItemDetails, item));
}