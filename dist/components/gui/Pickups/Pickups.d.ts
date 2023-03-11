/// <reference types="react" />
import { PrendyStoreHelpers, PickupsInfoPlaceholder } from "../../../stores/typedStoreHelpers";
export declare function get_Pickups<StoreHelpers extends PrendyStoreHelpers, PickupName extends string, PickupsInfo extends PickupsInfoPlaceholder<PickupName>>(storeHelpers: StoreHelpers, pickupsInfo: PickupsInfo): (_props: {}) => JSX.Element;
