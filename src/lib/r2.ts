
// import {
//   S3Client,
//   PutObjectCommand,
//   GetObjectCommand,
//   DeleteObjectCommand,
// } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { env } from "./env";

// const r2 = new S3Client({
//   region: "auto",
//   endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
//   credentials: {
//     accessKeyId: env.R2_ACCESS_KEY_ID,
//     secretAccessKey: env.R2_SECRET_ACCESS_KEY,
//   },
// });

// type UploadAudioOptions = {
//   buffer: Buffer;
//   key: string;
//   contentType?: string;
// };

// export async function uploadAudio({
//   buffer,
//   key,
//   contentType = "audio/wav",
// }: UploadAudioOptions): Promise<void> {
//   await r2.send(
//     new PutObjectCommand({
//       Bucket: env.R2_BUCKET_NAME,
//       Key: key,
//       Body: buffer,
//       ContentType: contentType,
//     }),
//   );
// };

// export async function deleteAudio(key: string): Promise<void> {
//   await r2.send(
//     new DeleteObjectCommand({
//       Bucket: env.R2_BUCKET_NAME,
//       Key: key,
//     }),
//   );
// };

// export async function getSignedAudioUrl(key: string): Promise<string> {
//   const command = new GetObjectCommand({
//     Bucket: env.R2_BUCKET_NAME,
//     Key: key,
//   });
//   return getSignedUrl(r2, command, { expiresIn: 3600 }); // 1 hour
// };


// i dont have cloudflare r2   so i m using cloudinary 

import dotenv from "dotenv"
dotenv.config()
import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { env } from "./env";
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME!,
  api_key: env.CLOUDINARY_API_KEY!,
  api_secret: env.CLOUDINARY_API_SECRET!,
});

console.log(
 env.CLOUDINARY_CLOUD_NAME!,
   env.CLOUDINARY_API_KEY!,
   env.CLOUDINARY_API_SECRET!,
);



type UploadAudioOptions = {
  buffer: Buffer;
  publicId: string;
};

export async function uploadAudio({
  buffer,
  publicId,
}: UploadAudioOptions): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {

console.log({
  publicId,
  size: buffer.length,
});

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video", // Audio files are uploaded as "video"
         folder:"voice-ai/custom/voices",
        public_id: publicId,
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result!);
      }
    );

    stream.end(buffer);
  });
}

export async function deleteAudio(publicId: string) {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: "video",
  });
}


export function getAudioUrl(publicId: string) {
  return cloudinary.url(publicId, {
    resource_type: "video",
    secure: true,
  });
}