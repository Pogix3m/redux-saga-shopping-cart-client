import {take, put} from 'redux-saga/effects';

import {
  SET_CURRENT_USER,
  setTaxRate
} from '../actions';


export function* taxRateSaga() {
  // const awts = yield take(SET_CURRENT_USER);
  // console.log('user: ', awts);
  // const user = awts.user;

  const {user} = yield take(SET_CURRENT_USER);
  // user.country ='usa';
  const {country} = user;
  // console.log('user: ', user);
  const response = yield fetch(`http://localhost:8081/tax/${country}`);
  const {rate} = yield response.json();
  yield put(setTaxRate(rate));

}