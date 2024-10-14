"use client"

import { useState } from "react"

import { trpc } from "@/trpc/react"

export function LatestPost() {
  const [latestPost] = trpc.post.getLatest.useSuspenseQuery()

  const utils = trpc.useUtils()
  const [name, setName] = useState("")
  const createPost = trpc.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate()
      setName("")
    },
  })

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createPost.mutate({ name })
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  )
}

export function AllPosts() {
  const [posts] = trpc.post.getAll.useSuspenseQuery()

  return (
    <div className="grid grid-cols-2 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="rounded-lg bg-white/10 p-4">
          <h2 className="text-lg font-semibold">{post.name}</h2>
        </div>
      ))}
    </div>
  )
}
