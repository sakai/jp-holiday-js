/**
 * Japanese National Holidays Library
 *
 * @author Kiyoshi Sakai <sakai@d4k.net>
 * @license MIT
 */

export interface HolidayInfo {
  name: string;
  nameEn: string;
  description: string | null;
}

export interface HolidayEntry {
  date: string;
  name: string;
  nameEn: string;
  description: string | null;
}

export interface JpHolidayConfig {
  /**
   * Maximum number of days allowed for between() queries.
   * Set to 0 or undefined for no limit.
   * Default: 0 (no limit)
   */
  maxBetweenDays?: number;
}

/**
 * Global configuration
 */
let globalConfig: JpHolidayConfig = {
  maxBetweenDays: 0,
};

/**
 * Configure global settings
 */
export function configure(config: Partial<JpHolidayConfig>): void {
  globalConfig = { ...globalConfig, ...config };
}

/**
 * Get current configuration
 */
export function getConfig(): JpHolidayConfig {
  return { ...globalConfig };
}

/**
 * Reset configuration to defaults
 */
export function resetConfig(): void {
  globalConfig = { maxBetweenDays: 0 };
}

/**
 * Spring equinox days (Vernal Equinox)
 * Data from National Astronomical Observatory of Japan (暦要項「国民の祝日」)
 * Official dates are announced on February 1st of the preceding year.
 * For years beyond this data, calculateEquinoxDay() is used as fallback.
 *
 * @see https://eco.mtk.nao.ac.jp/koyomi/yoko/ (暦要項)
 */
const vernalEquinoxDays: Record<number, string> = {
  1949: '03-21', 1950: '03-21', 1951: '03-21', 1952: '03-21',
  1953: '03-21', 1954: '03-21', 1955: '03-21', 1956: '03-21',
  1957: '03-21', 1958: '03-21', 1959: '03-21', 1960: '03-20',
  1961: '03-21', 1962: '03-21', 1963: '03-21', 1964: '03-20',
  1965: '03-21', 1966: '03-21', 1967: '03-21', 1968: '03-20',
  1969: '03-21', 1970: '03-21', 1971: '03-21', 1972: '03-20',
  1973: '03-21', 1974: '03-21', 1975: '03-21', 1976: '03-20',
  1977: '03-21', 1978: '03-21', 1979: '03-21', 1980: '03-20',
  1981: '03-21', 1982: '03-21', 1983: '03-21', 1984: '03-20',
  1985: '03-21', 1986: '03-21', 1987: '03-21', 1988: '03-20',
  1989: '03-21', 1990: '03-21', 1991: '03-21', 1992: '03-20',
  1993: '03-20', 1994: '03-21', 1995: '03-21', 1996: '03-20',
  1997: '03-20', 1998: '03-21', 1999: '03-21', 2000: '03-20',
  2001: '03-20', 2002: '03-21', 2003: '03-21', 2004: '03-20',
  2005: '03-20', 2006: '03-21', 2007: '03-21', 2008: '03-20',
  2009: '03-20', 2010: '03-21', 2011: '03-21', 2012: '03-20',
  2013: '03-20', 2014: '03-21', 2015: '03-21', 2016: '03-20',
  2017: '03-20', 2018: '03-21', 2019: '03-21', 2020: '03-20',
  2021: '03-20', 2022: '03-21', 2023: '03-21', 2024: '03-20',
  2025: '03-20', 2026: '03-20', 2027: '03-21',
};

/**
 * Autumnal equinox days
 * Data from National Astronomical Observatory of Japan (暦要項「国民の祝日」)
 * Official dates are announced on February 1st of the preceding year.
 * For years beyond this data, calculateEquinoxDay() is used as fallback.
 *
 * @see https://eco.mtk.nao.ac.jp/koyomi/yoko/ (暦要項)
 */
