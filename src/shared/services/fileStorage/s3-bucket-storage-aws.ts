import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BucketStorage } from 'src/shared/interfaces/bucket-storage';

export class S3BucketStorageAws implements BucketStorage {
    private readonly client: S3Client;

    constructor() {
        this.client = new S3Client({
            credentials: {
                accessKeyId: process.env.ACCESS_KEY,
                secretAccessKey: process.env.SECRET_ACCESS_KEY,
            },
            region: process.env.BUCKET_REGION,
        });
    }

    public async pushObject(filename: string, buffer: Buffer, mimetype: string): Promise<void> {
        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: filename,
            Body: buffer,
            ContentType: mimetype,
        });
        await this.client.send(command);
    }

    public async getObjectUrl(key: string): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: key,
        });
        const url = await getSignedUrl(this.client, command, { expiresIn: 3600 });
        return url;
    }

    public async deleteObject(key: string): Promise<void> {
        const command = new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: key,
        });
        await this.client.send(command);
    }
}
