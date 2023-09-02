export default function keyboards() {
  const state = () => ({
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    KeyQ: false,
    KeyE: false,
    ShiftLeft: false,
    ControlLeft: false,
    Space: false,
    Enter: false,
    KeyZ: false,
    KeyM: false,
    KeyP: false,
  });

  const refs = () => ({});

  // const startStates: InitialItemsState<typeof state> = {
  const startStates = {
    main: state(),
  };

  return { startStates, state, refs };
}
