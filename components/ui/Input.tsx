import { cn } from '@/utils/classMerge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ className, label, error, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <input
        {...props}
        className={cn(
          'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500',
          error && 'border-red-500',
          className
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
