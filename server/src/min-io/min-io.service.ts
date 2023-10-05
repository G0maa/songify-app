import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';

@Injectable()
export class MinIoService extends Client implements OnModuleInit {
  constructor(configService: ConfigService) {
    super({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: configService.get<string>('MINIO_ACCESS_KEY'),
      secretKey: configService.get<string>('MINIO_SECRET_KEY'),
    });
  }

  // I think this is the job of IaC.
  async onModuleInit() {
    const isExist = await this.bucketExists('profile-pictures');
    if (!isExist) {
      await this.makeBucket('profile-pictures');
      await this.setBucketPolicy(
        'profile-pictures',
        `{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "AWS": [
                        "*"
                    ]
                },
                "Action": [
                    "s3:GetBucketLocation",
                    "s3:ListBucket"
                ],
                "Resource": [
                    "arn:aws:s3:::profile-pictures"
                ]
            },
            {
                "Effect": "Allow",
                "Principal": {
                    "AWS": [
                        "*"
                    ]
                },
                "Action": [
                    "s3:GetObject"
                ],
                "Resource": [
                    "arn:aws:s3:::profile-pictures/*"
                ]
            }
        ]
    }`,
      );
    }
  }
}
