import { CSSProperties } from "react";
declare type NamedStyles<T> = {
    [P in keyof T]: CSSProperties;
};
/**
 * Creates a StyleSheet style reference from the given object.
 */
export declare function makeStyles<T extends NamedStyles<T> | NamedStyles<any>>(theStyles: T | NamedStyles<T>): T;
declare type XOption = "left" | "center" | "right";
declare type YOption = "top" | "center" | "bottom";
declare type WayOption = "right" | "down";
declare type AndLayoutOptions = {
    x: XOption;
    y: YOption;
    way?: WayOption;
};
export declare function andLayout(options: AndLayoutOptions | "center"): {
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
declare type StyleNumber = number | string;
declare type AndFixedOptions = {
    x?: StyleNumber;
    y?: StyleNumber;
    top?: StyleNumber;
    bottom?: StyleNumber;
    left?: StyleNumber;
    right?: StyleNumber;
};
export declare function andFixed(options?: AndFixedOptions): {
    position: "absolute";
    top: string | undefined;
    left: string | undefined;
    bottom: string | undefined;
    right: string | undefined;
};
export {};
