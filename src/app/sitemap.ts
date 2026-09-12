import type { MetadataRoute } from "next";
import { products } from "@/config/navigation";
import { articles } from "@/content/blog";
import { site } from "@/config/site";
export default function sitemap():MetadataRoute.Sitemap{const paths=["","product","pricing","blog","contacts","download","video","privacy",...products.map((x)=>`product/${x.slug}`),...articles.map((x)=>`blog/${x.slug}`)];return paths.map((path)=>({url:`${site.url}/${path}${path?"/":""}`,lastModified:new Date(),changeFrequency:path.startsWith("blog/")?"monthly":"weekly",priority:path===""?1:path.split("/").length===1?.8:.7}));}
