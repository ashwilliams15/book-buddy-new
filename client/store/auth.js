import axios from 'axios';
import 'regenerator-runtime/runtime'

const TOKEN = 'token'

const SET_AUTH = 'SET_AUTH';

const _setAuth = (auth) => {
  console.log('AUTH', auth)
  return {
    type: SET_AUTH,
    auth
  }
};

export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  console.log('TOKEN', token)
  if (token) {
    const res = await axios.get('/api/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(_setAuth(res.data))
  }
};

export const authenticate = (username, password, method) => async dispatch => {
  try {
    console.log('in authenticate')
    const res = await axios.post(`/api/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    console.log('dispatching me')
    dispatch(me())
  } catch (authError) {
    return dispatch(_setAuth({error: authError}))
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  // history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
};

export default function(state={}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
};
