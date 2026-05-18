import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/animations/reveal";
import { FAQS } from "@/data/faqs";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <Container size="default" className="py-12 md:py-20">
      <header className="mb-14 flex flex-col gap-4">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
            Answers
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
            Frequently asked.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-sm text-[color:var(--color-fg-muted)] md:text-base">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link href={ROUTES.contact} className="text-white underline-offset-4 hover:underline">
              Get in touch
            </Link>.
          </p>
        </Reveal>
      </header>

      <div className="flex flex-col gap-12">
        {FAQS.map((group) => (
          <section key={group.title}>
            <h2 className="mb-2 font-display text-xl font-semibold text-white">{group.title}</h2>
            <Accordion type="single" collapsible className="mt-2">
              {group.items.map((item, i) => (
                <AccordionItem key={item.q} value={`${group.title}-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>
    </Container>
  );
}
