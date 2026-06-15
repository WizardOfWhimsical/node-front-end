import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthGoogleButton from './AuthGoogleButton';
import {
  actions as userActions,
  context as UserContext,
} from '../../reducers/user.reducer.js';
import MessageDisplay from '../../shared/MessageDisplay';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function AuthPlaceholder() {
  const navigate = useNavigate();
  const { dispatch, userState } = useContext(UserContext);

  const clearError = () => {
    dispatch({ type: userActions.clearAuthError });
  };

  return (
    <div className="formDesign center">
      {!userState?.isLoading ? (
        <>
          <button
            onClick={() => {
              // clearError();
              navigate('/logon');
            }}
          >
            Logon
          </button>
          <button
            onClick={() => {
              // clearError();
              navigate('/register');
            }}
          >
            Register
          </button>
          {/* //trying to break this by adding s to the env */}
          {googleClientId && <br></br> && <AuthGoogleButton />}
          <br />

          {userState?.errorMessage && (
            <MessageDisplay
              error={userState?.errorMessage}
              onClick={() => clearError()}
            />
          )}
          {/* {userState?.errorMessage && <p>{userState?.errorMessage}</p>} */}
        </>
      ) : (
        <p>Authorization...</p>
      )}
    </div>
  );
}

export default AuthPlaceholder;
