"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { SiTicktick } from "react-icons/si";
import { IoMdClose } from "react-icons/io";

export function Toaster() {
  const { toasts, dismiss, } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function({ id, title, description, subheading, ...props }) {
        return (
          <Toast key={id} {...props} className="bg-green-700 border-none">
            <div className="grid gap-1">

              <ToastTitle className="text-white flex justify-between gap-2">
                <div className="daisy-btn daisy-btn-ghost daisy-btn-sm daisy-btn-square
                    cursor-default bg-none hover:bg-black/0">
                  <SiTicktick size={18} className="text-yellow-300" />
                </div>
                <div className="space-y-2">
                  {title && (
                    <div className="tracking-wide text-lg flex-1">
                      {title}
                    </div>
                  )}
                  {description && (
                    <div className="font-normal tracking-widest">
                      {description}
                    </div>
                  )}
                  {subheading && (
                    <div className="font-normal tracking-widest">
                      {subheading}
                    </div>
                  )}
                </div>
                <button
                  className="daisy-btn daisy-btn-square daisy-btn-sm daisy-btn-ghost
                    text-red-100 hover:text-red-50"
                  onClick={() => dismiss(id)}
                >
                  <IoMdClose size={20} />
                </button>
              </ToastTitle>
            </div>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
