export function makePointersConnectRules(concepFuncs) {
    const { getRefs, setState, addItem, removeItem } = concepFuncs;
    const onPointerDown = (event) => {
        const pointerId = event.pointerId.toString();
        // NOTE addItem might not have correct types atm
        // addItem({
        //   type: "pointers",
        //   name: pointerId,
        //   state: {
        //     pointerPosition: { x: event.clientX, y: event.clientY },
        //   },
        //   refs: {
        //     pointerId,
        //     firstInputPosition: { x: 0, y: 0 },
        //     isFirstMovement: true,
        //   },
        // });
    };
    const onPointerUp = (event) => {
        // removeItem({
        //   type: "pointers",
        //   name: event.pointerId.toString(),
        // });
    };
    const onDragStart = (event) => {
        event.preventDefault();
    };
    const onContextMenu = (event) => {
        event.preventDefault();
    };
    const updatePointLocation = (event) => {
        const newPointerPosition = {
            x: event.clientX,
            y: event.clientY,
        };
        const pointerId = event.pointerId.toString();
        const pointerRefs = getRefs().pointers[pointerId];
        const pointerExists = !!pointerRefs;
        if (pointerExists) {
            setState({
                pointers: { [pointerId]: { pointerPosition: newPointerPosition } },
            });
        }
    };
    // const onPointerCancel = (event: PointerEvent) => {
    //   console.log("-                            cancel");
    //   if (doesPointerExist(event.pointerId.toString());) {
    //     event.preventDefault();
    //   }
    // };
    // const onPointerOut = (event: PointerEvent) => {
    //   event.preventDefault();
    //   console.log("-                            out");
    // };
    // const onPointerLeave = (event: PointerEvent) => {
    //   event.preventDefault();
    //   console.log("-                            leave");
    // };
    // NOTE this might be better as a helper thing
    // connectPointerStateToOutsideWorld
    // connectPointersStateToInputs
    // connectPointersToInputs
    function connectPointerInputsToState() {
        document.addEventListener("contextmenu", onContextMenu, true);
        document.addEventListener("pointerdown", onPointerDown, true);
        document.addEventListener("pointermove", updatePointLocation, true);
        document.addEventListener("pointerup", onPointerUp, true);
        document.addEventListener("dragstart", onDragStart, true);
        // document.addEventListener("pointercancel", onPointerUp, true);
        // document.addEventListener("pointerout", onPointerOut, true);
        // document.addEventListener("pointerleave", onPointerLeave, true);
    }
    function disconnectPointerInputsToState() {
        document.removeEventListener("contextmenu", onContextMenu, true);
        document.removeEventListener("pointerdown", onPointerDown, true);
        document.removeEventListener("pointermove", updatePointLocation, true);
        document.removeEventListener("pointerup", onPointerUp, true);
        document.removeEventListener("dragstart", onDragStart, true);
        // document.addEventListener("pointercancel", onPointerUp, true);
        // document.addEventListener("pointerout", onPointerOut, true);
        // document.addEventListener("pointerleave", onPointerLeave, true);
    }
    return {
        startAll: connectPointerInputsToState,
        stopAll: disconnectPointerInputsToState,
    };
}
