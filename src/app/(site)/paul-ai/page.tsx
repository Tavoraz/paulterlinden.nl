import { PaulAiChat } from "@/components/paul-ai-chat";
import { createPageMetadata } from "@/lib/metadata";

export const revalidate = 120;

export const metadata = createPageMetadata({
  title: "Paul AI",
  description:
    "Chat met Paul AI over bestuur, teams en leiderschap in professional service firms.",
  path: "/paul-ai",
});

export default function PaulAiPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <PaulAiChat />
    </div>
  );
}
