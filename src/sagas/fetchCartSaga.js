import {take, put} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  SET_CURRENT_USER,
  setCartItems
} from './../actions';

export function* fetchCartSaga() {
  const { user } = yield take(SET_CURRENT_USER);
  const { id } = user;
  const response = yield fetch(`http://localhost:8081/cart/${id}`);
  // console.info('response: ', response);
  // console.info('response.json: ', response.json());
  // response.json().then(r=> {console.log('r: ', r)});
  const { items } = yield response.json();
  // const { items } = response;
  yield put(setCartItems(items));
  console.info('set cart items: ', items);
}