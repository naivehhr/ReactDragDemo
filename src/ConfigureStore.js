import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import UserReducer from 'Reducer/UserReducer'
import RouterReducer from 'Reducer/RouterReducer'
import UserNavigationReducer from 'Reducer/UserNavigationReducer'
import {persistStore, autoRehydrate} from 'redux-persist';

const enhancer = compose(
  applyMiddleware(
    thunk
  ),
  autoRehydrate()
)

const reducer = combineReducers({
  user: UserReducer,
  userNav: UserNavigationReducer,
  routerConfig: RouterReducer
});

export default function configureStore(onComplete) {
  const store = createStore(
    reducer,
    enhancer
  )
  // 这个暂时先这么解决吧
  // persistStore(store,{blacklist: ['UserReducer']}, onComplete)
  return store;
}
