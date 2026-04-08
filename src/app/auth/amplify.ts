import { Amplify } from "aws-amplify";

const region = import.meta.env.VITE_AWS_REGION;
const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const userPoolClientId = import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID;
const identityPoolId = import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID;

const hasRequiredAuthConfig = Boolean(region && userPoolId && userPoolClientId);

if (hasRequiredAuthConfig) {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
        identityPoolId,
        loginWith: {
          email: true,
        },
      },
    },
  });
}

export { hasRequiredAuthConfig };
