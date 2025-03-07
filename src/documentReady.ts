/**
 * Resolve when document is ready
 */
export const documentReady = (): Promise<void> => Promise
  .resolve()
  .then(() => {
    if (document.readyState === 'complete') {
      return;
    }

    return new Promise<void>((resolve) => {
      window.addEventListener('load', () => resolve(), {once: true});
    });
  });
