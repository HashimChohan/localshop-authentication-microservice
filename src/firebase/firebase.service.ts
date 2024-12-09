import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {

    public async verifyAccessToken(token: string) {
        let auth = admin.auth();
        let decodedToken = await auth.verifyIdToken(token);
        return decodedToken.uid;
    }

    async uploadToFirebase(filePath: string, fileName: string, mimeType: string): Promise<any> {

        let storageRef = admin.storage().bucket();
        return new Promise((resolve, reject) => {
            storageRef.upload(filePath, {
                destination: `images/` + fileName,
                metadata: {
                    contentType: mimeType,
                    cacheControl: 'public, max-age=31536000',
                }
            }).then(() => {
                resolve("");
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
