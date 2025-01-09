import { ReactNode } from "react";

export function Wrapper({ children }: { children: ReactNode }) {
    return <div className="px-4">{children}</div>

}
