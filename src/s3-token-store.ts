import { S3 } from "@aws-sdk/client-s3";

export const getBucketNameFromS3Url = (url: string): string => {
  const splitUrl = url.split('/')
  return splitUrl.length > 2 ? splitUrl[2] : url
}

export const getObjectKeyFromS3Url = (url: string): string => {
  const bucketName = getBucketNameFromS3Url(url);
  return url.substring('s3://'.length + bucketName.length + 1)
}

export const getTokenS3ObjKeyFromS3Url = (env:string,url:string): string =>{
  return `${getObjectKeyFromS3Url(url)}/${env}/test_key.txt`
}


export const getCurrentToken = async (
  env: string,
  bucketUrl: string = process.env?.WEBINY_PULUMI_BACKEND || '',
  s3: S3 = new S3({})
): Promise<string | undefined> => {

  const ret = await s3.getObject({
    Bucket: getBucketNameFromS3Url(bucketUrl),
    Key: getTokenS3ObjKeyFromS3Url(env,bucketUrl)
  })
  return ret?.Body?.transformToString()
}

export const setCurrentToken = async (
  env: string,
  token: string,
  bucketUrl: string = process.env?.WEBINY_PULUMI_BACKEND || '',
  s3: S3 = new S3({})
):Promise<void> =>{
  await s3.putObject({
    Bucket: getBucketNameFromS3Url(bucketUrl),
    Key: getTokenS3ObjKeyFromS3Url(env,bucketUrl),
    Body: token
  })
}