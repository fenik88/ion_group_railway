import { LanguageProvider } from "@/lib/language-context"
import { HeroSplash } from "@/components/hero-splash"
import { MainContent } from "@/components/main-content"

export default function IonGroup() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground font-sans">
        {/* SPLASH — sticky, fades on scroll */}
        <HeroSplash />

        {/* MAIN CONTENT — sits on top of sticky hero */}
        <MainContent />
      </div>
    </LanguageProvider>
  )
}
