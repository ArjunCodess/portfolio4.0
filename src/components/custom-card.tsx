import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
    title: string;
    description: string;
    dates: string;
    image?: string;
    links?: readonly {
        icon: React.ReactNode;
        title: string;
        href: string;
    }[];
}

export function CustomCard({
    title,
    description,
    dates,
    links,
}: Props) {
    return (
        <li className="relative mx-10 py-7">
            <div className="flex flex-1 flex-col justify-start gap-2">
                {dates && (
                    <time className="text-xs text-muted-foreground">{dates}</time>
                )}
                <h2 className="font-semibold leading-none">{title}</h2>
                {description && (
                    <span className="prose dark:prose-invert text-sm text-muted-foreground">
                        {description}
                    </span>
                )}
            </div>
            {links && links.length > 0 && (
                <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
                    {links?.map((link, idx) => (
                        <Link href={link.href} key={idx}>
                            <Badge key={idx} title={link.title} className="flex gap-2">
                                {link.icon}
                                {link.title}
                            </Badge>
                        </Link>
                    ))}
                </div>
            )}
        </li>
    );
}
