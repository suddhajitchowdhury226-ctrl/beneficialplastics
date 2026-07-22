import { useEffect, useRef, useState } from 'react';

/**
 * Fires once when the element scrolls into the viewport.
 * @param {number} threshold  – 0..1, how much of the element must be visible
 * @param {string} rootMargin – CSS margin string e.g. '0px 0px -60px 0px'
 */
export function useInView(threshold = 0.12, rootMargin = '0px 0px -60px 0px') {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // trigger once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
