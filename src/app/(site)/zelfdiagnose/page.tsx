import { SelfDiagnosisTool } from "@/components/self-diagnosis-tool";
import { createPageMetadata } from "@/lib/metadata";

export const revalidate = 120;

export const metadata = createPageMetadata({
  title: "Zelfdiagnose",
  description:
    "Kies eerst je persona en doorloop daarna de zelfdiagnose die past bij jouw rol: managing partner, COO, vakgroep- of clientteamleider, of (pre-)partner.",
  path: "/zelfdiagnose",
});

export default function SelfDiagnosisPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <SelfDiagnosisTool />
    </div>
  );
}
