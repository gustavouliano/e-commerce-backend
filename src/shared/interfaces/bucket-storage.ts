export interface BucketStorage {
    pushObject(filename: string, buffer: Buffer, mimetype: string): Promise<void>;
    getObjectUrl(key: string): Promise<string>;
    deleteObject(key: string): Promise<void>;
}
