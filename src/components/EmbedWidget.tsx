"use client";

import { useEffect } from "react";

/**
 * A feed widget from a service such as Elfsight, SociableKIT or Behold. These services hand out a snippet made of a
 * `<div>` (a class, sometimes a data attribute) and a `<script src>`. The div is drawn here and the script is added to
 * the page once; the service fills the div with the latest posts, and keeps it current without any change to the site.
 * Only https scripts are loaded.
 */
export function EmbedWidget({ script, className, attrs }: { script: string; className: string; attrs?: Record<string, string> }) {
  useEffect(() => {
    if (!/^https:\/\//i.test(script)) return;
    if (document.querySelector(`script[src="${script}"]`)) return;
    const el = document.createElement("script");
    el.src = script;
    el.async = true;
    el.defer = true;
    document.body.appendChild(el);
  }, [script]);

  return <div className={className} {...attrs} />;
}
