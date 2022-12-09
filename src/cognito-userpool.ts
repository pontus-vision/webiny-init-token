import { CognitoIdentityProviderClient, DescribeUserPoolClientCommand, DescribeUserPoolCommand, ListUserPoolClientsCommand, ListUserPoolsCommand, ListUserPoolsCommandInput } from "@aws-sdk/client-cognito-identity-provider";

export interface UserPoolClientId {
  userPoolId?: string;
  clientId?: string;

}

export const getUserPoolClientId = async (envName: string): Promise<UserPoolClientId> => {
  const client = new CognitoIdentityProviderClient({ region: process.env['AWS_REGION'] });
  let userPoolId = undefined;

  const retVal: UserPoolClientId = {

  }
  // async/await.
  try {
    let data = undefined;
    let found = false;
    let nextToken = undefined;
    do {
      const params: ListUserPoolsCommandInput = {
        MaxResults: 60,
        NextToken: nextToken

      };
      const command = new ListUserPoolsCommand(params);
      data = await client.send(command)
      nextToken = data.NextToken;

      if (data.UserPools) {
        for (const userPool of data.UserPools!) {
          if (userPool.Id) {
            const command2 = new DescribeUserPoolCommand({ UserPoolId: userPool.Id });
            const userPoolDetails = await client.send(command2);
            if (userPoolDetails?.UserPool?.UserPoolTags) {
              found = (envName === userPoolDetails.UserPool.UserPoolTags['WbyEnvironment'])
              if (found) {
                userPoolId = userPool.Id;
                retVal.userPoolId = userPoolId;
                const command4 = new ListUserPoolClientsCommand({
                  UserPoolId: userPoolId,
                  MaxResults: 60
                })


                let nextInnerToken = undefined
                do {
                  const userCLients = await client.send(command4);
                  nextInnerToken = userCLients.NextToken;

                  if (userCLients.UserPoolClients) {
                    for (const userClient of userCLients.UserPoolClients) {
                       retVal.clientId = userClient.ClientId
                       break;

                    }
                  }

                } while (nextInnerToken)

                // const command3 = new DescribeUserPoolClientCommand({
                //   UserPoolId: userPoolId
                // });

                break;
              }
            }
          }
        }
      }
    } while ((!found && data.NextToken));

    // process data.
  } catch (error) {
    // error handling.
    console.log(`Error: ${error}`)
    throw error;
  } finally {
    // finally.
  }

  return retVal

}

