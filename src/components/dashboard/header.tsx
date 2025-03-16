import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 border-b border-zinc-800">
      <div></div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-6 w-6" />
        </Button>
        <div className="h-10 w-10 rounded-full overflow-hidden">
        <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
    </div>
  )
}