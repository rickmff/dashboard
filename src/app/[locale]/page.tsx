"use client";

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BarChart4, LayoutDashboard, Users } from "lucide-react"
import { useI18n } from "@/i18n/client"

export default function Home() {
  const { t, locale } = useI18n();

  const features = [
    {
      titleKey: "home.features.realTimeAnalytics.title",
      descriptionKey: "home.features.realTimeAnalytics.description",
      icon: <BarChart4 className="w-6 h-6 text-primary" />,
    },
    {
      titleKey: "home.features.customDashboards.title",
      descriptionKey: "home.features.customDashboards.description",
      icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
    },
    {
      titleKey: "home.features.teamCollaboration.title",
      descriptionKey: "home.features.teamCollaboration.description",
      icon: <Users className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-muted">
              🚀 {t('home.hero.launching')}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t('home.hero.title')} <br />
              <span className="text-primary">Solution</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {t('home.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 min-[400px]:items-center">
              <Link href={`/${locale}/dashboard`}>
                <Button size="lg" className="w-full sm:w-auto">
                  {t('home.hero.getStarted')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/${locale}/pricing`}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {t('home.hero.viewPricing')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 rounded-lg border bg-background p-2 shadow-2xl">
            <Image
              src="/dashboard-preview.png"
              alt="Dashboard Preview"
              width={2880}
              height={1620}
              className="rounded-lg border bg-muted"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-muted/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('home.features.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('home.features.description')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-background border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{t(feature.titleKey)}</h3>
                <p className="text-muted-foreground">{t(feature.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-background">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-4">{t('home.cta.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('home.cta.description')}
          </p>
          <Link href={`/${locale}/dashboard`}>
            <Button size="lg">
              {t('home.cta.button')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}