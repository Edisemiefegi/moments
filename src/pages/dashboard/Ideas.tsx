import FilterIdea from "@/components/dashboard/FilterIdea"
import { Sparkle } from "lucide-react"

function Ideas() {
  return (
    <main className="p-8 space-y-6">
      <header>
        <h1 className="font-medium text-2xl flex gap-1"><Sparkle className="text-primary"/>Date Ideas</h1>
        <p className="text-text">Find the perfect date. filter by what feels right.</p>
      </header>
      <FilterIdea/>
    </main>
  )
}

export default Ideas