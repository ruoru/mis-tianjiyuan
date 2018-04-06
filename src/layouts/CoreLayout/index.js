import { injectReducer } from '../../store/reducers';
import CoreLayout from './containers/CoreLayoutContainer';
import reducer from './modules/coreLayout';

export default (store) => ({
  path: '/',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, { key: 'coreLayout', reducer })
      cb(null, CoreLayout)
    })
  }
})
