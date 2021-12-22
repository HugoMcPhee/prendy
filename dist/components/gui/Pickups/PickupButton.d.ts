/// <reference types="react" />
import { PrendyStoreHelpers, PickupsInfoPlaceholder } from "../../../concepts/typedStoreHelpers";
export declare function makePickupButton<StoreHelpers extends PrendyStoreHelpers, PickupName extends string, PickupsInfo extends PickupsInfoPlaceholder<PickupName>>(storeHelpers: StoreHelpers, pickupsInfo: PickupsInfo): ({ name }: {
    name: PickupName;
}) => JSX.Element;
