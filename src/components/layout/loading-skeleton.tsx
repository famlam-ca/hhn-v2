export const LoadingSkeleton = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2">
        <div className="h-8 w-8 animate-bounce rounded-full bg-foreground [animation-delay:-0.3s]" />
        <div className="h-8 w-8 animate-bounce rounded-full bg-foreground [animation-delay:-0.15s]" />
        <div className="h-8 w-8 animate-bounce rounded-full bg-foreground" />
      </div>
      <div className="flex flex-col text-center sm:flex-row">
        <p className="text-4xl">Loading data...</p>
        <p className="ml-0 text-4xl sm:ml-2">Please wait!</p>
      </div>
    </div>
  )
}
