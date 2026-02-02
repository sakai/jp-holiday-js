import { describe, it, expect } from 'vitest';
import {
  isHoliday,
  getName,
  getNameEn,
  getDescription,
  getHolidayInfo,
  getHolidaysInYear,
  between,
  configure,
  getConfig,
  resetConfig,
  JpHoliday,
} from '../src/index';

describe('JpHoliday', () => {
  describe('Fixed Holidays', () => {
    it('should recognize New Year\'s Day (元日)', () => {
      const date = new Date(2024, 0, 1); // January 1, 2024
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('元日');
      expect(getNameEn(date)).toBe("New Year's Day");
    });

    it('should not recognize New Year\'s Day before 1949', () => {
      const date = new Date(1948, 0, 1);
      expect(getName(date)).toBeNull();
    });

    it('should recognize National Foundation Day (建国記念の日)', () => {
      const date = new Date(2024, 1, 11); // February 11, 2024
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('建国記念の日');
    });

    it('should not recognize National Foundation Day before 1967', () => {
      const date = new Date(1966, 1, 11);
      expect(getName(date)).toBeNull();
    });

    it('should recognize Emperor\'s Birthday on Feb 23 (from 2020)', () => {
      const date = new Date(2024, 1, 23); // February 23, 2024
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('天皇誕生日');
    });

    it('should recognize Emperor\'s Birthday on Dec 23 (1989-2018)', () => {
      const date = new Date(2018, 11, 23); // December 23, 2018
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('天皇誕生日');
    });

    it('should not recognize Dec 23 as holiday in 2019', () => {
      const date = new Date(2019, 11, 23);
      expect(getName(date)).toBeNull();
    });

    it('should recognize Showa Day (昭和の日) from 2007', () => {
      const date = new Date(2024, 3, 29); // April 29, 2024
      expect(getName(date)).toBe('昭和の日');
    });

    it('should recognize Greenery Day on April 29 (1989-2006)', () => {
      const date = new Date(2000, 3, 29);
      expect(getName(date)).toBe('みどりの日');
    });

    it('should recognize Constitution Memorial Day (憲法記念日)', () => {
      const date = new Date(2024, 4, 3); // May 3, 2024
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('憲法記念日');
    });

    it('should recognize Greenery Day on May 4 (from 2007)', () => {
      const date = new Date(2024, 4, 4); // May 4, 2024
      expect(getName(date)).toBe('みどりの日');
    });

    it('should recognize Children\'s Day (こどもの日)', () => {
      const date = new Date(2024, 4, 5); // May 5, 2024
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('こどもの日');
    });

    it('should recognize Mountain Day (山の日) from 2016', () => {
      const date = new Date(2024, 7, 11); // August 11, 2024
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('山の日');
    });

    it('should recognize Culture Day (文化の日)', () => {
      const date = new Date(2024, 10, 3); // November 3, 2024
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('文化の日');
    });

    it('should recognize Labor Thanksgiving Day (勤労感謝の日)', () => {
      const date = new Date(2024, 10, 23); // November 23, 2024
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('勤労感謝の日');
    });
  });

  describe('Happy Monday Holidays', () => {
    it('should recognize Coming of Age Day (成人の日) on 2nd Monday of January', () => {
      const date = new Date(2024, 0, 8); // January 8, 2024 (2nd Monday)
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('成人の日');
    });

    it('should recognize Coming of Age Day on Jan 15 before 2000', () => {
      const date = new Date(1999, 0, 15);
      expect(getName(date)).toBe('成人の日');
    });

    it('should recognize Marine Day (海の日) on 3rd Monday of July', () => {
      const date = new Date(2024, 6, 15); // July 15, 2024 (3rd Monday)
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('海の日');
    });

    it('should recognize Marine Day on July 20 (1996-2002)', () => {
      const date = new Date(2000, 6, 20);
      expect(getName(date)).toBe('海の日');
    });

    it('should recognize Respect for the Aged Day (敬老の日) on 3rd Monday of September', () => {
      const date = new Date(2024, 8, 16); // September 16, 2024 (3rd Monday)
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('敬老の日');
    });

    it('should recognize Sports Day (スポーツの日) on 2nd Monday of October from 2020', () => {
      const date = new Date(2024, 9, 14); // October 14, 2024 (2nd Monday)
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('スポーツの日');
    });

    it('should recognize Health and Sports Day (体育の日) before 2020', () => {
      const date = new Date(2019, 9, 14); // October 14, 2019 (2nd Monday)
      expect(getName(date)).toBe('体育の日');
    });
  });

  describe('Equinox Days', () => {
    it('should recognize Vernal Equinox Day (春分の日)', () => {
      const date = new Date(2024, 2, 20); // March 20, 2024
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('春分の日');
    });

    it('should recognize Autumnal Equinox Day (秋分の日)', () => {
      const date = new Date(2024, 8, 22); // September 22, 2024
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('秋分の日');
    });
  });

  describe('Substitute Holiday (振替休日)', () => {
    it('should recognize substitute holiday when holiday falls on Sunday', () => {
      // February 12, 2024 is substitute for National Foundation Day (Feb 11 = Sunday)
      const date = new Date(2024, 1, 12);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('振替休日');
    });

    it('should not have substitute holiday before 1973', () => {
      // Find a Sunday holiday before 1973 and check next day
      const date = new Date(1972, 0, 2); // January 2, 1972 (day after New Year's Day which was Saturday)
      expect(getName(date)).toBeNull();
    });
  });

  describe('Citizen\'s Holiday (国民の休日)', () => {
    it('should recognize citizen\'s holiday between two holidays', () => {
      // September 22, 2009: between Respect for the Aged Day (21st) and Autumnal Equinox (23rd)
      const date = new Date(2009, 8, 22);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('国民の休日');
    });
  });

  describe('2020 Olympics Special', () => {
    it('should recognize Marine Day on July 23, 2020', () => {
      const date = new Date(2020, 6, 23);
      expect(getName(date)).toBe('海の日');
    });

    it('should recognize Sports Day on July 24, 2020', () => {
      const date = new Date(2020, 6, 24);
      expect(getName(date)).toBe('スポーツの日');
    });

    it('should recognize Mountain Day on August 10, 2020', () => {
      const date = new Date(2020, 7, 10);
      expect(getName(date)).toBe('山の日');
    });
  });

  describe('2021 Olympics Special', () => {
    it('should recognize Marine Day on July 22, 2021', () => {
      const date = new Date(2021, 6, 22);
      expect(getName(date)).toBe('海の日');
    });

    it('should recognize Sports Day on July 23, 2021', () => {
      const date = new Date(2021, 6, 23);
      expect(getName(date)).toBe('スポーツの日');
    });

    it('should recognize Mountain Day on August 8, 2021', () => {
      const date = new Date(2021, 7, 8);
      expect(getName(date)).toBe('山の日');
    });
  });

  describe('getHolidaysInYear', () => {
    it('should return all holidays for 2024', () => {
      const holidays = getHolidaysInYear(2024);
      expect(Object.keys(holidays).length).toBeGreaterThan(15);
      expect(holidays['2024-01-01']).toBeDefined();
      expect(holidays['2024-01-01'].name).toBe('元日');
    });

    it('should include substitute holidays', () => {
      const holidays = getHolidaysInYear(2024);
      // February 12, 2024 is substitute holiday
      expect(holidays['2024-02-12']).toBeDefined();
      expect(holidays['2024-02-12'].name).toBe('振替休日');
    });
  });

  describe('getHolidayInfo', () => {
    it('should return full holiday info', () => {
      const date = new Date(2024, 0, 1);
      const info = getHolidayInfo(date);
      expect(info).not.toBeNull();
      expect(info?.name).toBe('元日');
      expect(info?.nameEn).toBe("New Year's Day");
      expect(info?.description).toBe('年のはじめを祝う。');
    });

    it('should return null for non-holidays', () => {
      const date = new Date(2024, 0, 2); // January 2, 2024 (not a holiday)
      expect(getHolidayInfo(date)).toBeNull();
    });
  });

  describe('getDescription', () => {
    it('should return description for holidays', () => {
      const date = new Date(2024, 0, 1);
      expect(getDescription(date)).toBe('年のはじめを祝う。');
    });

    it('should return null for substitute holidays', () => {
      const date = new Date(2024, 1, 12); // Substitute holiday
      expect(getDescription(date)).toBeNull();
    });
  });

  describe('JpHoliday class', () => {
    it('should work with static methods', () => {
      const date = new Date(2024, 0, 1);
      expect(JpHoliday.isHoliday(date)).toBe(true);
      expect(JpHoliday.getName(date)).toBe('元日');
      expect(JpHoliday.getNameEn(date)).toBe("New Year's Day");
    });
  });

  describe('Non-holidays', () => {
    it('should return false for regular weekdays', () => {
      const date = new Date(2024, 0, 2); // January 2, 2024 (Tuesday)
      expect(isHoliday(date)).toBe(false);
    });

    it('should return false for regular Saturdays', () => {
      const date = new Date(2024, 0, 6); // January 6, 2024 (Saturday)
      expect(isHoliday(date)).toBe(false);
    });
  });

  describe('Vernal Equinox Days (春分の日) - Comprehensive', () => {
    // 元ネタハードコード (1949-2019)
    const hardcodedVernal: [number, string][] = [
      [1949, '03-21'], [1950, '03-21'], [1951, '03-21'], [1952, '03-21'],
      [1953, '03-21'], [1954, '03-21'], [1955, '03-21'], [1956, '03-21'],
      [1957, '03-21'], [1958, '03-21'], [1959, '03-21'], [1960, '03-20'],
      [1961, '03-21'], [1962, '03-21'], [1963, '03-21'], [1964, '03-20'],
      [1965, '03-21'], [1966, '03-21'], [1967, '03-21'], [1968, '03-20'],
      [1969, '03-21'], [1970, '03-21'], [1971, '03-21'], [1972, '03-20'],
      [1973, '03-21'], [1974, '03-21'], [1975, '03-21'], [1976, '03-20'],
      [1977, '03-21'], [1978, '03-21'], [1979, '03-21'], [1980, '03-20'],
      [1981, '03-21'], [1982, '03-21'], [1983, '03-21'], [1984, '03-20'],
      [1985, '03-21'], [1986, '03-21'], [1987, '03-21'], [1988, '03-20'],
      [1989, '03-21'], [1990, '03-21'], [1991, '03-21'], [1992, '03-20'],
      [1993, '03-20'], [1994, '03-21'], [1995, '03-21'], [1996, '03-20'],
      [1997, '03-20'], [1998, '03-21'], [1999, '03-21'], [2000, '03-20'],
      [2001, '03-20'], [2002, '03-21'], [2003, '03-21'], [2004, '03-20'],
      [2005, '03-20'], [2006, '03-21'], [2007, '03-21'], [2008, '03-20'],
      [2009, '03-20'], [2010, '03-21'], [2011, '03-21'], [2012, '03-20'],
      [2013, '03-20'], [2014, '03-21'], [2015, '03-21'], [2016, '03-20'],
      [2017, '03-20'], [2018, '03-21'], [2019, '03-21'],
    ];

    // NAO 国立天文台データ (2020-2050)
    const naoVernal: [number, string][] = [
      [2020, '03-20'], [2021, '03-20'], [2022, '03-21'], [2023, '03-21'],
      [2024, '03-20'], [2025, '03-20'], [2026, '03-20'], [2027, '03-21'],
      [2028, '03-20'], [2029, '03-20'], [2030, '03-20'], [2031, '03-21'],
      [2032, '03-20'], [2033, '03-20'], [2034, '03-20'], [2035, '03-21'],
      [2036, '03-20'], [2037, '03-20'], [2038, '03-20'], [2039, '03-21'],
      [2040, '03-20'], [2041, '03-20'], [2042, '03-20'], [2043, '03-21'],
      [2044, '03-20'], [2045, '03-20'], [2046, '03-20'], [2047, '03-21'],
      [2048, '03-20'], [2049, '03-20'], [2050, '03-20'],
    ];

    it.each(hardcodedVernal)('should recognize %i-%s as 春分の日 (hardcoded)', (year, monthDay) => {
      const [month, day] = monthDay.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('春分の日');
    });

    it.each(naoVernal)('should recognize %i-%s as 春分の日 (NAO)', (year, monthDay) => {
      const [month, day] = monthDay.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('春分の日');
    });
  });

  describe('Autumnal Equinox Days (秋分の日) - Comprehensive', () => {
    // 元ネタハードコード (1948-2019)
    const hardcodedAutumnal: [number, string][] = [
      [1948, '09-23'], [1949, '09-23'], [1950, '09-23'], [1951, '09-24'],
      [1952, '09-23'], [1953, '09-23'], [1954, '09-23'], [1955, '09-24'],
      [1956, '09-23'], [1957, '09-23'], [1958, '09-23'], [1959, '09-24'],
      [1960, '09-23'], [1961, '09-23'], [1962, '09-23'], [1963, '09-24'],
      [1964, '09-23'], [1965, '09-23'], [1966, '09-23'], [1967, '09-24'],
      [1968, '09-23'], [1969, '09-23'], [1970, '09-23'], [1971, '09-24'],
      [1972, '09-23'], [1973, '09-23'], [1974, '09-23'], [1975, '09-24'],
      [1976, '09-23'], [1977, '09-23'], [1978, '09-23'], [1979, '09-24'],
      [1980, '09-23'], [1981, '09-23'], [1982, '09-23'], [1983, '09-23'],
      [1984, '09-23'], [1985, '09-23'], [1986, '09-23'], [1987, '09-23'],
      [1988, '09-23'], [1989, '09-23'], [1990, '09-23'], [1991, '09-23'],
      [1992, '09-23'], [1993, '09-23'], [1994, '09-23'], [1995, '09-23'],
      [1996, '09-23'], [1997, '09-23'], [1998, '09-23'], [1999, '09-23'],
      [2000, '09-23'], [2001, '09-23'], [2002, '09-23'], [2003, '09-23'],
      [2004, '09-23'], [2005, '09-23'], [2006, '09-23'], [2007, '09-23'],
      [2008, '09-23'], [2009, '09-23'], [2010, '09-23'], [2011, '09-23'],
      [2012, '09-22'], [2013, '09-23'], [2014, '09-23'], [2015, '09-23'],
      [2016, '09-22'], [2017, '09-23'], [2018, '09-23'], [2019, '09-23'],
    ];

    // NAO 国立天文台データ (2020-2050)
    const naoAutumnal: [number, string][] = [
      [2020, '09-22'], [2021, '09-23'], [2022, '09-23'], [2023, '09-23'],
      [2024, '09-22'], [2025, '09-23'], [2026, '09-23'], [2027, '09-23'],
      [2028, '09-22'], [2029, '09-23'], [2030, '09-23'], [2031, '09-23'],
      [2032, '09-22'], [2033, '09-23'], [2034, '09-23'], [2035, '09-23'],
      [2036, '09-22'], [2037, '09-23'], [2038, '09-23'], [2039, '09-23'],
      [2040, '09-22'], [2041, '09-23'], [2042, '09-23'], [2043, '09-23'],
      [2044, '09-22'], [2045, '09-22'], [2046, '09-23'], [2047, '09-23'],
      [2048, '09-22'], [2049, '09-22'], [2050, '09-23'],
    ];

    it.each(hardcodedAutumnal)('should recognize %i-%s as 秋分の日 (hardcoded)', (year, monthDay) => {
      const [month, day] = monthDay.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('秋分の日');
    });

    it.each(naoAutumnal)('should recognize %i-%s as 秋分の日 (NAO)', (year, monthDay) => {
      const [month, day] = monthDay.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe('秋分の日');
    });
  });

  describe('NAO 暦要項 Official Data (2018-2027)', () => {
    // 2018年 (平成30年) - NAO暦要項「国民の祝日」
    const holidays2018: [string, string][] = [
      ['2018-01-01', '元日'],
      ['2018-01-08', '成人の日'],
      ['2018-02-11', '建国記念の日'],
      ['2018-02-12', '振替休日'],
      ['2018-03-21', '春分の日'],
      ['2018-04-29', '昭和の日'],
      ['2018-04-30', '振替休日'],
      ['2018-05-03', '憲法記念日'],
      ['2018-05-04', 'みどりの日'],
      ['2018-05-05', 'こどもの日'],
      ['2018-07-16', '海の日'],
      ['2018-08-11', '山の日'],
      ['2018-09-17', '敬老の日'],
      ['2018-09-23', '秋分の日'],
      ['2018-09-24', '振替休日'],
      ['2018-10-08', '体育の日'],
      ['2018-11-03', '文化の日'],
      ['2018-11-23', '勤労感謝の日'],
      ['2018-12-23', '天皇誕生日'],
      ['2018-12-24', '振替休日'],
    ];

    // 2019年 (平成31年/令和元年) - NAO暦要項「国民の祝日」
    const holidays2019: [string, string][] = [
      ['2019-01-01', '元日'],
      ['2019-01-14', '成人の日'],
      ['2019-02-11', '建国記念の日'],
      ['2019-03-21', '春分の日'],
      ['2019-04-29', '昭和の日'],
      ['2019-04-30', '国民の休日'],
      ['2019-05-01', '即位の日'],
      ['2019-05-02', '国民の休日'],
      ['2019-05-03', '憲法記念日'],
      ['2019-05-04', 'みどりの日'],
      ['2019-05-05', 'こどもの日'],
      ['2019-05-06', '振替休日'],
      ['2019-07-15', '海の日'],
      ['2019-08-11', '山の日'],
      ['2019-08-12', '振替休日'],
      ['2019-09-16', '敬老の日'],
      ['2019-09-23', '秋分の日'],
      ['2019-10-14', '体育の日'],
      ['2019-10-22', '即位礼正殿の儀'],
      ['2019-11-03', '文化の日'],
      ['2019-11-04', '振替休日'],
      ['2019-11-23', '勤労感謝の日'],
    ];

    // 2020年 (令和2年) - NAO暦要項「国民の祝日」(東京オリンピック特例)
    const holidays2020: [string, string][] = [
      ['2020-01-01', '元日'],
      ['2020-01-13', '成人の日'],
      ['2020-02-11', '建国記念の日'],
      ['2020-02-23', '天皇誕生日'],
      ['2020-02-24', '振替休日'],
      ['2020-03-20', '春分の日'],
      ['2020-04-29', '昭和の日'],
      ['2020-05-03', '憲法記念日'],
      ['2020-05-04', 'みどりの日'],
      ['2020-05-05', 'こどもの日'],
      ['2020-05-06', '振替休日'],
      ['2020-07-23', '海の日'],
      ['2020-07-24', 'スポーツの日'],
      ['2020-08-10', '山の日'],
      ['2020-09-21', '敬老の日'],
      ['2020-09-22', '秋分の日'],
      ['2020-11-03', '文化の日'],
      ['2020-11-23', '勤労感謝の日'],
    ];

    // 2021年 (令和3年) - NAO暦要項「国民の祝日」(東京オリンピック特例)
    const holidays2021: [string, string][] = [
      ['2021-01-01', '元日'],
      ['2021-01-11', '成人の日'],
      ['2021-02-11', '建国記念の日'],
      ['2021-02-23', '天皇誕生日'],
      ['2021-03-20', '春分の日'],
      ['2021-04-29', '昭和の日'],
      ['2021-05-03', '憲法記念日'],
      ['2021-05-04', 'みどりの日'],
      ['2021-05-05', 'こどもの日'],
      ['2021-07-22', '海の日'],
      ['2021-07-23', 'スポーツの日'],
      ['2021-08-08', '山の日'],
      ['2021-08-09', '振替休日'],
      ['2021-09-20', '敬老の日'],
      ['2021-09-23', '秋分の日'],
      ['2021-11-03', '文化の日'],
      ['2021-11-23', '勤労感謝の日'],
    ];

    // 2022年 (令和4年) - NAO暦要項「国民の祝日」
    const holidays2022: [string, string][] = [
      ['2022-01-01', '元日'],
      ['2022-01-10', '成人の日'],
      ['2022-02-11', '建国記念の日'],
      ['2022-02-23', '天皇誕生日'],
      ['2022-03-21', '春分の日'],
      ['2022-04-29', '昭和の日'],
      ['2022-05-03', '憲法記念日'],
      ['2022-05-04', 'みどりの日'],
      ['2022-05-05', 'こどもの日'],
      ['2022-07-18', '海の日'],
      ['2022-08-11', '山の日'],
      ['2022-09-19', '敬老の日'],
      ['2022-09-23', '秋分の日'],
      ['2022-10-10', 'スポーツの日'],
      ['2022-11-03', '文化の日'],
      ['2022-11-23', '勤労感謝の日'],
    ];

    // 2023年 (令和5年) - NAO暦要項「国民の祝日」
    const holidays2023: [string, string][] = [
      ['2023-01-01', '元日'],
      ['2023-01-02', '振替休日'],
      ['2023-01-09', '成人の日'],
      ['2023-02-11', '建国記念の日'],
      ['2023-02-23', '天皇誕生日'],
      ['2023-03-21', '春分の日'],
      ['2023-04-29', '昭和の日'],
      ['2023-05-03', '憲法記念日'],
      ['2023-05-04', 'みどりの日'],
      ['2023-05-05', 'こどもの日'],
      ['2023-07-17', '海の日'],
      ['2023-08-11', '山の日'],
      ['2023-09-18', '敬老の日'],
      ['2023-09-23', '秋分の日'],
      ['2023-10-09', 'スポーツの日'],
      ['2023-11-03', '文化の日'],
      ['2023-11-23', '勤労感謝の日'],
    ];

    // 2024年 (令和6年) - NAO暦要項「国民の祝日」
    const holidays2024: [string, string][] = [
      ['2024-01-01', '元日'],
      ['2024-01-08', '成人の日'],
      ['2024-02-11', '建国記念の日'],
      ['2024-02-12', '振替休日'],
      ['2024-02-23', '天皇誕生日'],
      ['2024-03-20', '春分の日'],
      ['2024-04-29', '昭和の日'],
      ['2024-05-03', '憲法記念日'],
      ['2024-05-04', 'みどりの日'],
      ['2024-05-05', 'こどもの日'],
      ['2024-05-06', '振替休日'],
      ['2024-07-15', '海の日'],
      ['2024-08-11', '山の日'],
      ['2024-08-12', '振替休日'],
      ['2024-09-16', '敬老の日'],
      ['2024-09-22', '秋分の日'],
      ['2024-09-23', '振替休日'],
      ['2024-10-14', 'スポーツの日'],
      ['2024-11-03', '文化の日'],
      ['2024-11-04', '振替休日'],
      ['2024-11-23', '勤労感謝の日'],
    ];

    // 2025年 (令和7年) - NAO暦要項「国民の祝日」
    const holidays2025: [string, string][] = [
      ['2025-01-01', '元日'],
      ['2025-01-13', '成人の日'],
      ['2025-02-11', '建国記念の日'],
      ['2025-02-23', '天皇誕生日'],
      ['2025-02-24', '振替休日'],
      ['2025-03-20', '春分の日'],
      ['2025-04-29', '昭和の日'],
      ['2025-05-03', '憲法記念日'],
      ['2025-05-04', 'みどりの日'],
      ['2025-05-05', 'こどもの日'],
      ['2025-05-06', '振替休日'],
      ['2025-07-21', '海の日'],
      ['2025-08-11', '山の日'],
      ['2025-09-15', '敬老の日'],
      ['2025-09-23', '秋分の日'],
      ['2025-10-13', 'スポーツの日'],
      ['2025-11-03', '文化の日'],
      ['2025-11-23', '勤労感謝の日'],
      ['2025-11-24', '振替休日'],
    ];

    // 2026年 (令和8年) - NAO暦要項「国民の祝日」
    const holidays2026: [string, string][] = [
      ['2026-01-01', '元日'],
      ['2026-01-12', '成人の日'],
      ['2026-02-11', '建国記念の日'],
      ['2026-02-23', '天皇誕生日'],
      ['2026-03-20', '春分の日'],
      ['2026-04-29', '昭和の日'],
      ['2026-05-03', '憲法記念日'],
      ['2026-05-04', 'みどりの日'],
      ['2026-05-05', 'こどもの日'],
      ['2026-05-06', '振替休日'],
      ['2026-07-20', '海の日'],
      ['2026-08-11', '山の日'],
      ['2026-09-21', '敬老の日'],
      ['2026-09-22', '国民の休日'],
      ['2026-09-23', '秋分の日'],
      ['2026-10-12', 'スポーツの日'],
      ['2026-11-03', '文化の日'],
      ['2026-11-23', '勤労感謝の日'],
    ];

    it.each(holidays2018)('2018: %s should be %s', (dateStr, expectedName) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe(expectedName);
    });

    it.each(holidays2019)('2019: %s should be %s', (dateStr, expectedName) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe(expectedName);
    });

    it.each(holidays2020)('2020: %s should be %s', (dateStr, expectedName) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe(expectedName);
    });

    it.each(holidays2021)('2021: %s should be %s', (dateStr, expectedName) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe(expectedName);
    });

    it.each(holidays2022)('2022: %s should be %s', (dateStr, expectedName) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe(expectedName);
    });

    it.each(holidays2023)('2023: %s should be %s', (dateStr, expectedName) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe(expectedName);
    });

    it.each(holidays2024)('2024: %s should be %s', (dateStr, expectedName) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe(expectedName);
    });

    it.each(holidays2025)('2025: %s should be %s', (dateStr, expectedName) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe(expectedName);
    });

    it.each(holidays2026)('2026: %s should be %s', (dateStr, expectedName) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe(expectedName);
    });

    // 2027年 (令和9年) - NAO暦要項「国民の祝日」
    const holidays2027: [string, string][] = [
      ['2027-01-01', '元日'],
      ['2027-01-11', '成人の日'],
      ['2027-02-11', '建国記念の日'],
      ['2027-02-23', '天皇誕生日'],
      ['2027-03-21', '春分の日'],
      ['2027-03-22', '振替休日'],
      ['2027-04-29', '昭和の日'],
      ['2027-05-03', '憲法記念日'],
      ['2027-05-04', 'みどりの日'],
      ['2027-05-05', 'こどもの日'],
      ['2027-07-19', '海の日'],
      ['2027-08-11', '山の日'],
      ['2027-09-20', '敬老の日'],
      ['2027-09-23', '秋分の日'],
      ['2027-10-11', 'スポーツの日'],
      ['2027-11-03', '文化の日'],
      ['2027-11-23', '勤労感謝の日'],
    ];

    it.each(holidays2027)('2027: %s should be %s', (dateStr, expectedName) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      expect(isHoliday(date)).toBe(true);
      expect(getName(date)).toBe(expectedName);
    });
  });

  describe('Non-holidays (Random weekdays 2018-2027)', () => {
    // ランダムな平日（祝日でない日）
    const nonHolidays: string[] = [
      // 2018年
      '2018-01-15', '2018-02-14', '2018-03-15', '2018-04-10',
      '2018-05-15', '2018-06-20', '2018-07-25', '2018-08-15',
      '2018-10-15', '2018-12-10',
      // 2019年
      '2019-01-15', '2019-02-20', '2019-03-15', '2019-04-15',
      '2019-05-15', '2019-06-12', '2019-07-22', '2019-08-20',
      '2019-10-15', '2019-12-10',
      // 2020年
      '2020-01-15', '2020-02-18', '2020-03-15', '2020-04-15',
      '2020-05-15', '2020-06-17', '2020-07-15', '2020-08-15',
      '2020-10-15', '2020-12-10',
      // 2021年
      '2021-01-15', '2021-02-17', '2021-03-15', '2021-04-15',
      '2021-05-17', '2021-06-16', '2021-07-15', '2021-08-15',
      '2021-10-15', '2021-12-10',
      // 2022年
      '2022-01-17', '2022-02-16', '2022-03-15', '2022-04-15',
      '2022-05-16', '2022-06-15', '2022-07-15', '2022-08-15',
      '2022-10-17', '2022-12-12',
      // 2023年
      '2023-01-16', '2023-02-15', '2023-03-15', '2023-04-17',
      '2023-05-15', '2023-06-14', '2023-07-18', '2023-08-15',
      '2023-10-16', '2023-12-11',
      // 2024年
      '2024-01-15', '2024-02-14', '2024-03-15', '2024-04-15',
      '2024-05-15', '2024-06-12', '2024-07-17', '2024-08-15',
      '2024-10-15', '2024-12-10',
      // 2025年
      '2025-01-15', '2025-02-14', '2025-03-17', '2025-04-15',
      '2025-05-15', '2025-06-11', '2025-07-15', '2025-08-15',
      '2025-10-15', '2025-12-10',
      // 2026年
      '2026-01-15', '2026-02-16', '2026-03-16', '2026-04-15',
      '2026-05-15', '2026-06-15', '2026-07-15', '2026-08-17',
      '2026-10-15', '2026-12-10',
      // 2027年
      '2027-01-15', '2027-02-17', '2027-03-15', '2027-04-15',
      '2027-05-14', '2027-06-16', '2027-07-15', '2027-08-18',
      '2027-10-15', '2027-12-10',
    ];

    it.each(nonHolidays)('%s should not be a holiday', (dateStr) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      expect(isHoliday(date)).toBe(false);
      expect(getName(date)).toBeNull();
    });
  });

  describe('between()', () => {
    it('should return holidays in April-May 2024', () => {
      // 04-29 昭和の日, 05-03 憲法記念日, 05-04 みどりの日, 05-05 こどもの日, 05-06 振替休日
      const holidays = between(new Date(2024, 3, 1), new Date(2024, 4, 31));
      expect(holidays.length).toBe(5);
      expect(holidays[0].date).toBe('2024-04-29');
      expect(holidays[0].name).toBe('昭和の日');
      expect(holidays[1].date).toBe('2024-05-03');
      expect(holidays[1].name).toBe('憲法記念日');
    });

    it('should return empty array when no holidays in range', () => {
      const holidays = between(new Date(2024, 5, 10), new Date(2024, 5, 20));
      expect(holidays.length).toBe(0);
    });

    it('should include both start and end dates', () => {
      const holidays = between(new Date(2024, 0, 1), new Date(2024, 0, 1));
      expect(holidays.length).toBe(1);
      expect(holidays[0].name).toBe('元日');
    });

    it('should return holidays across years', () => {
      const holidays = between(new Date(2024, 11, 20), new Date(2025, 0, 15));
      expect(holidays.length).toBe(2); // 2025-01-01 元日, 2025-01-13 成人の日
      expect(holidays[0].date).toBe('2025-01-01');
      expect(holidays[1].date).toBe('2025-01-13');
    });

    it('should include English name and description', () => {
      const holidays = between(new Date(2024, 0, 1), new Date(2024, 0, 1));
      expect(holidays[0].nameEn).toBe("New Year's Day");
      expect(holidays[0].description).toBe('年のはじめを祝う。');
    });

    it('should work with JpHoliday class', () => {
      const holidays = JpHoliday.between(new Date(2024, 0, 1), new Date(2024, 0, 10));
      expect(holidays.length).toBe(2); // 元日, 成人の日(1/8)
    });
  });

  describe('configure()', () => {
    afterEach(() => {
      resetConfig();
    });

    it('should set maxBetweenDays limit', () => {
      configure({ maxBetweenDays: 365 });
      expect(getConfig().maxBetweenDays).toBe(365);
    });

    it('should throw error when range exceeds maxBetweenDays', () => {
      configure({ maxBetweenDays: 30 });
      expect(() => {
        between(new Date(2024, 0, 1), new Date(2024, 11, 31));
      }).toThrow(/exceeds maximum allowed days/);
    });

    it('should not throw when range is within maxBetweenDays', () => {
      configure({ maxBetweenDays: 365 });
      expect(() => {
        between(new Date(2024, 0, 1), new Date(2024, 5, 30));
      }).not.toThrow();
    });

    it('should allow unlimited when maxBetweenDays is 0', () => {
      configure({ maxBetweenDays: 0 });
      expect(() => {
        between(new Date(2024, 0, 1), new Date(2025, 11, 31));
      }).not.toThrow();
    });

    it('should reset config to defaults', () => {
      configure({ maxBetweenDays: 100 });
      resetConfig();
      expect(getConfig().maxBetweenDays).toBe(0);
    });

    it('should work with JpHoliday class', () => {
      JpHoliday.configure({ maxBetweenDays: 10 });
      expect(JpHoliday.getConfig().maxBetweenDays).toBe(10);
      JpHoliday.resetConfig();
    });
  });
});
