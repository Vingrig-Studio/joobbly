"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track, type Goal } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & { goal: Goal };

export function TrackedLink({ goal, onClick, ...props }: Props) {
  return <Link {...props} onClick={(event) => { track(goal); onClick?.(event); }} />;
}
