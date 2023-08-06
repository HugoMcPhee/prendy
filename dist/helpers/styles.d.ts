import { CSSProperties } from "react";
type NamedStyles<T> = {
    [P in keyof T]: CSSProperties;
};
/**
 * Creates a StyleSheet style reference from the given object.
 */
export declare function makeStyles<T extends NamedStyles<T> | NamedStyles<any>>(theStyles: T | NamedStyles<T>): T;
type XOption = "left" | "center" | "right";
type YOption = "top" | "center" | "bottom";
type WayOption = "right" | "down";
type AddLayoutOptions = {
    x: XOption;
    y: YOption;
    way?: WayOption;
};
export declare function addLayout(options: AddLayoutOptions | "center"): {
    display: string;
    flexDirection: "column";
    alignItems: string | undefined;
    justifyContent: string | undefined;
} | {
    display: string;
    flexDirection: "row";
    justifyContent: string | undefined;
    alignItems: string | undefined;
};
type StyleNumber = number | string;
type AddFixedOptions = {
    x?: StyleNumber;
    y?: StyleNumber;
    top?: StyleNumber;
    bottom?: StyleNumber;
    left?: StyleNumber;
    right?: StyleNumber;
};
export declare function addFixed(options?: AddFixedOptions): {
    position: "absolute";
    top: string | undefined;
    left: string | undefined;
    bottom: string | undefined;
    right: string | undefined;
};
export {};