const autumnalEquinoxDays: Record<number, string> = {
  1948: '09-23', 1949: '09-23', 1950: '09-23', 1951: '09-24',
  1952: '09-23', 1953: '09-23', 1954: '09-23', 1955: '09-24',
  1956: '09-23', 1957: '09-23', 1958: '09-23', 1959: '09-24',
  1960: '09-23', 1961: '09-23', 1962: '09-23', 1963: '09-24',
  1964: '09-23', 1965: '09-23', 1966: '09-23', 1967: '09-24',
  1968: '09-23', 1969: '09-23', 1970: '09-23', 1971: '09-24',
  1972: '09-23', 1973: '09-23', 1974: '09-23', 1975: '09-24',
  1976: '09-23', 1977: '09-23', 1978: '09-23', 1979: '09-24',
  1980: '09-23', 1981: '09-23', 1982: '09-23', 1983: '09-23',
  1984: '09-23', 1985: '09-23', 1986: '09-23', 1987: '09-23',
  1988: '09-23', 1989: '09-23', 1990: '09-23', 1991: '09-23',
  1992: '09-23', 1993: '09-23', 1994: '09-23', 1995: '09-23',
  1996: '09-23', 1997: '09-23', 1998: '09-23', 1999: '09-23',
  2000: '09-23', 2001: '09-23', 2002: '09-23', 2003: '09-23',
  2004: '09-23', 2005: '09-23', 2006: '09-23', 2007: '09-23',
  2008: '09-23', 2009: '09-23', 2010: '09-23', 2011: '09-23',
  2012: '09-22', 2013: '09-23', 2014: '09-23', 2015: '09-23',
  2016: '09-22', 2017: '09-23', 2018: '09-23', 2019: '09-23',
  2020: '09-22', 2021: '09-23', 2022: '09-23', 2023: '09-23',
  2024: '09-22', 2025: '09-23', 2026: '09-23', 2027: '09-23',
};

/**
 * Format date to mm-dd string
 */
