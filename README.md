# jp-holiday

[English](#english) | [日本語](#日本語)

---

## English

Japanese national holidays library for JavaScript/TypeScript.

Verified against the [National Astronomical Observatory of Japan (NAO)](https://eco.mtk.nao.ac.jp/koyomi/) official data.

### Installation

```bash
npm install jp-holiday
# or
yarn add jp-holiday
```

### Usage

```typescript
import { isHoliday, getName, getNameEn, getHolidayInfo, getHolidaysInYear } from 'jp-holiday';

const date = new Date(2024, 0, 1); // January 1, 2024

if (isHoliday(date)) {
  console.log(getName(date));    // '元日'
  console.log(getNameEn(date));  // "New Year's Day"
}

// Get all holidays in a year
const holidays = getHolidaysInYear(2024);
```

#### CommonJS

```javascript
const { isHoliday, getName } = require('jp-holiday');
```

#### Class-based API

```typescript
import { JpHoliday } from 'jp-holiday';
JpHoliday.isHoliday(date);
JpHoliday.getName(date);
```

### API

| Function | Returns | Description |
|----------|---------|-------------|
| `isHoliday(date)` | `boolean` | Whether the date is a holiday |
| `getName(date)` | `string \| null` | Holiday name in Japanese |
| `getNameEn(date)` | `string \| null` | Holiday name in English |
| `getDescription(date)` | `string \| null` | Holiday description in Japanese |
| `getHolidayInfo(date)` | `HolidayInfo \| null` | Full holiday info object |
| `getHolidaysInYear(year)` | `Record<string, HolidayInfo>` | All holidays in a year |
| `between(start, end)` | `HolidayEntry[]` | Holidays within date range |

#### between()

```typescript
import { between } from 'jp-holiday';

const holidays = between(new Date('2024-04-01'), new Date('2024-05-31'));
// [{ date: '2024-04-29', name: '昭和の日', nameEn: 'Showa Day', ... }, ...]
```

### Configuration

Limit date ranges for `between()` to prevent DoS:

```typescript
import { configure, getConfig, resetConfig } from 'jp-holiday';

configure({ maxBetweenDays: 365 });  // Limit to 365 days
getConfig();                          // { maxBetweenDays: 365 }
resetConfig();                        // Reset to default (no limit)
```

### Supported Holidays

- Fixed holidays (New Year's Day, National Foundation Day, etc.)
- Happy Monday holidays (Coming of Age Day, Marine Day, etc.)
- Equinox days (Vernal/Autumnal Equinox Day)
- Substitute holidays (振替休日)
- Citizen's holidays (国民の休日)
- Special: 2019 Imperial transition, 2020/2021 Olympics

### Limitations

This library only supports dates from **July 20, 1948** onwards, when the [National Holidays Act](https://laws.e-gov.go.jp/law/323AC1000000178) (国民の祝日に関する法律) was enacted. Dates before this will return empty/null.

### Data Sources & Maintenance

Equinox dates (Vernal Equinox Day, Autumnal Equinox Day) are hardcoded based on official announcements from the National Astronomical Observatory of Japan. The dates are published in the "Reki-yoko" (暦要項) around February 1st each year for the following year.

**References:**
- [国立天文台 暦要項](https://eco.mtk.nao.ac.jp/koyomi/yoko/) - Official equinox dates
- [国立天文台 FAQ](https://www.nao.ac.jp/faq/a0301.html) - About equinox calculation
- [祝日の計算方法](http://www.asahi-net.or.jp/~ci5m-nmr/misc/holiday.html) - Reference for historical data

**Note:** This library requires annual updates to add new equinox dates. Please check for updates or contribute if you notice missing data.

### License

MIT

---

## 日本語

日本の祝日を判定するJavaScript/TypeScriptライブラリ

[国立天文台 暦要項](https://eco.mtk.nao.ac.jp/koyomi/)の公式データで検証済み。

### インストール

```bash
npm install jp-holiday
# or
yarn add jp-holiday
```

### 使い方

```typescript
import { isHoliday, getName, getNameEn, getHolidayInfo, getHolidaysInYear } from 'jp-holiday';

const date = new Date(2024, 0, 1); // 2024年1月1日

if (isHoliday(date)) {
  console.log(getName(date));    // '元日'
  console.log(getNameEn(date));  // "New Year's Day"
}

// 1年分の祝日を取得
const holidays = getHolidaysInYear(2024);
```

#### CommonJS

```javascript
const { isHoliday, getName } = require('jp-holiday');
```

#### クラスベースAPI

```typescript
import { JpHoliday } from 'jp-holiday';
JpHoliday.isHoliday(date);
JpHoliday.getName(date);
```

### API

| 関数 | 戻り値 | 説明 |
|------|--------|------|
| `isHoliday(date)` | `boolean` | 祝日かどうか |
| `getName(date)` | `string \| null` | 祝日名（日本語） |
| `getNameEn(date)` | `string \| null` | 祝日名（英語） |
| `getDescription(date)` | `string \| null` | 祝日の説明 |
| `getHolidayInfo(date)` | `HolidayInfo \| null` | 祝日情報オブジェクト |
| `getHolidaysInYear(year)` | `Record<string, HolidayInfo>` | 1年分の祝日 |
| `between(start, end)` | `HolidayEntry[]` | 期間内の祝日 |

#### between()

```typescript
import { between } from 'jp-holiday';

const holidays = between(new Date('2024-04-01'), new Date('2024-05-31'));
// [{ date: '2024-04-29', name: '昭和の日', nameEn: 'Showa Day', ... }, ...]
```

### グローバル設定

`between()` の日数制限でDoS対策:

```typescript
import { configure, getConfig, resetConfig } from 'jp-holiday';

configure({ maxBetweenDays: 365 });  // 最大365日に制限
getConfig();                          // { maxBetweenDays: 365 }
resetConfig();                        // デフォルトにリセット（無制限）
```

### 対応する祝日

- 固定祝日（元日、建国記念の日など）
- ハッピーマンデー（成人の日、海の日など）
- 春分の日・秋分の日
- 振替休日
- 国民の休日
- 特例: 2019年皇位継承、2020/2021年オリンピック

### 制限事項

このライブラリは[国民の祝日に関する法律](https://laws.e-gov.go.jp/law/323AC1000000178)が施行された**1948年7月20日以降**の日付のみ対応しています。それ以前の日付は空/nullを返します。

### データソース・メンテナンス

春分の日・秋分の日は、国立天文台の公式発表に基づきハードコードしています。日付は毎年2月1日頃に翌年分が「暦要項」で発表されます。

**参照:**
- [国立天文台 暦要項](https://eco.mtk.nao.ac.jp/koyomi/yoko/) - 春分・秋分の公式日付
- [国立天文台 FAQ](https://www.nao.ac.jp/faq/a0301.html) - 春分・秋分の計算について
- [祝日の計算方法](http://www.asahi-net.or.jp/~ci5m-nmr/misc/holiday.html) - 過去のデータの参照元

**注意:** このライブラリは毎年の更新が必要です。データの不足に気づいた場合は、更新の確認またはコントリビュートをお願いします。

### ライセンス

MIT

---

## Author / 作者

Kiyoshi Sakai

## Related / 関連

- [jp-holiday-php](https://github.com/sakai/jp-holiday-php) - PHP version / PHP版
