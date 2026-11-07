"use client";

import { useState } from "react";

/**
 * Long guest notes can be several paragraphs. The cards keep a predictable
 * height by showing a five-line preview and letting the reader expand the
 * full note in place. The threshold is only used to decide whether the
 * control is useful; CSS does the actual clamping.
 */
const PREVIEW_LENGTH = 220;

export default function ReviewText({
  body,
  className = "",
}: {
  body: string;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const canExpand = body.length > PREVIEW_LENGTH;

  return (
    <div>
      <p
        className={`${className} whitespace-pre-line break-words ${
          canExpand && !expanded ? "line-clamp-5" : ""
        }`}
      >
        {body}
      </p>
      {canExpand ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="link-line mt-3 inline-block font-mono text-[9px] uppercase tracking-[0.16em] text-walnut"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      ) : null}
    </div>
  );
}
