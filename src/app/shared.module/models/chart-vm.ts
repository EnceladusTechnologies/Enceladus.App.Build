export class amChart{
    theme: string;
    dataSets: dataSet[];
}

export class ChartConfig {
    type: string;
    theme: string;
    dataSets: dataSet[];
    dataDateFormat: string;
    chartScrollbarSettings: chartScrollbarSetting;
    chartCursorSettings: chartCursorSettings;
    panels: panel[];
}
export class chartCursorSettings {
    valueBalloonsEnabled: boolean;
    fullWidth: boolean;
    cursorAlpha: number;
    valueLineBalloonEnabled: boolean;
    valueLineEnabled: boolean;
    valueLineAlpha: number;
}
export class chartScrollbarSetting {
    graph: string;
}
export class dataSet {
    title: string;
    fieldMappings: fieldMap[];
    dataProvider: any;
    categoryField: string;
    compared: boolean;
}

export class fieldMap {
    fromField: string;
    toField: string;
}

export class panel {
    title: string;
    percentHeight: number;
    stockGraphs: stockGraph[];
    stockLegend: stockLegend;
    marginTop?: number;
    columnWidth?: number;
    showCategoryAxis?: boolean;
    valueAxes?: valueAxis[];
}
export class valueAxis {
    usePrefixes: boolean;
}
export class stockGraph {
    type: string;
    id?: string;
    openField?: string;
    closeField?: string;
    highField?: string;
    lowField?: string;
    valueField?: string;
    lineColor?: string;
    fillColors?: string;
    negativeLineColor?: string;
    negativeFillColors?: string;
    fillAlphas?: number;
    comparedGraphLineThickness?: number;
    columnWidth?: number;
    useDataSetColors?: boolean;
    comparable?: boolean;
    compareField?: string;
    showBalloon?: boolean;
    proCandlesticks?: boolean;
}

export class stockLegend {
    markerType?: string;
    markerSize?: number;
    labelText?: string;
    periodValueTextRegular?: string;
    valueTextRegular?: any;
    periodValueTextComparing?: string;
}

export class FieldMaps {
    static candleFieldMap: fieldMap[] = [
        {
            fromField: 'open',
            toField: 'open'
        },
        {
            fromField: 'high',
            toField: 'high'
        },
        {
            fromField: 'low',
            toField: 'low'
        },
        {
            fromField: 'close',
            toField: 'close'
        },
        {
            fromField: 'signal',
            toField: 'signal'
        }
    ];
}
