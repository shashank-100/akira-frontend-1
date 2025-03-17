"use client"

import { useState } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import Navbar from "@/components/dashboard/header"
import MainContent from "@/components/dashboard/main-content"
// import ChartPanel from "@/components/dashboard/ChartPanel"

export default function CampaignDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <Navbar />
        <MainContent activeTab={activeTab} />
      </div>
      {/* <ChartPanel /> */}
    </div>
  )
}