"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
export function DownloadTracker() { useEffect(() => track("download_page_open"), []); return null; }
