import { cn } from "@/lib/utils";
import Link from "next/link";

export type breadBrumbLink = { name: string, url?: string };

export function BreadBrumbs({ links, className }: { links: breadBrumbLink[], className?: string }) {
    return (
        <div className={cn("daisy-breadcrumbs text-sm tracking-wide", className)}>
            <ul>
                {links.map((link, idx) => (
                    <li key={`b-link-${idx}`}>
                        {link.url ? (
                            <Link href={link.url}>{link.name}</Link>
                        ) : (
                            <span className="text-gray-500 font-semibold">{link.name}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
