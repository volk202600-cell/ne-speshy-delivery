import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Phone } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-foreground">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/bar-hero.jpg"
          alt="Ne Speshi Bar - затишний бар"
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/logo.jpg"
              alt="Ne Speshi Bar"
              width={280}
              height={120}
              className="h-20 w-auto rounded-sm bg-background/90 p-2 md:h-28 lg:h-32"
              priority
            />
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            Доставка з бару
          </p>
          <p className="mb-8 mx-auto max-w-lg text-base leading-relaxed text-background/70 md:text-lg">
            Не поспішай. Насолоджуйся смаком. Замовляй улюблені страви та
            напої з доставкою додому.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="#menu">
              <Button size="lg" className="w-full text-base sm:w-auto">
                Переглянути меню
              </Button>
            </a>
            <a href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background text-base sm:w-auto"
              >
                Контакти
              </Button>
            </a>
          </div>

          {/* Info chips */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 backdrop-blur-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm text-background/90">
                10:00 - 23:00
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 backdrop-blur-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm text-background/90">
                Доставка по місту
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 backdrop-blur-sm">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm text-background/90">
                Замовлення в Telegram
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
