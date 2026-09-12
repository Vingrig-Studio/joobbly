"use client";
import type { AnchorHTMLAttributes } from "react";
import { track, type Goal } from "@/lib/analytics";
type Props=AnchorHTMLAttributes<HTMLAnchorElement>&{goal:Goal};
export function TrackedAnchor({goal,onClick,...props}:Props){return <a {...props} onClick={(event)=>{track(goal);onClick?.(event);}} />;}
