import { cn } from "@/lib/utils";
import Link from "next/link";

export type breadBrumbLink = { name: string, url?: string };

export function BreadBrumbs({ links, className }: { links: breadBrumbLink[], className?: string }) {
    return (
        <div className={cn("daisy-breadcrumbs text-sm", className)}>
            <ul>
                {links.map((link, idx) => (
                    <li key={`b-link-${idx}`}>
                        {link.url ? (
                            <Link href={link.url}>{link.name}</Link>
                        ) : (
                            <span>{link.name}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
