import { Check, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { UseFormReturn } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { DEFAULT_IMAGES } from "@/constants/images"
import { unsplash } from "@/lib/unsplash"
import { cn } from "@/lib/utils"

export function FormPicker(form: UseFormReturn<any>) {
  const [images, setImages] =
    useState<Array<Record<string, any>>>(DEFAULT_IMAGES)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        })
        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>
          setImages(newImages)
        } else {
          console.error("Failed to get images from Unsplash")
        }
      } catch (error) {
        console.error(error)
        setImages(DEFAULT_IMAGES)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  const handleImageSelect = (image: Record<string, any>) => {
    if (pending) return
    setSelectedImageId(image.id)
    form.setValue(
      "image",
      `${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`,
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  const pending = form.formState.isSubmitting

  return (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormControl className="relative">
            <div className="mb-2 grid grid-cols-3 gap-2">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={cn(
                    "group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75",
                    pending && "cursor-auto opacity-50 hover:opacity-50",
                  )}
                  onClick={() => handleImageSelect(image)}
                >
                  <input
                    {...field}
                    type="radio"
                    disabled={pending}
                    checked={selectedImageId === image.id}
                    value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                    className="hidden"
                    readOnly
                  />
                  <Image
                    src={image.urls.thumb}
                    alt="Unsplash image"
                    className="rounded-sm object-cover"
                    fill
                  />
                  {selectedImageId === image.id && (
                    <div className="absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/30">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <Link
                    href={image.links.html}
                    target="_blank"
                    className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
                  >
                    {image.user.name}
                  </Link>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
