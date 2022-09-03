export function clearTimeoutSafe(
  timeout?: ReturnType<typeof setTimeout> | null
) {
  if (timeout !== null && timeout !== undefined) clearTimeout(timeout);
}
