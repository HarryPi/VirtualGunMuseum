import {ButtonModel} from "./Button.model";

export class DropdownModel {
    constructor(
        public dropdownName: string,
        public dropdownButtons: ButtonModel[]
    ) {
    }
}