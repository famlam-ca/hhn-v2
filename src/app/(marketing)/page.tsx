import { CTASection } from "./_components/cta-section"
import { FeatureSection } from "./_components/feature-section"
import { FAQSection } from "./_components/pricing-section"
import { ProductSection } from "./_components/product-section"

export default function MarketingPage() {
  return (
    <main className="flex flex-col">
      <CTASection />
      <FeatureSection />
      <ProductSection />
      <FAQSection />
    </main>
  )
}
