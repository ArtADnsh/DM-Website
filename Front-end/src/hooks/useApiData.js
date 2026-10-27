import { useEffect, useState } from "react";

const INITIAL_STATE = { data: null, loading: true, failed: false };

/**
 * Loads data from one of the functions in src/api and tracks its state.
 * Requests are aborted on unmount, so no state is set after navigating away.
 *
 * @param {(options: { signal: AbortSignal }) => Promise<unknown>} load
 * @param {object} [options]
 * @param {(data: unknown) => boolean} [options.isValid] - responses failing this count as a failed load (default: arrays only).
 * @param {unknown[]} [options.deps] - reload when these change.
 * @returns {{ data: unknown, loading: boolean, failed: boolean }}
 */
export function useApiData(load, { isValid = Array.isArray, deps = [] } = {}) {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    const controller = new AbortController();
    setState(INITIAL_STATE);

    load({ signal: controller.signal })
      .then((data) => {
        if (controller.signal.aborted) return;
        const valid = isValid(data);
        setState({ data: valid ? data : null, loading: false, failed: !valid });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Failed to load data:", error);
        setState({ data: null, loading: false, failed: true });
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
