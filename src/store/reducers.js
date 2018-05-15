import { combineReducers } from 'redux';

import { navToggle } from '../layouts/SideLayout/modules/SideLayoutModule';

// export const rootReducer = (asyncReducers) => {
//   return combineReducers({
//     //...asyncReducers
//   })
// }

// export const injectReducer = (store, { key, reducer }) => {
//   store.asyncReducers[key] = reducer
//   store.replaceReducer(rootReducer(store.asyncReducers))
// }

const rootReducer = combineReducers({
  navToggle,
});

export default rootReducer;