export type RoutingListener = (
  href: string
) => void;

let listeners: RoutingListener[] = [];

/**
 * Add routing listener
 */
export const onRouting = (
  listener: RoutingListener
): () => void => {
  listeners.push(listener);

  return () => {
    listeners = listeners.filter((entry) => entry !== listener);
  };
};

/**
 * Dispatch routing event
 */
const emitRouting: RoutingListener = (href) => {
  listeners.forEach((
    listener
  ) => listener(href));
};

/**
 * Handle internal navigation
 */
document.addEventListener('click', (event) => {
  const {target} = event;
  if (!(target instanceof HTMLAnchorElement)) {
    return;
  }

  const {href} = target;
  if (!href.startsWith(origin)) {
    return;
  }

  event.preventDefault();
  window.history.pushState(undefined, '', href);
  emitRouting(href);
});
