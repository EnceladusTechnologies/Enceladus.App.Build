

// RESPONSES

export class HttpGetResponse {
    result_count: number;
    page_size: number;
    current_page: number;
    total_pages: number;
    api_call_credits: number;
    data: any[];
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
