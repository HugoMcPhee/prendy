import { CSSProperties } from "react";
type NamedStyles<T> = { [P in keyof T]: CSSProperties };

/**
 * Creates a StyleSheet style reference from the given object.
 */
// export function create<T extends NamedStyles<T> | NamedStyles<any>>(
//   styles: T | NamedStyles<T>
// ): T;

export function makeStyles<T extends NamedStyles<T> | NamedStyles<any>>(theStyles: T | NamedStyles<T>): T {
  return theStyles as T;
}

type XOption = "left" | "center" | "right";
type YOption = "top" | "center" | "bottom";
type WayOption = "right" | "down";

function xOptionToFlexOption(x: XOption) {
  if (x === "center") return "center";
  if (x === "left") return "flex-start";
  if (x === "right") return "flex-end";
}
function yOptionToFlexOption(y: YOption) {
  if (y === "center") return "center";
  if (y === "top") return "flex-start";
  if (y === "bottom") return "flex-end";
}

type AddLayoutOptions = {
  x: XOption;
  y: YOption;
  way?: WayOption;
};

export function addLayout(options: AddLayoutOptions | "center") {
  if (options === "center") {
    return {
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "center" as "center",
      alignItems: "center" as "center",
    };
  }

  const { x, y, way } = options;

  if (way === "down") {
    return {
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: xOptionToFlexOption(x),
      justifyContent: yOptionToFlexOption(y),
    };
  }

  return {
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: xOptionToFlexOption(x),
    alignItems: yOptionToFlexOption(y),
  };
}

type StyleNumber = number | string;

type AddFixedOptions = {
  x?: StyleNumber;
  y?: StyleNumber;
  top?: StyleNumber;
  bottom?: StyleNumber;
  left?: StyleNumber;
  right?: StyleNumber;
};

function numberToPixels(styleNumber?: StyleNumber) {
  return typeof styleNumber === "number" ? styleNumber.toString() + "px" : styleNumber;
}

export function addFixed(options: AddFixedOptions = {}) {
  const { x, y, top, bottom, left, right } = options;

  const chosenStuff = {
    top: top ?? y ?? (bottom === undefined ? 0 : undefined),
    left: left ?? x ?? (right === undefined ? 0 : undefined),
    bottom,
    right,
  };

  return {
    position: "absolute" as "absolute",
    top: numberToPixels(chosenStuff.top),
    left: numberToPixels(chosenStuff.left),
    bottom: numberToPixels(chosenStuff.bottom),
    right: numberToPixels(chosenStuff.right),
  };
}
