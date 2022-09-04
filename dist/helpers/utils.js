export function clearTimeoutSafe(timeout) {
    if (timeout !== null && timeout !== undefined)
        clearTimeout(timeout);
}
