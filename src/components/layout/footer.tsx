import Link from "next/link";
import { Container } from "@/components/common/container";
import { Logo } from "@/components/common/logo";
import { SITE } from "@/constants/site";
import { CATEGORIES } from "@/constants/categories";
import { ROUTES } from "@/constants/routes";
import { Marquee } from "@/components/animations/marquee";
import {
  InstagramIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/common/brand-icons";

const SHOP_LINKS = [
  { label: "All Products", href: ROUTES.shop },
  ...CATEGORIES.slice(0, 6).map((c) => ({
    label: c.name,
    href: ROUTES.category(c.slug),
  })),
];

const HELP_LINKS = [
  { label: "Contact", href: ROUTES.contact },
  { label: "Shipping & Returns", href: ROUTES.faq },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Track Order", href: ROUTES.track },
  { label: "FAQ", href: ROUTES.faq },
];

const COMPANY_LINKS = [
  { label: "About", href: ROUTES.about },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Careers", href: "/careers" },
  { label: "Press", href: "/press" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--color-border)] bg-[color:var(--color-ink)] text-white">
      <Marquee className="border-y border-[color:var(--color-border)] py-6" speed="slow">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="font-display text-3xl font-bold uppercase tracking-tight text-white/15 sm:text-4xl md:text-5xl"
          >
            {SITE.name} • {SITE.tagline} •
          </span>
        ))}
      </Marquee>

      <Container size="wide" className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-16">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-[color:var(--color-fg-muted)]">
              {SITE.description}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <SocialIcon href={SITE.social.instagram} label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={SITE.social.tiktok} label="TikTok">
                <TiktokIcon className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={SITE.social.youtube} label="YouTube">
                <YoutubeIcon className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={SITE.social.twitter} label="Twitter">
                <TwitterIcon className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Help" links={HELP_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 border-t border-[color:var(--color-border)] pt-8 text-xs text-[color:var(--color-fg-muted)] md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5 text-sm text-[color:var(--color-fg-muted)]">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-white/70 transition-colors hover:border-white/60 hover:text-white"
    >
      {children}
    </Link>
  );
}
