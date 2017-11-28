import {
  UPDATE_USER
} from 'Action/action_type'


let initialState = {
  customerId: null,
  customerName: '',
  isLogin: false
}


export default function User(state = initialState, action){
  switch (action.type){
    case UPDATE_USER:
      return {
        ...state,
        ...action.data
      }
    default:
      return state;
  }
}
