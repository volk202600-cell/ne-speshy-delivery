import { Utensils, Wine, Clock, Heart } from "lucide-react"

const features = [
  {
    icon: Utensils,
    title: "Свіжі страви",
    description: "Готуємо з якісних інгредієнтів щодня. Кожна страва - це смак та задоволення.",
  },
  {
    icon: Wine,
    title: "Авторські напої",
    description: "Колекція коктейлів та напоїв від наших барменів для кожного настрою.",
  },
  {
    icon: Clock,
    title: "Швидка доставка",
    description: "Доставимо ваше замовлення гарячим та свіжим якомога швидше.",
  },
  {
    icon: Heart,
    title: "З любов'ю",
    description: "Кожне замовлення готується з увагою до деталей та турботою про вас.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="bg-secondary py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Про нас
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Чому обирають нас</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
