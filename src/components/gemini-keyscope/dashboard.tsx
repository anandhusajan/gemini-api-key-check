"use client"

import Header from "./header"
import ModelsTable from "./models-table"

type DashboardProps = {
  apiKey: string
  onReset: () => void
}

export default function Dashboard({ apiKey, onReset }: DashboardProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onReset={onReset} />
      <main className="flex-1 p-4 md:p-8">
        <ModelsTable apiKey={apiKey} />
      </main>
    </div>
  )
}
