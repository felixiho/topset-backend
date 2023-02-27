import AWS from 'aws-sdk'
import crypto from 'crypto'
import { Service } from 'typedi'

import config from '../config'

export type SignedRequest = {
  url: string
  name: string
}

@Service()
export class S3Service {
  private s3: AWS.S3
  private bucket: string = config('BUCKET_NAME')
  private region: string = config('BUCKET_REGION')

  constructor() {
    // Configuring AWS
    AWS.config = new AWS.Config({
      accessKeyId: config('S3_KEY'),
      secretAccessKey: config('S3_SECRET'),
      region: this.region,
    })
    // Creating a S3 instance
    this.s3 = new AWS.S3()
  }

  async generatePutUrl(
    Key: string,
    ContentType: string
  ): Promise<SignedRequest> {
    // Note Bucket is retrieved from the env variable above.
    Key = 'sub' + crypto.randomBytes(16).toString('hex') + Key
    const params = {
      Bucket: this.bucket,
      Key,
      ContentType: ContentType,
      ACL: 'bucket-owner-full-control',
    }
    const signedUrl = await this.s3.getSignedUrlPromise('putObject', params)
    return {
      url: signedUrl,
      name: this.getPublicUrl(Key),
    }
  }

  async generateGetUrl(Key: string) {
    const params = { Bucket: this.bucket, Key, Expires: 120 }
    const signedUrl = await this.s3.getSignedUrlPromise('getObject', params)
    return signedUrl
  }

  getPublicUrl(Key: string) {
    return 'https://hardsands.s3.us-west-1.amazonaws.com/' + Key
  }

  async removePublicUrl(url: string) {
    return url.replace('https://hardsands.s3.us-west-1.amazonaws.com/', '')
  }

  async generateAssetsPutUrl(Key: string, ContentType: string) {
    // Note Bucket is retrieved from the env variable above.
    Key = 'ass' + crypto.randomBytes(16).toString('hex') + '-' + Key
    const params = {
      Bucket: 'hardsands',
      Key,
      ContentType,
      ACL: 'bucket-owner-full-control',
    }
    const signedUrl = await this.s3.getSignedUrlPromise('putObject', params)
    return {
      url: signedUrl,
      name: Key,
    }
  }
}