function formatMonthDay(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}`;
}

/**
 * Get day of week (0 = Sunday, 1 = Monday, ...)
 */
function getDayOfWeek(date: Date): number {
  return date.getDay();
}

/**
 * Get week of month (1-5)
 */
function getWeekOfMonth(date: Date): number {
  return Math.ceil(date.getDate() / 7);
}

/**
 * Add days to a date
 */
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Get fixed date holidays
 */
function getFixedHoliday(year: number, monthDay: string): HolidayInfo | null {
  switch (monthDay) {
    case '01-01':
      // New Year's Day (元日)
      if (year >= 1949) {
        return {
          name: '元日',
          nameEn: "New Year's Day",
          description: '年のはじめを祝う。',
        };
      }
      break;

    case '01-15':
      // Coming of Age Day (成人の日) - until 1999
      if (year >= 1949 && year <= 1999) {
        return {
          name: '成人の日',
          nameEn: 'Coming of Age Day',
          description: 'おとなになったことを自覚し、みずから生き抜こうとする青年を祝いはげます。',
        };
      }
      break;

    case '02-11':
      // National Foundation Day (建国記念の日)
      if (year >= 1967) {
        return {
          name: '建国記念の日',
          nameEn: 'National Foundation Day',
          description: '建国をしのび、国を愛する心を養う。',
        };
      }
      break;

    case '02-23':
      // Emperor's Birthday (天皇誕生日) - from 2020
      if (year >= 2020) {
        return {
          name: '天皇誕生日',
          nameEn: "Emperor's Birthday",
          description: '天皇の誕生日を祝う。',
        };
      }
      break;

    case '04-29':
      // Showa Day (昭和の日) / Greenery Day / Emperor's Birthday
      if (year >= 1927 && year <= 1988) {
        return {
          name: '天皇誕生日',
          nameEn: "Emperor's Birthday",
          description: '天皇の誕生日を祝う。',
        };
      }
      if (year >= 1989 && year <= 2006) {
        return {
          name: 'みどりの日',
          nameEn: 'Greenery Day',
          description: '自然に親しむとともにその恩恵に感謝し、豊かな心をはぐくむ。',
        };
      }
      if (year >= 2007) {
        return {
          name: '昭和の日',
          nameEn: 'Showa Day',
          description: '激動の日々を経て、復興を遂げた昭和の時代を顧み、国の将来に思いをいたす。',
        };
      }
      break;

    case '04-30':
      // Citizen's Holiday (国民の休日) - 2019 only (day before Enthronement Day)
      if (year === 2019) {
        return {
          name: '国民の休日',
          nameEn: "Citizen's Holiday",
          description: null,
        };
      }
      break;

    case '05-01':
      // Enthronement Day (即位の日) - 2019 only
      if (year === 2019) {
        return {
          name: '即位の日',
          nameEn: 'Enthronement Day',
          description: '天皇の即位を公に宣明する即位礼正殿の儀が行われる日。',
        };
      }
      break;

    case '05-02':
      // Citizen's Holiday (国民の休日) - 2019 only (day between Enthronement Day and Constitution Memorial Day)
      if (year === 2019) {
        return {
          name: '国民の休日',
          nameEn: "Citizen's Holiday",
          description: null,
        };
      }
      break;

    case '05-03':
      // Constitution Memorial Day (憲法記念日)
      if (year >= 1949) {
        return {
          name: '憲法記念日',
          nameEn: 'Constitution Memorial Day',
          description: '日本国憲法の施行を記念し、国の成長を期する。',
        };
      }
      break;

    case '05-04':
      // Greenery Day (みどりの日) - from 2007
      if (year >= 2007) {
        return {
          name: 'みどりの日',
          nameEn: 'Greenery Day',
          description: '自然に親しむとともにその恩恵に感謝し、豊かな心をはぐくむ。',
        };
      }
      break;

    case '05-05':
      // Children's Day (こどもの日)
      if (year >= 1949) {
        return {
          name: 'こどもの日',
          nameEn: "Children's Day",
          description: 'こどもの人格を重んじ、こどもの幸福をはかるとともに、母に感謝する。',
        };
      }
      break;

    case '07-20':
      // Marine Day (海の日) - 1996-2002
      if (year >= 1996 && year <= 2002) {
        return {
          name: '海の日',
          nameEn: 'Marine Day',
          description: '海の恩恵に感謝するとともに、海洋国日本の繁栄を願う。',
        };
      }
      break;

    case '07-22':
      // Marine Day (海の日) - 2021 Olympics special
      if (year === 2021) {
        return {
          name: '海の日',
          nameEn: 'Marine Day',
          description: '海の恩恵に感謝するとともに、海洋国日本の繁栄を願う。',
        };
      }
      break;

    case '07-23':
      // Marine Day (海の日) - 2020 Olympics special
      if (year === 2020) {
        return {
          name: '海の日',
          nameEn: 'Marine Day',
          description: '海の恩恵に感謝するとともに、海洋国日本の繁栄を願う。',
        };
      }
      // Sports Day (スポーツの日) - 2021 Olympics special
      if (year === 2021) {
        return {
          name: 'スポーツの日',
          nameEn: 'Sports Day',
          description: 'スポーツを楽しみ、他者を尊重する精神を培うとともに、健康で活力ある社会の実現を願う。',
        };
      }
      break;

    case '07-24':
      // Sports Day (スポーツの日) - 2020 Olympics special
      if (year === 2020) {
        return {
          name: 'スポーツの日',
          nameEn: 'Sports Day',
          description: 'スポーツを楽しみ、他者を尊重する精神を培うとともに、健康で活力ある社会の実現を願う。',
        };
      }
      break;

    case '08-08':
      // Mountain Day (山の日) - 2021 Olympics special
      if (year === 2021) {
        return {
          name: '山の日',
          nameEn: 'Mountain Day',
          description: '山に親しむ機会を得て、山の恩恵に感謝する。',
        };
      }
      break;

    case '08-10':
      // Mountain Day (山の日) - 2020 Olympics special
      if (year === 2020) {
        return {
          name: '山の日',
          nameEn: 'Mountain Day',
          description: '山に親しむ機会を得て、山の恩恵に感謝する。',
        };
      }
      break;

    case '08-11':
      // Mountain Day (山の日) - from 2016 (except 2020, 2021)
      if (year >= 2016 && year !== 2020 && year !== 2021) {
        return {
          name: '山の日',
          nameEn: 'Mountain Day',
          description: '山に親しむ機会を得て、山の恩恵に感謝する。',
        };
      }
      break;

    case '09-15':
      // Respect for the Aged Day (敬老の日) - 1967-2002
      if (year >= 1967 && year <= 2002) {
        return {
          name: '敬老の日',
          nameEn: 'Respect for the Aged Day',
          description: '多年にわたり社会につくしてきた老人を敬愛し、長寿を祝う。',
        };
      }
      break;

    case '10-10':
      // Health and Sports Day (体育の日) - 1966-1999
      if (year >= 1966 && year <= 1999) {
        return {
          name: '体育の日',
          nameEn: 'Health and Sports Day',
          description: 'スポーツにしたしみ、健康な心身をつちかう。',
        };
      }
      break;

    case '10-22':
      // Enthronement Ceremony Day (即位礼正殿の儀) - 2019 only
      if (year === 2019) {
        return {
          name: '即位礼正殿の儀',
          nameEn: 'Enthronement Ceremony Day',
          description: '即位礼正殿の儀が行われる日。',
        };
      }
      break;

    case '11-03':
      // Culture Day (文化の日)
      if (year >= 1948) {
        return {
          name: '文化の日',
          nameEn: 'Culture Day',
          description: '自由と平和を愛し、文化をすすめる。',
        };
      }
      break;

    case '11-23':
      // Labor Thanksgiving Day (勤労感謝の日)
      if (year >= 1948) {
        return {
          name: '勤労感謝の日',
          nameEn: 'Labor Thanksgiving Day',
          description: '勤労をたっとび、生産を祝い、国民たがいに感謝しあう。',
        };
      }
      break;

    case '12-23':
      // Emperor's Birthday (天皇誕生日) - 1989-2018
      if (year >= 1989 && year <= 2018) {
        return {
          name: '天皇誕生日',
          nameEn: "Emperor's Birthday",
          description: '天皇の誕生日を祝う。',
        };
      }
      break;
  }

  return null;
}

/**
 * Get happy monday holidays (second or third Monday of the month)
 */
function getHappyMondayHoliday(date: Date, year: number): HolidayInfo | null {
  const dayOfWeek = getDayOfWeek(date);
  if (dayOfWeek !== 1) {
    return null; // Not Monday
  }

  const month = date.getMonth() + 1;
  const weekOfMonth = getWeekOfMonth(date);
  const key = `${month}-${weekOfMonth}`;

  switch (key) {
    case '1-2':
      // Coming of Age Day (成人の日) - 2nd Monday of January (from 2000)
      if (year >= 2000) {
        return {
          name: '成人の日',
          nameEn: 'Coming of Age Day',
          description: 'おとなになったことを自覚し、みずから生き抜こうとする青年を祝いはげます。',
        };
      }
      break;

    case '7-3':
      // Marine Day (海の日) - 3rd Monday of July (from 2003, except 2020, 2021)
      if (year >= 2003 && year !== 2020 && year !== 2021) {
        return {
          name: '海の日',
          nameEn: 'Marine Day',
          description: '海の恩恵に感謝するとともに、海洋国日本の繁栄を願う。',
        };
      }
      break;

    case '9-3':
      // Respect for the Aged Day (敬老の日) - 3rd Monday of September (from 2003)
      if (year >= 2003) {
        return {
          name: '敬老の日',
          nameEn: 'Respect for the Aged Day',
          description: '多年にわたり社会につくしてきた老人を敬愛し、長寿を祝う。',
        };
      }
      break;

    case '10-2':
      // Sports Day / Health and Sports Day - 2nd Monday of October (from 2000, except 2020, 2021)
      if (year >= 2000 && year !== 2020 && year !== 2021) {
        if (year >= 2020) {
          return {
            name: 'スポーツの日',
            nameEn: 'Sports Day',
            description: 'スポーツを楽しみ、他者を尊重する精神を培うとともに、健康で活力ある社会の実現を願う。',
          };
        }
        return {
          name: '体育の日',
          nameEn: 'Health and Sports Day',
          description: 'スポーツにしたしみ、健康な心身をつちかう。',
        };
      }
      break;
  }

  return null;
}

/**
 * Calculate equinox day using astronomical formula
 *
 * Based on the original jp-holiday calculation.
 * Note: This is an approximation. Official dates are announced by
 * the National Astronomical Observatory of Japan on February 1st
 * of the preceding year.
 *
 * @see https://www.nao.ac.jp/faq/a0301.html
 */
function calculateEquinoxDay(year: number, type: 'vernal' | 'autumnal'): string {
  const equinox = type === 'vernal' ? 953537715.36 : 969642576.00;

  // Sum of 0 to (year - 2000): equivalent to array_sum(range(0, year - 2000)) in PHP
  const yearDiff = year - 2000;
  const yearSum = yearDiff >= 0
    ? (yearDiff * (yearDiff + 1)) / 2
    : -((Math.abs(yearDiff) * (Math.abs(yearDiff) + 1)) / 2);

  const timestamp = equinox
    + (3155692525056 * yearDiff / 100000)
    + (53 * yearSum / 10000);

  // Use JST (UTC+9) timezone for calculation
  const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
  const date = new Date(timestamp * 1000 + JST_OFFSET_MS);
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${month}-${day}`;
}

