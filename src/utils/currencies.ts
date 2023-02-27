export function removeDuplicates<T>(arr: readonly T[]): T[] {
  return [...new Set(arr)]
}

const zeroDecimalCurrencies = [
  'BIF',
  'MGA',
  'CLP',
  'DJF',
  'PYG',
  'RWF',
  'GNF',
  'JPY',
  'KMF',
  'KRW',
  'UGX',
  'VND',
  'VUV',
  'XAF',
  'XOF',
  'XPF',
]

export const TOP_CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
  ILS: 'ILS',
  AED: 'AED',
  SAR: 'SAR',
  QAR: 'QAR',
  SGD: 'SGD',
  NGN: 'NGN',
}

export const CURRENCY_CODES = {
  AED: 'AED',
  AFN: 'AFN',
  ALL: 'ALL',
  AMD: 'AMD',
  ANG: 'ANG',
  AOA: 'AOA',
  ARS: 'ARS',
  AUD: 'AUD',
  AWG: 'AWG',
  AZN: 'AZN',
  BAM: 'BAM',
  BBD: 'BBD',
  BDT: 'BDT',
  BGN: 'BGN',
  BIF: 'BIF',
  BMD: 'BMD',
  BND: 'BND',
  BOB: 'BOB',
  BRL: 'BRL',
  BSD: 'BSD',
  BWP: 'BWP',
  BZD: 'BZD',
  CAD: 'CAD',
  CDF: 'CDF',
  CHF: 'CHF',
  CLP: 'CLP',
  CNY: 'CNY',
  COP: 'COP',
  CRC: 'CRC',
  CVE: 'CVE',
  CZK: 'CZK',
  DJF: 'DJF',
  DKK: 'DKK',
  DOP: 'DOP',
  DZD: 'DZD',
  EGP: 'EGP',
  ETB: 'ETB',
  EUR: 'EUR',
  FJD: 'FJD',
  FKP: 'FKP',
  GBP: 'GBP',
  GEL: 'GEL',
  GIP: 'GIP',
  GMD: 'GMD',
  GNF: 'GNF',
  GTQ: 'GTQ',
  GYD: 'GYD',
  HKD: 'HKD',
  HNL: 'HNL',
  HRK: 'HRK',
  HTG: 'HTG',
  HUF: 'HUF',
  IDR: 'IDR',
  ILS: 'ILS',
  INR: 'INR',
  ISK: 'ISK',
  JMD: 'JMD',
  JPY: 'JPY',
  KES: 'KES',
  KGS: 'KGS',
  KHR: 'KHR',
  KMF: 'KMF',
  KRW: 'KRW',
  KYD: 'KYD',
  KZT: 'KZT',
  LAK: 'LAK',
  LBP: 'LBP',
  LKR: 'LKR',
  LRD: 'LRD',
  LSL: 'LSL',
  MAD: 'MAD',
  MDL: 'MDL',
  MGA: 'MGA',
  MKD: 'MKD',
  MMK: 'MMK',
  MNT: 'MNT',
  MOP: 'MOP',
  MRO: 'MRO',
  MUR: 'MUR',
  MVR: 'MVR',
  MWK: 'MWK',
  MXN: 'MXN',
  MYR: 'MYR',
  MZN: 'MZN',
  NAD: 'NAD',
  NGN: 'NGN',
  NIO: 'NIO',
  NOK: 'NOK',
  NPR: 'NPR',
  NZD: 'NZD',
  PAB: 'PAB',
  PEN: 'PEN',
  PGK: 'PGK',
  PHP: 'PHP',
  PKR: 'PKR',
  PLN: 'PLN',
  PYG: 'PYG',
  QAR: 'QAR',
  RON: 'RON',
  RSD: 'RSD',
  RUB: 'RUB',
  RWF: 'RWF',
  SAR: 'SAR',
  SBD: 'SBD',
  SCR: 'SCR',
  SEK: 'SEK',
  SGD: 'SGD',
  SHP: 'SHP',
  SLL: 'SLL',
  SOS: 'SOS',
  SRD: 'SRD',
  STD: 'STD',
  SZL: 'SZL',
  THB: 'THB',
  TJS: 'TJS',
  TOP: 'TOP',
  TRY: 'TRY',
  TTD: 'TTD',
  TWD: 'TWD',
  TZS: 'TZS',
  UAH: 'UAH',
  UGX: 'UGX',
  USD: 'USD',
  UYU: 'UYU',
  UZS: 'UZS',
  VND: 'VND',
  VUV: 'VUV',
  WST: 'WST',
  XAF: 'XAF',
  XCD: 'XCD',
  XOF: 'XOF',
  XPF: 'XPF',
  YER: 'YER',
  ZAR: 'ZAR',
  ZMW: 'ZMW',
}

export function formatCurrencyInteger(
  amount: number,
  currency: string,
  fractionDigits = 2,
  language = 'en-US'
): string {
  // TODO add language support
  fractionDigits = zeroDecimalCurrencies.includes(currency) ? 0 : fractionDigits

  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount / 100)
}

export function replaceCurrencies(text: string) {
  return text.replace(
    /\$([0-9]+)/g,
    (match: any, p: any) => `{{currency_${match}}}`
  )
}

export function buildCurrencyTranslationParams(
  text: string,
  usdConversionRate: number,
  currency: string
) {
  const regex = /\$([0-9]+)/g
  const dollarValues = removeDuplicates(text.match(regex) || [])

  return dollarValues.reduce((acc: any, value: string) => {
    const valueWithoutDollarSign = Number(value.substr(1))
    acc[`currency_${value}`] = formatCurrencyInteger(
      valueWithoutDollarSign * usdConversionRate * 100,
      currency
    )
    return acc
  }, {})
}
