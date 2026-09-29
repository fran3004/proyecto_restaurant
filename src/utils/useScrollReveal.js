import { useEffect, useRef } from 'react';

const REVEAL_FALLBACK_DELAY = 1500;

function useScrollReveal(deps = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    container.classList.add('scroll-reveal-ready');
    const elements = container.querySelectorAll('[data-reveal]');
    const supportsIntersectionObserver = 'IntersectionObserver' in window;
    let observer = null;
    const fallbackTimers = new Map();

    const reveal = element => {
      element.classList.remove('reveal-pending');
      element.classList.add('is-visible');
      const timer = fallbackTimers.get(element);
      if (timer) {
        window.clearTimeout(timer);
        fallbackTimers.delete(element);
      }
    };

    if (!supportsIntersectionObserver) {
      elements.forEach(reveal);
    } else {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }

    const observeRevealElements = nodes => {
      nodes.forEach(element => {
        if (element.classList.contains('is-visible')) return;
        element.classList.add('reveal-pending');
        if (supportsIntersectionObserver && observer) {
          observer.observe(element);
          fallbackTimers.set(element, window.setTimeout(() => reveal(element), REVEAL_FALLBACK_DELAY));
        } else {
          reveal(element);
        }
      });
    };

    observeRevealElements(elements);

    const supportsMutationObserver = 'MutationObserver' in window;
    let mutationObserver = null;
    if (supportsMutationObserver) {
      mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType !== 1) return;

            const revealElements = [];
            if (node.matches && node.matches('[data-reveal]')) revealElements.push(node);
            if (node.querySelectorAll) revealElements.push(...node.querySelectorAll('[data-reveal]'));
            if (revealElements.length > 0) {
              observeRevealElements(revealElements);
            }
          });
        });
      });

      mutationObserver.observe(container, { childList: true, subtree: true });
    }

    return () => {
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      fallbackTimers.forEach(timer => window.clearTimeout(timer));
      fallbackTimers.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

export default useScrollReveal;