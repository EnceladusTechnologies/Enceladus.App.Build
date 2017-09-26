
import emailMask from 'text-mask-addons/dist/emailMask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

export class QuestionBase<T> {
    id: string;
    label: string;
    value: string;
    required: boolean;
    controlType: ConfigBaseControlType;
    helpText: string;
    maskConfig: any = {};
    public static CreateMask(cntrlType: ConfigBaseControlType)
        : {} {
        switch (cntrlType || ConfigBaseControlType.NUMBER) {
            case ConfigBaseControlType.NONE:
                return { mask: false, guide: false, placeholderChar: '', pipe: undefined, keepCharPositions: false };
            case ConfigBaseControlType.NUMBER:
                return {
                    mask: createNumberMask({
                        prefix: '',
                        suffix: '',
                        includeThousandsSeparator: true,
                        thousandsSeparatorSymbol: ',',
                        allowDecimal: true,
                        decimalSymbol: '.',
                        decimalLimit: 0,
                        integerLimit: null,
                        requireDecimal: false,
                        allowNegative: false,
                        allowLeadingZeroes: false
                    }),
                    guide: false,
                };
            case ConfigBaseControlType.PERCENTAGE:
                return {
                    mask: createNumberMask({
                        prefix: '',
                        suffix: '',
                        includeThousandsSeparator: true,
                        thousandsSeparatorSymbol: ',',
                        allowDecimal: true,
                        decimalSymbol: '.',
                        decimalLimit: 0,
                        integerLimit: null,
                        requireDecimal: false,
                        allowNegative: false,
                        allowLeadingZeroes: false
                    }),
                    guide: false,
                };

            default:
                break;
        }
        // Custom: { hasFunction: false, function: undefined, hasMask: true, mask: '' },
    }
    constructor(options: {
        controlType?: ConfigBaseControlType,
        label?: string,
        value?: T,
        id?: string,
        required?: boolean,
        maxValue?: any,
        minValue?: any,
        helpText?: string,
        options?: { key: string, value: string }[]
    } = {}) {
        this.controlType = options.controlType;
        this.label = options.label;
        this.required = options.required;
        this.id = options.id;
        this.helpText = options.helpText;
    }
}

export enum ConfigBaseControlType {
    DROPDOWN = 1,
    NUMBER = 2,
    PERCENTAGE = 3,
    CHECKBOX = 4,
    NONE = 5
}

// export class NumberQuestion extends QuestionBase<string> {
//     controlType: ConfigBaseControlType = ConfigBaseControlType.NUMBER;
//     maskConfig = {
//         mask: createNumberMask({
//             prefix: '',
//             suffix: '',
//             includeThousandsSeparator: true,
//             thousandsSeparatorSymbol: ',',
//             allowDecimal: true,
//             decimalSymbol: '.',
//             decimalLimit: 0,
//             integerLimit: null,
//             requireDecimal: false,
//             allowNegative: false,
//             allowLeadingZeroes: false
//         }),
//         guide: false,
//     };


//     constructor(options: {} = {}) {
//         super(options);
//     }


// }

// export class PercentQuestion extends QuestionBase<string> {
//     controlType: ConfigBaseControlType = ConfigBaseControlType.PERCENTAGE;
//     maskConfig: {};

//     constructor(options: {} = {}) {
//         super(options);
//         this.maskConfig = {
//             mask: createNumberMask({
//                 prefix: '',
//                 suffix: '',
//                 includeThousandsSeparator: true,
//                 thousandsSeparatorSymbol: ',',
//                 allowDecimal: true,
//                 decimalSymbol: '.',
//                 decimalLimit: 0,
//                 integerLimit: null,
//                 requireDecimal: false,
//                 allowNegative: false,
//                 allowLeadingZeroes: false
//             }),
//             guide: false,
//         };
//     }
// }
