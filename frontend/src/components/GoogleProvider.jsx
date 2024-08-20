import { GoogleOAuthProvider } from "@react-oauth/google";

function GoogleProvider({ clientId, children }) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}

export default GoogleProvider;

