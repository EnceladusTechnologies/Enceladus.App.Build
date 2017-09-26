

// RESPONSES

export class HttpGetResponse {
    result_count: number;
    page_size: number;
    current_page: number;
    total_pages: number;
    api_call_credits: number;
    data: any[];
}

export class ExchangeListItem {
    symbol: string;
    mic: string;
    institution_name: string;
    acronym: string;
    city: string;
    country: string;
    country_code: string;
    website: string;
}

export class SecuritiesListItem {
    ticker: string;             // ticker - the stock market ticker symbol associated with the companies common stock securities
    figi_ticker: string;        // figi_ticker - the OpenFIGI ticker symbol
    figi: string;               // figi - the OpenFIGI identifier
    security_name: string;      // security_name - the security description as provided by the exchange
    market_sector: string;      // market_sector - the type of market for the security
    // security_type - the type of security, such as Common Stock, Preferred Stock, Warrants, Limited Partnership Interests, etc.
    security_type: string;
    // stock_exchange - the Stock Exchange (and market category) where the company’s common stock is primarily traded
    stock_exchange: string;
    // last_crsp_adj_date - the last recorded date (“YYYY-MM-DD”)
    // of an CRSP adjustment made to prior prices due to a stock split or dividend event.
    last_crsp_adj_date: string;
    composite_figi: string;     // composite_figi - the security’s composite FIGI identifier
    figi_uniqueid: string;      // figi_uniqueid - the security’s unique FIGI identifier
    share_class_figi: string;   // share_class_figi - the security’s share class FIGI identifier
    figi_exch_cntry: string;    // figi_exch_cntry - the security’s FIGI country of the exchange
    currency: string;           // currency - the security’s traded currency on the listed exchange
    mic: string;                // mic - the Market Identification Code for the Stock Exchange where the security is listed.
    exch_symbol: string;        // exch_symbol - the Intrinio Stock Exchange Symbol used as an identifier on the Intrinio API.
    etf: string;                // etf - a boolean to represent whether the security is an ETF or otherwise
    // delisted_security - if the security is no longer traded on public exchanges, the security will be considered
    // delisted and the security no longer will report pricing data.
    delisted_security: string;
    // primary_listing - a boolean to represent whether the security is the primary
    // issue or a secondary issue of the security on a different stock exchange.
    primary_listing: string;
}

export class CompanyListItem {
    ticker: string;
    name: string;
    lei: string;
    cik: string;
    latest_filing_date: string;
}

export class PriceListItem {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    ex_dividend: number;
    split_ratio: number;
    adj_open: number;
    adj_high: number;
    adj_low: number;
    adj_close: number;
    adj_volume: number;
}

export class Security {
    ticker: string;
    figi_ticker: string;
    figi: string;
    composite_figi: string;
    composite_figi_ticker: string;
    security_name: string;
    market_sector: string;
    security_type: string;
    stock_exchange: string;
    last_crsp_adj_date: string;
    figi_uniqueid: string;
    share_class_figi: string;
    figi_exch_cntry: string;
    currency: string;
    mic: string;
    exch_symbol: string;
    etf: boolean;
    delisted_security: boolean;
    primary_listing: boolean;
}
export class Company {
    ticker: string;
    name: string;
    lei: string;
    legal_name: string;
    stock_exchange: string;
    sic: number;
    short_description: string;
    long_description: string;
    ceo: string;
    company_url: string;
    business_address: string;
    mailing_address: string;
    business_phone_no: string;
    hq_address1?: any;
    hq_address2?: any;
    hq_address_city?: any;
    hq_address_postal_code?: any;
    entity_legal_form: string;
    securities: Security[];
    cik: string;
    latest_filing_date: string;
    hq_state: string;
    hq_country: string;
    inc_state: string;
    inc_country: string;
    employees: number;
    entity_status?: any;
    sector: string;
    industry_category: string;
    industry_group: string;
    template: string;
    standardized_active: boolean;
}

export enum Frequency {
    daily,
    weekly,
    monthly,
    quarterly,
    yearly

}
