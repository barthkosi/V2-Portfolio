import { Suspense } from "react";

export default function LazyRoute({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div>.</div>}>{children}</Suspense>;
}
