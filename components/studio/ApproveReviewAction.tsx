import { useState } from "react";
import { useToast } from "@sanity/ui";
import { useClient, type DocumentActionComponent } from "sanity";

/**
 * One-click moderation for guest reviews. Approving publishes the status
 * change immediately so the website can show it; removing sends it back to
 * pending so it disappears from the public list.
 */
export const ApproveReviewAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: "2025-02-19" });
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  if (props.type !== "review") return null;

  const current = props.draft ?? props.published;
  const approved = current?.status === "approved";
  const publishedId = (props.published?._id ?? props.draft?._id ?? "").replace(
    /^drafts\./,
    "",
  );

  if (!publishedId) return null;

  return {
    label: approved ? "Remove from website" : "Approve for website",
    tone: approved ? "critical" : "positive",
    disabled: busy,
    onHandle: async () => {
      setBusy(true);

      try {
        const patch = {
          status: approved ? "pending" : "approved",
          publishedAt: approved ? null : new Date().toISOString(),
        };

        const ids = new Set<string>([publishedId]);
        if (props.draft?._id) ids.add(props.draft._id);

        const transaction = client.transaction();
        for (const id of ids) {
          transaction.patch(id, { set: patch });
        }
        await transaction.commit({ visibility: "async" });

        toast.push({
          status: "success",
          title: approved ? "Review removed from the website" : "Review approved",
        });
        props.onComplete();
      } catch (error) {
        toast.push({
          status: "error",
          title: "Could not update the review",
          description:
            error instanceof Error ? error.message : "Please try again.",
        });
      } finally {
        setBusy(false);
      }
    },
  };
};
