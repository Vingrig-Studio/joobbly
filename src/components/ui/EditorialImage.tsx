import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function EditorialImage({ src, alt, className = "", priority = false, sizes = "(max-width: 680px) 100vw, 50vw" }: Props) {
  return <div className={`editorial-image ${className}`.trim()}>
    <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
  </div>;
}
