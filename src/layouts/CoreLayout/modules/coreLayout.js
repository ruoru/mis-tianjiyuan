// ------------------------------------
// Constants
// ------------------------------------

export const MENU_TOGGLE = 'MENU_TOGGLE';


// ------------------------------------
// Actions
// ------------------------------------

export function menuToggle() {
  return { type: MENU_TOGGLE }
}

export const actions = {
  menuToggle,
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [NAV_TOGGLE]: (state) => {
    return !state
  }
}


// ------------------------------------
// Reducer
// ------------------------------------

const initialState = false;
export default function menuToggleReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler? handler(state, action): state;
}