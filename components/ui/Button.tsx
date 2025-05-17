import { cn } from '@/utils/classMerge'

export default function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        'bg-zinc-600 hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded-lg transition',
        className
      )}
    />
  )
}
