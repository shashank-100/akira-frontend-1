interface MainContentProps {
  activeTab: string;
}

export default function MainContent({ activeTab }: MainContentProps) {
  return (
    <div className="p-6">
      {activeTab === "overview" && (
        <div>Overview Content</div>
      )}
      {activeTab === "campaigns" && (
        <div>Campaigns Content</div>
      )}
      {activeTab === "reports" && (
        <div>Reports Content</div>
      )}
    </div>
  )
}