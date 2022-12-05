// const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
import AmazonCognitoIdentity, {
  CognitoUserSession,
} from "amazon-cognito-identity-js";
global.fetch = require("node-fetch");

export const login = async (
  username: string,
  password: string,
  userPoolId: string,
  clientId: string
): Promise<AmazonCognitoIdentity.CognitoUserSession> => {
  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: clientId,
  });

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    {
      Username: username,
      Password: password,
    }
  );

  return new Promise((resolve, reject) => {
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (
        session: CognitoUserSession,
        userConfirmationNecessary?: boolean
      ) => {
        resolve(session);
      },
      onFailure: function (err) {
        console.log(
          `An error occurred while executing login command ("cognitoUser.authenticateUser")`,
          err
        );
        reject(err);
      },
      newPasswordRequired: function (userAttributes) {
        delete userAttributes.email_verified; // it's returned but not valid to submit

        const newPassword = "12345678";
        userAttributes.email = username;

        cognitoUser.completeNewPasswordChallenge(newPassword, null, {
          /* @ts-ignore */
          onSuccess: resolve,
          onFailure: function (err) {
            console.log(
              `An error occurred while executing login command ("cognitoUser.completeNewPasswordChallenge")`,
              err,
              userAttributes
            );
            reject(err);
          },
        });
      },
    });

    return cognitoUser;
  });
};