/**
 * Get vernal equinox day for a given year
 */
function getVernalEquinoxDay(year: number): string {
  if (vernalEquinoxDays[year]) {
    return vernalEquinoxDays[year];
  }
  return calculateEquinoxDay(year, 'vernal');
}

/**
 * Get autumnal equinox day for a given year
 */
function getAutumnalEquinoxDay(year: number): string {
  if (autumnalEquinoxDays[year]) {
    return autumnalEquinoxDays[year];
  }
  return calculateEquinoxDay(year, 'autumnal');
}

/**
 * Get equinox day holidays (Vernal/Autumnal Equinox)
 */
function getEquinoxHoliday(year: number, monthDay: string): HolidayInfo | null {
  // Vernal Equinox Day (春分の日)
  const vernalEquinox = getVernalEquinoxDay(year);
  if (vernalEquinox === monthDay && year >= 1949) {
    return {
      name: '春分の日',
      nameEn: 'Vernal Equinox Day',
      description: '自然をたたえ、生物をいつくしむ。',
    };
  }

  // Autumnal Equinox Day (秋分の日)
  const autumnalEquinox = getAutumnalEquinoxDay(year);
  if (autumnalEquinox === monthDay && year >= 1948) {
    return {
      name: '秋分の日',
      nameEn: 'Autumnal Equinox Day',
      description: '祖先をうやまい、なくなった人々をしのぶ。',
    };
  }

  return null;
}

