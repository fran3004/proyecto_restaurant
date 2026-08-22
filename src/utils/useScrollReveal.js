import { useEffect, useRef } from 'react';

function useScrollReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    container.classList.add('scroll-reveal-ready');
    const elements = container.querySelectorAll('[data-reveal]');
    const supportsIntersectionObserver = 'IntersectionObserver' in window;
    let observer = null;

    if (!supportsIntersectionObserver) {
      elements.forEach(element => element.classList.add('is-visible'));
    } else {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }

    const observeRevealElements = nodes => {
      nodes.forEach(element => {
        if (element.classList.contains('is-visible')) return;
        if (supportsIntersectionObserver) observer.observe(element);
        else element.classList.add('is-visible');
      });
    };

    observeRevealElements(elements);

    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;

          const revealElements = [];
          if (node.matches('[data-reveal]')) revealElements.push(node);
          revealElements.push(...node.querySelectorAll('[data-reveal]'));
          observeRevealElements(revealElements);
        });
      });
    });

    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return containerRef;
}

export default useScrollReveal;
