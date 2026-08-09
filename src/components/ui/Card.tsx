import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export const cardVariants = cva("card", {
  variants: {
    tone: {
      default: "",
      project: "project-card",
      testimonial: "testimonial-card",
      timeline: "timeline-card",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

type CardProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof cardVariants>;

export default function Card({ as: Comp = "article", tone, className, children }: CardProps) {
  return <Comp className={cn(cardVariants({ tone }), className)}>{children}</Comp>;
}
