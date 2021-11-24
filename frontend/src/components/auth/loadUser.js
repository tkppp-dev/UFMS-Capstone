import store from 'store';
import { USER_LOADING_REQUEST } from 'redux/types/user_types';
import { useSelector } from 'react-redux';

function loadUser() {
  const { userId } = useSelector((state) => state.auth);

  try {
    store.dispatch({
      type: USER_LOADING_REQUEST,
      payload: userId,
    });
  } catch (e) {
    console.log(e);
  }
}

export default loadUser;