/**
 * Check if the date itself is a holiday (not including substitute/citizen's holidays)
 */
function isHolidayByDateItself(date: Date): boolean {
  const year = date.getFullYear();
  const monthDay = formatMonthDay(date);

  return getFixedHoliday(year, monthDay) !== null
    || getHappyMondayHoliday(date, year) !== null
    || getEquinoxHoliday(year, monthDay) !== null;
}

/**
 * Get substitute holiday (振替休日)
 * When a national holiday falls on Sunday, the following Monday becomes a holiday
 */
function getSubstituteHoliday(date: Date, year: number): HolidayInfo | null {
  // Substitute holiday only applies from 1973
  if (year < 1973) {
    return null;
  }

  // Check if previous day was a holiday and Sunday
  const previousDate = addDays(date, -1);
  const previousDayOfWeek = getDayOfWeek(previousDate);

  if (previousDayOfWeek === 0 && isHolidayByDateItself(previousDate)) {
    return {
      name: '振替休日',
      nameEn: 'Substitute Holiday',
      description: null,
    };
  }

  // From 2007, if multiple consecutive holidays include Sunday, the next weekday becomes substitute
  if (year >= 2007) {
    let checkDate = addDays(date, -1);
    while (isHolidayByDateItself(checkDate)) {
      if (getDayOfWeek(checkDate) === 0) {
        return {
          name: '振替休日',
          nameEn: 'Substitute Holiday',
          description: null,
        };
      }
      checkDate = addDays(checkDate, -1);
    }
  }

  return null;
}

/**
 * Get citizen's holiday (国民の休日)
 * A weekday sandwiched between two national holidays becomes a holiday
 */
function getCitizensHoliday(date: Date, year: number): HolidayInfo | null {
  // Citizen's holiday only applies from 1986
  if (year < 1986) {
    return null;
  }

  const dayOfWeek = getDayOfWeek(date);

  // Must not be Sunday (it would be covered by substitute holiday rules)
  if (dayOfWeek === 0) {
    return null;
  }

  const previousDate = addDays(date, -1);
  const nextDate = addDays(date, 1);

  if (isHolidayByDateItself(previousDate) && isHolidayByDateItself(nextDate)) {
    return {
      name: '国民の休日',
      nameEn: "Citizen's Holiday",
      description: null,
    };
  }

  return null;
}

