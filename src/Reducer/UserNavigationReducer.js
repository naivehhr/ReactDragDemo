import {
  UPDATE_NAV
} from 'Action/action_type'
let initialState = {
  currentRoute: '/',
  currentSide: ''
}

export default function UserNav(state = initialState, action){
  switch (action.type){
    case UPDATE_NAV:
      return {
        ...state,
        ...action.data
      }
    default:
      return state;
  }
}
