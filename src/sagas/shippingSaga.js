import {takeLatest, put, select} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  SET_CART_ITEMS,
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
  FETCHED,
  FETCHING,
  setShippingCost,
  setShippingFetchStatus
} from '../actions';

import {
  cartItemsSelector
} from '../selectors';

function* shipping() {
  yield put(setShippingFetchStatus(FETCHING));
  const items = yield select(cartItemsSelector);

  const itemRequestString = items.reduce((string,item) => {
    for(let i=0; i<item.get('quantity'); i++) {
      string += item.get('id') + ',';
    }

    return string;
  }, '').replace(/,\s*$/, ''); //remove last comma

  // console.log('itemRequestString: ', itemRequestString);

  const response = yield fetch(`http://localhost:8081/shipping/${itemRequestString}`);
  const {total} = yield response.json();
  // console.log('total: ', total);
  yield put(setShippingCost(total));
  yield put(setShippingFetchStatus(FETCHED));
}

export function* shippingSaga() {
  yield takeLatest([
    SET_CART_ITEMS,
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY
  ], shipping);
}