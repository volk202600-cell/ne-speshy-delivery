import Link from "next/link"
import Image from "next/image"
import { Clock, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/images/logo.jpg"
                alt="Ne Speshi Bar"
                width={140}
                height={60}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Не поспішай. Насолоджуйся смаком. Затишний бар з доставкою
              улюблених страв та напоїв.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card-foreground">
              Контакти
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Пн-Нд: 10:00 - 23:00
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Доставка по місту
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Замовлення через сайт
                </span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card-foreground">
              Навігація
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="#menu"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Меню
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Про нас
                </a>
              </li>
              <li>
                <a
                  href="https://ne-speshi-bar.ps.me/?r=q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Poster Menu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            {"2026 Ne Speshi Bar. Всі права захищені."}
          </p>
        </div>
      </div>
    </footer>
  )
}
