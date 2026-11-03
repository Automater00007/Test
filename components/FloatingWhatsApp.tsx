import { site } from "@/lib/content";

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
        "Hello Jade River Resort, I would like to enquire about a stay.",
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 overflow-hidden rounded-full bg-forest pl-4 pr-4 text-paper shadow-[0_10px_40px_rgba(33,51,41,0.22)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:gap-3 hover:pr-6 md:bottom-8 md:right-8"
      aria-label="Chat with Jade River Resort on WhatsApp"

    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-500 group-hover:rotate-[-8deg]"
        >
          <path
            d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.82 9.82 0 0 0 4.7 1.2h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 17.94h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.1 8.1 0 0 1-1.25-4.34c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.18-8.2 8.18Zm4.5-6.13c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.55.13-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.04-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.13.17 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.1-.23-.16-.47-.29Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="max-w-0 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:max-w-[9rem] group-hover:opacity-100">
        WhatsApp us
      </span>
      <span className="pointer-events-none absolute right-3 top-3 h-2 w-2 rounded-full bg-copper" />
    </a>
  );
}
