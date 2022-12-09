# Intro

https://github.com/webiny/webiny-js/issues/2810

this repo will implement an convenience script to automatically create webiny API Tokens for ephemeral environments

// 1st step: Pegar o id do grupo full-access

query listGroups {
security {
groups: listGroups {
data {
id
slug
name
description
createdOn
**typename
}
**typename
}
\_\_typename
}
}

// pegar o id do grupo dentro de security.groups.data[] onde o slug === full-access
{"data":{"security":{"groups":{"data":[{"id":"GDFGDFHDHGDHGHGD","slug":"full-access","name":"Full Access","description":"Grants full access to all apps.","createdOn":"2022-11-24T15:02:53.453Z","__typename":"SecurityGroup"},{"id":"SGDHSGDHSDGHSGDJDG","slug":"anonymous","name":"Anonymous","description":"Permissions for anonymous users (public access).","createdOn":"2022-11-24T15:02:53.495Z","__typename":"SecurityGroup"}],"**typename":"SecurityGroupListResponse"},"**typename":"SecurityQuery"}}}

//2nd step: Run the query to create the user - Use the groupId found on step 1

mutation CreateUser($data: AdminUsersCreateInput!) {
adminUsers {
user: createUser(data: $data) {
data {
id
email
firstName
lastName
avatar
gravatar
createdOn
**typename
}
error {
code
message
data
**typename
}
**typename
}
**typename
}
}

{
"data": {
"firstName": "user3",
"lastName": "user3",
"email": "user2@pFGHDGHDGHFGD.com",
"password": "pa55word!!!",
"group": "HFGDFGDHGJFDGFGD"
}
}

// 3rd step - create the API Token

mutation CreateApiKey($data: SecurityApiKeyInput!) {
security {
apiKey: createApiKey(data: $data) {
data {
id
name
description
token
permissions
createdOn
**typename
}
error {
code
message
data
**typename
}
**typename
}
**typename
}
}

{
"data": {
"name": "test123",
"description": "test123",
"permissions": [
{
"name": "content.i18n"
},
{
"name": "cms.*"
},
{
"name": "adminUsers.*"
}
]
}
}

// The token
[{"data":{"security":{"apiKey":{"data":{"id":"ABCANSDANCALDNL","name":"test123","description":"test123","token":"ADSAFDAGSFGGDHGDJFJF","permissions":[{"name":"content.i18n"},{"name":"cms.*"},{"name":"adminUsers.*"}],"createdOn":"2022-11-25T19:21:09.004Z","**typename":"SecurityApiKey"},"error":null,"**typename":"SecurityApiKeyResponse"},"\_\_typename":"SecurityMutation"}}}]
