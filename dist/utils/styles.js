/**
 * Creates a StyleSheet style reference from the given object.
 */
// export function create<T extends NamedStyles<T> | NamedStyles<any>>(
//   styles: T | NamedStyles<T>
// ): T;
export function makeStyles(theStyles) {
    return theStyles;
}
function xOptionToFlexOption(x) {
    if (x === "center")
        return "center";
    if (x === "left")
        return "flex-start";
    if (x === "right")
        return "flex-end";
}
function yOptionToFlexOption(y) {
    if (y === "center")
        return "center";
    if (y === "top")
        return "flex-start";
    if (y === "bottom")
        return "flex-end";
}
export function andLayout(options) {
    if (options === "center") {
        return {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        };
    }
    const { x, y, way } = options;
    if (way === "down") {
        return {
            display: "flex",
            flexDirection: "column",
            alignItems: xOptionToFlexOption(x),
            justifyContent: yOptionToFlexOption(y),
        };
    }
    return {
        display: "flex",
        flexDirection: "row",
        justifyContent: xOptionToFlexOption(x),
        alignItems: yOptionToFlexOption(y),
    };
}
function numberToPixels(styleNumber) {
    return typeof styleNumber === "number"
        ? styleNumber.toString() + "px"
        : styleNumber;
}
export function andFixed(options = {}) {
    var _a, _b;
    const { x, y, top, bottom, left, right } = options;
    const chosenStuff = {
        top: (_a = top !== null && top !== void 0 ? top : y) !== null && _a !== void 0 ? _a : (bottom === undefined ? 0 : undefined),
        left: (_b = left !== null && left !== void 0 ? left : x) !== null && _b !== void 0 ? _b : (right === undefined ? 0 : undefined),
        bottom,
        right,
    };
    return {
        position: "absolute",
        top: numberToPixels(chosenStuff.top),
        left: numberToPixels(chosenStuff.left),
        bottom: numberToPixels(chosenStuff.bottom),
        right: numberToPixels(chosenStuff.right),
    };
}
