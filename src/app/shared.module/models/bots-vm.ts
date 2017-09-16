

export class BotVM {
    id: string;
    model: ITradingModel;
    name: string;
    description: string;
    author: string;
    orderType: string;
    orderAmount: string;
}
export class BotListItemVM {
    id: string;
    model: ITradingModel;
    name: string;
    description: string;
    author: string;
    orderType: string;
    orderAmount: string;
    modelInputs: string;
}


export class ITradingModel {
    id: string;
    name: string;
    description: string;
    author: string;
    configurationQuestions: ConfigBase[];
}

export class ConfigBase {
    id: string;
    label: string;
    value: string;
    required: boolean;
    controlType: ConfigBaseControlType;
    order: number;
    helpText: string;
}

export enum ConfigBaseControlType {
    Dropdown = 0,
    Number = 1,
    Checkbox = 2
}