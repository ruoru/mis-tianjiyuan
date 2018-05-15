// ------------------------------------
// Constants
// ------------------------------------

export const NAV_TOGGLE = 'NAV_TOGGLE';


// ------------------------------------
// Actions
// ------------------------------------

export const navToggleAction = navToggle => {
  return { type: NAV_TOGGLE, navToggle }
}

export const actions = {
  navToggleAction,
}

// ------------------------------------
// Reducer
// ------------------------------------

export const navToggle = (state = false, action) => {
  switch (action.type) {
    case 'NAV_TOGGLE':
      return !state;
    default:
      return state;
  }
}