/**
 * Check if the given date is a Japanese national holiday
 */
export function isHoliday(date: Date): boolean {
  return getHolidayInfo(date) !== null;
}

/**
 * Get the holiday name in Japanese
 */
export function getName(date: Date): string | null {
  const info = getHolidayInfo(date);
  return info?.name ?? null;
}

/**
 * Get the holiday name in English
 */
export function getNameEn(date: Date): string | null {
  const info = getHolidayInfo(date);
  return info?.nameEn ?? null;
}

/**
 * Get the holiday description
 */
export function getDescription(date: Date): string | null {
  const info = getHolidayInfo(date);
  return info?.description ?? null;
}

/**
 * Get all holiday information
 */
export function getHolidayInfo(date: Date): HolidayInfo | null {
  // 国民の祝日に関する法律 was enacted on July 20, 1948
  // No holidays before this date
  const holidayLawDate = new Date(1948, 6, 20); // July 20, 1948
  if (date < holidayLawDate) {
    return null;
  }

  const year = date.getFullYear();
  const monthDay = formatMonthDay(date);

  // Check fixed holidays first
  const fixedHoliday = getFixedHoliday(year, monthDay);
  if (fixedHoliday !== null) {
    return fixedHoliday;
  }

  // Check happy monday holidays
  const happyMondayHoliday = getHappyMondayHoliday(date, year);
  if (happyMondayHoliday !== null) {
    return happyMondayHoliday;
  }

  // Check equinox days
  const equinoxHoliday = getEquinoxHoliday(year, monthDay);
  if (equinoxHoliday !== null) {
    return equinoxHoliday;
  }

  // Check substitute holiday (振替休日)
  const substituteHoliday = getSubstituteHoliday(date, year);
  if (substituteHoliday !== null) {
    return substituteHoliday;
  }

  // Check citizen's holiday (国民の休日)
  const citizensHoliday = getCitizensHoliday(date, year);
  if (citizensHoliday !== null) {
    return citizensHoliday;
  }

  return null;
}

/**
 * Get all holidays for a given year
 */
export function getHolidaysInYear(year: number): Record<string, HolidayInfo> {
  const holidays: Record<string, HolidayInfo> = {};
  const date = new Date(year, 0, 1); // January 1st
  const endDate = new Date(year, 11, 31); // December 31st

  while (date <= endDate) {
    const info = getHolidayInfo(date);
    if (info !== null) {
      const dateStr = `${year}-${formatMonthDay(date)}`;
      holidays[dateStr] = info;
    }
    date.setDate(date.getDate() + 1);
  }

  return holidays;
}

/**
 * Get holidays between two dates (inclusive)
 */
export function between(start: Date, end: Date): HolidayEntry[] {
  const holidays: HolidayEntry[] = [];
  const date = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  // Check maxBetweenDays limit
  if (globalConfig.maxBetweenDays && globalConfig.maxBetweenDays > 0) {
    const diffTime = endDate.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > globalConfig.maxBetweenDays) {
      throw new Error(
        `Date range exceeds maximum allowed days (${globalConfig.maxBetweenDays}). ` +
        `Requested: ${diffDays} days. Use configure({ maxBetweenDays: 0 }) to disable this limit.`
      );
    }
  }

  while (date <= endDate) {
    const info = getHolidayInfo(date);
    if (info !== null) {
      const year = date.getFullYear();
      const dateStr = `${year}-${formatMonthDay(date)}`;
      holidays.push({
        date: dateStr,
        ...info,
      });
    }
    date.setDate(date.getDate() + 1);
  }

  return holidays;
}

/**
 * JpHoliday class (for compatibility with PHP version's static methods)
 */
export class JpHoliday {
  static isHoliday = isHoliday;
  static getName = getName;
  static getNameEn = getNameEn;
  static getDescription = getDescription;
  static getHolidayInfo = getHolidayInfo;
  static getHolidaysInYear = getHolidaysInYear;
  static between = between;
  static configure = configure;
  static getConfig = getConfig;
  static resetConfig = resetConfig;
}

export default JpHoliday;
