import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs";

const f = createUploadthing();

export const ourFileRouter = {
      imageUploader: f(["image"])
            .middleware(async ({ req }) => {
                  const { userId } = auth();
                  if (!userId) throw new Error("Unauthorized");
                  return { userId };
            })
            .onUploadComplete(async ({ metadata, file }) => {
                  console.log("Upload complete for userId:", metadata.userId);
                  console.log("file url", file.url);
                  return { uploadedBy: metadata.userId };
            }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;