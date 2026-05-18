import Link from "next/link";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <Container size="default" className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
        404
      </p>
      <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl">
        Page off-platform.
      </h1>
      <p className="mt-4 max-w-md text-sm text-[color:var(--color-fg-muted)] md:text-base">
        The page you&apos;re looking for doesn&apos;t exist — or has been moved.
        Let&apos;s get you back to the floor.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button asChild size="lg" variant="primary">
          <Link href={ROUTES.home}>Back to home</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={ROUTES.shop}>Shop the line</Link>
        </Button>
      </div>
    </Container>
  );
}
