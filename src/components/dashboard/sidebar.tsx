import Image from "next/image";
import { LayoutDashboardIcon, MegaphoneIcon, NewspaperIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AkiraLogo } from "@/assets";

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }

  export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-[#060607] border-r border-zinc-800 flex flex-col">
      <div className="p-6">
        <Image src={AkiraLogo} alt="Akira Logo" width={100} height={100} />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <Button
          variant={activeTab === "overview" ? "default" : "ghost"}
          className={`justify-start ${activeTab === "overview" ? "bg-[#E13D2D] text-white text-[20px] tracking-[2px] font-[400] leading-[100%]" : "font-[300] text-[18px] hover:text-[#e13d2d]"}`}
          onClick={() => setActiveTab("overview")}
        >
          <LayoutDashboardIcon className="mr-2 h-6 w-6" />
          Overview
        </Button>
        
        <Button
          variant={activeTab === "campaigns" ? "default" : "ghost"}
          className={`justify-start ${activeTab === "campaigns" ? "bg-[#E13D2D] text-white text-[20px] tracking-[2px] font-[400] leading-[100%]" : "font-[300] text-[18px] hover:text-[#e13d2d]"}`}
          onClick={() => setActiveTab("campaigns")}
        >
          <MegaphoneIcon className="mr-2 h-6 w-6" />
          Campaigns
        </Button>

        <Button
          variant={activeTab === "reports" ? "default" : "ghost"}
          className={`justify-start ${activeTab === "reports" ? "bg-[#E13D2D] text-white text-[20px] tracking-[2px] font-[400] leading-[100%]" : "font-[300] text-[18px] hover:text-[#e13d2d]"}`}
          onClick={() => setActiveTab("reports")}
        >
          <NewspaperIcon className="mr-2 h-6 w-6" />
          Reports
        </Button>
      </div>
    </div>
  )
}