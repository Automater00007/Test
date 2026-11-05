"use client";

import { PatchEvent, set, type StringInputProps, type StringSchemaType } from "sanity";
import { TextArea } from "@sanity/ui";
import { useEffect, useRef, useState } from "react";

/**
 * Custom input for the `html` field of the Custom HTML block.
 *
 * Sanity's default text input commits on (almost) every keystroke, which on a
 * Portable Text block triggers an autosave that re-announces focus and collapses
 * the block's edit dialog after a single word. This input keeps the value in
 * local state and only commits on blur (or after a short idle pause), so the
 * editor can type freely and the dialog stays open.
 */
export default function HtmlInput(props: StringInputProps<StringSchemaType>) {
  const { value: propValue, onChange, elementProps, readOnly } = props;
  const [local, setLocal] = useState(propValue ?? "");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<string | null>(null);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Keep local state in sync when the value changes externally (e.g. undo).
  useEffect(() => {
    setLocal(propValue ?? "");
  }, [propValue]);

  const commit = (val: string) => {
    if (val !== (propValue ?? "")) {
      onChange(PatchEvent.from(set(val)));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = event.target.value;
    setLocal(next);
    pendingRef.current = next;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (pendingRef.current !== null) {
        commit(pendingRef.current);
        pendingRef.current = null;
      }
    }, 1500);
    const ep = elementProps as { onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void } | undefined;
    ep?.onChange?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (pendingRef.current !== null) {
      commit(pendingRef.current);
      pendingRef.current = null;
    } else {
      commit(local);
    }
    const ep = elementProps as { onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void } | undefined;
    ep?.onBlur?.(event);
  };

  // Flush any pending edit when the component unmounts (e.g. dialog closes).
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (pendingRef.current !== null) {
        onChangeRef.current(PatchEvent.from(set(pendingRef.current)));
        pendingRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TextArea
      {...(elementProps as unknown as Record<string, unknown>)}
      value={local}
      onChange={handleChange}
      onBlur={handleBlur}
      readOnly={readOnly}
      rows={10}
    />
  );
}