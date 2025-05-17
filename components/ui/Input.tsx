import { cn } from '@/utils/classMerge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500',
        className
      )}
    />
  )
}
