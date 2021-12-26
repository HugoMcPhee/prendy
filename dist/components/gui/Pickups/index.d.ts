/// <reference types="react" />
import { PrendyStoreHelpers, PickupsInfoPlaceholder } from "../../../stores/typedStoreHelpers";
export declare function makePickups<StoreHelpers extends PrendyStoreHelpers, PickupName extends string, PickupsInfo extends PickupsInfoPlaceholder<PickupName>>(storeHelpers: StoreHelpers, pickupsInfo: PickupsInfo): (_props: {}) => JSX.Element;
