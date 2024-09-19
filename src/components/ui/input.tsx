import * as React from "react"

import { cn } from "@/lib/utils"
import IconEye from "../../../public/assets/icons/IconEye"
import IconEyeOff from "../../../public/assets/icons/IconEyeOff"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode,
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false)
    const handlePassword = () => {
      setVisible(!visible)
    }
    return (
      <div className={cn("relative has-[:focus]:border-blue-400 flex items-center h-12 rounded-lg border-2 border-gray-700 border-input shadow-sm focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground", className)}>
        {props.icon}
        <input
          type={type === "password" ? (visible ? "text" : "password") : type}
          className={cn(
            "flex-1 outline-none bg-transparent h-full px-3 py-1 text-sm rounded-lg",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <div className="hover:cursor-pointer" onClick={handlePassword}>
            {visible ? <IconEye width={20} height={20} className={cn("mr-2 text-slate-500")} /> : <IconEyeOff width={20} height={20} className={cn("mr-2 text-slate-500")} />}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
