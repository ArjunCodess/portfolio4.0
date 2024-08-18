import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
    title: string;
    description: string;
    dates?: string;
}

export function CustomCard({
    title,
    description,
    dates
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
        </li>
    );
}
