import Image from "next/image";

type BuilderSectionHeaderProps = {
  title: string;
  description?: string;
  iconSrc: string;
};

export function BuilderSectionHeader({ title, description, iconSrc }: BuilderSectionHeaderProps) {
  return (
    <div className="flex gap-4">
      <Image
        src={iconSrc}
        alt=""
        width={64}
        height={64}
        className="h-14 w-14 shrink-0 object-contain"
      />
      <div>
        <h3 className="font-black [font-family:var(--font-baloo)]">{title}</h3>
        {description ? <p className="mt-1 text-sm text-[#333333]/80">{description}</p> : null}
      </div>
    </div>
  );
}
