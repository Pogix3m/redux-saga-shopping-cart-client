import {take, actionChannel, put} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  SET_SHIPPING_FETCH_STATUS,
  setCanCheckOut,
  FETCHED
} from '../actions';

export function* checkoutAvailabilitySaga(){
  const checkoutAvailabilityChannel = yield actionChannel(SET_SHIPPING_FETCH_STATUS);
  let counter = 0;
  while (true) {
    // console.log('counter: ', ++counter);
    const { status } = yield take(checkoutAvailabilityChannel);
    yield put(setCanCheckOut(status === FETCHED));
  }
}