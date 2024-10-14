import { createUploadthing, type FileRouter } from "uploadthing/next"

import { validateSession } from "@/server/auth"
import { db } from "@/server/db"

const f = createUploadthing()

const middleware = async () => {
  const { user } = await validateSession()
  if (!user) {
    throw new Error("Unauthorized")
  }

  return { userId: user.id }
}

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>
  file: {
    key: string
    name: string
    url: string
  }
}) => {
  const isFileExist = await db.file.findFirst({
    where: { key: file.key },
  })
  if (isFileExist) return

  const createdFile = await db.file.create({
    data: {
      name: file.name,
      uploadStatus: "processing",
      url: file.url,
      key: file.key,
      userId: metadata.userId,
    },
  })

  try {
    await db.file.update({
      where: { id: createdFile.id },
      data: { uploadStatus: "completed" },
    })
  } catch {
    await db.file.update({
      where: { id: createdFile.id },
      data: { uploadStatus: "failed" },
    })
  }
}

export const ourFileRouter = {
  fileUpload: f({ image: { maxFileSize: "4MB" } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
