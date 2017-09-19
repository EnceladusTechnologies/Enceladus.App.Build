

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

export class TradeBook {
    id: string;
    tradeEntries: TradeEntry[];
    series: SeriesItem[];
    tradingStats: TradingStats;
}

// https://docs.amcharts.com/3/javascriptstockchart/StockEvent
export class TradeEntry {
    backgroundAlpha: number;
    backgroundColor: string;
    borderAlpha: number;
    borderColor: string;
    color: string;    
    date: Date;
    description: string;
    fontSize: number;
    graph: string;
    rollOverColor: string;
    showAt: string; // open/close/low/high
    showBullet: boolean;
    showOnAxis: boolean;
    text: string;
    type: string; // flag, sign, pin, triangleUp, triangleDown, triangleLeft, triangleRight, text, arrowUp, arrowDown
    url: string;
    urlTarget: string;
    value: number;
}
export class SeriesItem {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    signal: number;
    portfolioValue: number;
    position: number;
}

export class TradingStats {
    totalPnL: number;
    averageProfitPerTrade: number;
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