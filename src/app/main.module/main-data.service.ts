import { InMemoryDbService } from 'angular-in-memory-web-api';
import { StockSummaryViewModel, StockDataViewModel } from '../shared.module/models/stock-vm';
export class MainDataService implements InMemoryDbService {
  createDb() {
    const STOCKS = [{
      'symbol': 'NGLS',
      'name': 'Targa Resources Partners LP',
      'price': 97
    }, {
      'symbol': 'SXE',
      'name': 'Southcross Energy Partners, L.P.',
      'price': 99
    }, {
      'symbol': 'FTA',
      'name': 'First Trust Large Cap Value AlphaDEX Fund',
      'price': 69
    }, {
      'symbol': 'CSPI',
      'name': 'CSP Inc.',
      'price': 6
    }, {
      'symbol': 'CLNS',
      'name': 'Colony NorthStar, Inc.',
      'price': 70
    }, {
      'symbol': 'FNWB',
      'name': 'First Northwest Bancorp',
      'price': 96
    }, {
      'symbol': 'IR',
      'name': 'Ingersoll-Rand plc (Ireland)',
      'price': 41
    }, {
      'symbol': 'RDI',
      'name': 'Reading International Inc',
      'price': 84
    }, {
      'symbol': 'SF',
      'name': 'Stifel Financial Corporation',
      'price': 27
    }, {
      'symbol': 'LPCN',
      'name': 'Lipocine Inc.',
      'price': 29
    }, {
      'symbol': 'PIRS',
      'name': 'Pieris Pharmaceuticals, Inc.',
      'price': 80
    }, {
      'symbol': 'AZRE',
      'name': 'Azure Power Global Limited',
      'price': 82
    }, {
      'symbol': 'CIO',
      'name': 'City Office REIT, Inc.',
      'price': 78
    }, {
      'symbol': 'AYI',
      'name': 'Acuity Brands Inc',
      'price': 31
    }, {
      'symbol': 'ACWI',
      'name': 'iShares MSCI ACWI Index Fund',
      'price': 22
    }, {
      'symbol': 'CALM',
      'name': 'Cal-Maine Foods, Inc.',
      'price': 40
    }, {
      'symbol': 'TCCB',
      'name': 'Triangle Capital Corporation',
      'price': 81
    }, {
      'symbol': 'CACC',
      'name': 'Credit Acceptance Corporation',
      'price': 62
    }, {
      'symbol': 'NXP',
      'name': 'Nuveen Select Tax Free Income Portfolio',
      'price': 4
    }, {
      'symbol': 'SCX',
      'name': 'L.S. Starrett Company (The)',
      'price': 61
    }, {
      'symbol': 'CVG',
      'name': 'Convergys Corporation',
      'price': 79
    }, {
      'symbol': 'ALRM',
      'name': 'Alarm.com Holdings, Inc.',
      'price': 75
    }, {
      'symbol': 'PLUG',
      'name': 'Plug Power, Inc.',
      'price': 32
    }, {
      'symbol': 'KEM',
      'name': 'Kemet Corporation',
      'price': 37
    }, {
      'symbol': 'AMRN',
      'name': 'Amarin Corporation plc',
      'price': 71
    }, {
      'symbol': 'LMIA',
      'name': 'LMI Aerospace, Inc.',
      'price': 7
    }, {
      'symbol': 'IP',
      'name': 'International Paper Company',
      'price': 55
    }, {
      'symbol': 'OMN',
      'name': 'OMNOVA Solutions Inc.',
      'price': 35
    }, {
      'symbol': 'RGT',
      'name': 'Royce Global Value Trust, Inc.',
      'price': 100
    }, {
      'symbol': 'DFFN',
      'name': 'Diffusion Pharmaceuticals Inc.',
      'price': 98
    }, {
      'symbol': 'KAAC',
      'name': 'Kayne Anderson Acquisition Corp.',
      'price': 19
    }, {
      'symbol': 'INFR',
      'name': 'Legg Mason Global Infrastructure ETF',
      'price': 3
    }, {
      'symbol': 'ALRM',
      'name': 'Alarm.com Holdings, Inc.',
      'price': 25
    }, {
      'symbol': 'ILMN',
      'name': 'Illumina, Inc.',
      'price': 97
    }, {
      'symbol': 'CRL',
      'name': 'Charles River Laboratories International, Inc.',
      'price': 90
    }, {
      'symbol': 'SCHW^B',
      'name': 'The Charles Schwab Corporation',
      'price': 84
    }, {
      'symbol': 'HEQ',
      'name': 'John Hancock Hedged Equity & Income Fund',
      'price': 32
    }, {
      'symbol': 'HFC',
      'name': 'HollyFrontier Corporation',
      'price': 51
    }, {
      'symbol': 'ANDE',
      'name': 'The Andersons, Inc.',
      'price': 18
    }, {
      'symbol': 'THFF',
      'name': 'First Financial Corporation Indiana',
      'price': 62
    }, {
      'symbol': 'NICE',
      'name': 'NICE Ltd',
      'price': 34
    }, {
      'symbol': 'CFA',
      'name': 'VictoryShares US 500 Volatility Wtd ETF',
      'price': 35
    }, {
      'symbol': 'SIEN',
      'name': 'Sientra, Inc.',
      'price': 15
    }, {
      'symbol': 'AIF',
      'name': 'Apollo Tactical Income Fund Inc.',
      'price': 62
    }, {
      'symbol': 'SFE',
      'name': 'Safeguard Scientifics, Inc.',
      'price': 83
    }, {
      'symbol': 'CETXW',
      'name': 'Cemtrex Inc.',
      'price': 77
    }, {
      'symbol': 'SLIM',
      'name': 'The Obesity ETF',
      'price': 66
    }, {
      'symbol': 'PTH',
      'name': 'PowerShares DWA Healthcare Momentum Portfolio',
      'price': 33
    }, {
      'symbol': 'UNM',
      'name': 'Unum Group',
      'price': 80
    }, {
      'symbol': 'NSS',
      'name': 'NuStar Logistics, L.P.',
      'price': 50
    }, {
      'symbol': 'EBIX',
      'name': 'Ebix, Inc.',
      'price': 64
    }, {
      'symbol': 'PEZ',
      'name': 'PowerShares DWA Consumer Cyclicals Momentum Portfolio',
      'price': 89
    }, {
      'symbol': 'MSTR',
      'name': 'MicroStrategy Incorporated',
      'price': 97
    }, {
      'symbol': 'BZUN',
      'name': 'Baozun Inc.',
      'price': 30
    }, {
      'symbol': 'AC',
      'name': 'Associated Capital Group, Inc.',
      'price': 21
    }, {
      'symbol': 'AAPC',
      'name': 'Atlantic Alliance Partnership Corp.',
      'price': 96
    }, {
      'symbol': 'STAA',
      'name': 'STAAR Surgical Company',
      'price': 57
    }, {
      'symbol': 'RGEN',
      'name': 'Repligen Corporation',
      'price': 32
    }, {
      'symbol': 'BNDX',
      'name': 'Vanguard Total International Bond ETF',
      'price': 65
    }, {
      'symbol': 'HSC',
      'name': 'Harsco Corporation',
      'price': 66
    }, {
      'symbol': 'BGB',
      'name': 'Blackstone / GSO Strategic Credit Fund',
      'price': 4
    }, {
      'symbol': 'CFNB',
      'name': 'California First National Bancorp',
      'price': 7
    }, {
      'symbol': 'BP',
      'name': 'BP p.l.c.',
      'price': 8
    }, {
      'symbol': 'EDIT',
      'name': 'Editas Medicine, Inc.',
      'price': 81
    }, {
      'symbol': 'DRD',
      'name': 'DRDGOLD Limited',
      'price': 18
    }, {
      'symbol': 'HYXE',
      'name': 'iShares iBoxx $ High Yield ex Oil & Gas Corporate Bond ETF',
      'price': 6
    }, {
      'symbol': 'FLIC',
      'name': 'The First of Long Island Corporation',
      'price': 99
    }, {
      'symbol': 'FCX',
      'name': 'Freeport-McMoran, Inc.',
      'price': 5
    }, {
      'symbol': 'BGNE',
      'name': 'BeiGene, Ltd.',
      'price': 7
    }, {
      'symbol': 'RAS^B',
      'name': 'RAIT Financial Trust',
      'price': 85
    }, {
      'symbol': 'AMG',
      'name': 'Affiliated Managers Group, Inc.',
      'price': 85
    }, {
      'symbol': 'BUR',
      'name': 'Burcon NutraScience Corp',
      'price': 35
    }, {
      'symbol': 'LILAK',
      'name': 'Liberty Global plc',
      'price': 22
    }, {
      'symbol': 'CPF',
      'name': 'CPB Inc.',
      'price': 81
    }, {
      'symbol': 'DL',
      'name': 'China Distance Education Holdings Limited',
      'price': 23
    }, {
      'symbol': 'VST',
      'name': 'Vistra Energy Corp.',
      'price': 27
    }, {
      'symbol': 'MINI',
      'name': 'Mobile Mini, Inc.',
      'price': 45
    }, {
      'symbol': 'CCK',
      'name': 'Crown Holdings, Inc.',
      'price': 35
    }, {
      'symbol': 'CHSP^A.CL',
      'name': 'Chesapeake Lodging Trust',
      'price': 96
    }, {
      'symbol': 'LARK',
      'name': 'Landmark Bancorp Inc.',
      'price': 7
    }, {
      'symbol': 'XKE',
      'name': 'Lehman ABS Corporation',
      'price': 81
    }, {
      'symbol': 'SPA',
      'name': 'Sparton Corporation',
      'price': 45
    }, {
      'symbol': 'PTIE',
      'name': 'Pain Therapeutics, Inc.',
      'price': 61
    }, {
      'symbol': 'PDBC',
      'name': 'PowerShares Optimum Yield Diversified Commodity Strategy No K-',
      'price': 47
    }, {
      'symbol': 'PYN',
      'name': 'PIMCO New York Municipal Income Fund III',
      'price': 20
    }, {
      'symbol': 'JNCE',
      'name': 'Jounce Therapeutics, Inc.',
      'price': 49
    }, {
      'symbol': 'CALI',
      'name': 'China Auto Logistics Inc.',
      'price': 29
    }, {
      'symbol': 'HFWA',
      'name': 'Heritage Financial Corporation',
      'price': 4
    }, {
      'symbol': 'PBHC',
      'name': 'Pathfinder Bancorp, Inc.',
      'price': 73
    }, {
      'symbol': 'EDU',
      'name': 'New Oriental Education & Technology Group, Inc.',
      'price': 90
    }, {
      'symbol': 'PFD',
      'name': 'Flaherty & Crumrine Preferred Income Fund Incorporated',
      'price': 92
    }, {
      'symbol': 'CA',
      'name': 'CA Inc.',
      'price': 50
    }, {
      'symbol': 'BKC',
      'name': 'Bank Of New York Mellon Corporation (The)',
      'price': 64
    }, {
      'symbol': 'NZF',
      'name': 'Nuveen Municipal Credit Income Fund',
      'price': 42
    }, {
      'symbol': 'SLP',
      'name': 'Simulations Plus, Inc.',
      'price': 48
    }, {
      'symbol': 'BOMN',
      'name': 'Boston Omaha Corporation',
      'price': 1
    }, {
      'symbol': 'PERY',
      'name': 'Perry Ellis International Inc.',
      'price': 89
    }, {
      'symbol': 'THO',
      'name': 'Thor Industries, Inc.',
      'price': 75
    }, {
      'symbol': 'LDP',
      'name': 'Cohen & Steers Limited Duration Preferred and Income Fund, Inc',
      'price': 96
    }, {
      'symbol': 'JAGX',
      'name': 'Jaguar Animal Health, Inc.',
      'price': 56
    }];
    const STOCKDATA = [{
      "date": "2012-01-03",
      "open": "191.45",
      "high": "193.00",
      "low": "178.89",
      "close": "180.05"
    }, {
      "date": "2012-01-06",
      "open": "181.25",
      "high": "183.60",
      "low": "170.23",
      "close": "177.64"
    }, {
      "date": "2012-01-07",
      "open": "180.14",
      "high": "182.46",
      "low": "170.80",
      "close": "171.25"
    }, {
      "date": "2012-01-08",
      "open": "171.30",
      "high": "179.50",
      "low": "168.30",
      "close": "179.40"
    }, {
      "date": "2012-01-09",
      "open": "177.58",
      "high": "181.00",
      "low": "175.41",
      "close": "178.02"
    }, {
      "date": "2012-01-10",
      "open": "176.00",
      "high": "177.85",
      "low": "170.00",
      "close": "172.69"
    }, {
      "date": "2012-01-13",
      "open": "177.52",
      "high": "179.42",
      "low": "175.17",
      "close": "178.78"
    }, {
      "date": "2012-01-14",
      "open": "177.72",
      "high": "179.22",
      "low": "164.66",
      "close": "169.04"
    }, {
      "date": "2012-01-15",
      "open": "165.23",
      "high": "169.01",
      "low": "156.70",
      "close": "159.64"
    }, {
      "date": "2012-01-16",
      "open": "161.51",
      "high": "165.36",
      "low": "158.42",
      "close": "160.89"
    }, {
      "date": "2012-01-17",
      "open": "161.71",
      "high": "165.75",
      "low": "159.61",
      "close": "161.36"
    }, {
      "date": "2012-01-21",
      "open": "148.06",
      "high": "159.98",
      "low": "146.00",
      "close": "155.64"
    }, {
      "date": "2012-01-22",
      "open": "136.19",
      "high": "140.00",
      "low": "126.14",
      "close": "139.07"
    }, {
      "date": "2012-01-23",
      "open": "139.99",
      "high": "140.70",
      "low": "132.01",
      "close": "135.60"
    }, {
      "date": "2012-01-24",
      "open": "138.99",
      "high": "139.09",
      "low": "129.61",
      "close": "130.01"
    }, {
      "date": "2012-01-27",
      "open": "128.16",
      "high": "133.20",
      "low": "126.45",
      "close": "130.01"
    }, {
      "date": "2012-01-28",
      "open": "131.15",
      "high": "132.79",
      "low": "129.05",
      "close": "131.54"
    }, {
      "date": "2012-01-29",
      "open": "131.37",
      "high": "135.45",
      "low": "130.00",
      "close": "132.18"
    }, {
      "date": "2012-01-30",
      "open": "129.45",
      "high": "136.65",
      "low": "129.40",
      "close": "135.36"
    }, {
      "date": "2012-01-31",
      "open": "136.24",
      "high": "136.59",
      "low": "132.18",
      "close": "133.75"
    }, {
      "date": "2012-02-03",
      "open": "134.21",
      "high": "135.90",
      "low": "131.42",
      "close": "131.65"
    }, {
      "date": "2012-02-04",
      "open": "130.43",
      "high": "134.00",
      "low": "128.90",
      "close": "129.36"
    }, {
      "date": "2012-02-05",
      "open": "130.83",
      "high": "131.92",
      "low": "121.77",
      "close": "122.00"
    }, {
      "date": "2012-02-06",
      "open": "119.97",
      "high": "124.78",
      "low": "117.27",
      "close": "121.24"
    }, {
      "date": "2012-02-07",
      "open": "122.08",
      "high": "125.70",
      "low": "121.60",
      "close": "125.48"
    }, {
      "date": "2012-02-10",
      "open": "128.01",
      "high": "129.98",
      "low": "127.20",
      "close": "129.45"
    }, {
      "date": "2012-02-11",
      "open": "130.70",
      "high": "131.00",
      "low": "123.62",
      "close": "124.86"
    }, {
      "date": "2012-02-12",
      "open": "126.68",
      "high": "129.78",
      "low": "125.63",
      "close": "129.40"
    }];

    return { STOCKS, STOCKDATA };
  }
}
