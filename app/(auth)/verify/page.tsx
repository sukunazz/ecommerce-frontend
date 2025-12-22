import { Suspense } from "react";
import VerifyClient from "./VerifyClient";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p>Loading verification...</p>}>
      <VerifyClient />
    </Suspense>
  );
}
