/**
 * 年間祝日確認スクリプト
 *
 * 使い方:
 *   node scripts/check-year.js 2027
 *   node scripts/check-year.js 2027 2028 2029
 *
 * メンテナンス手順（毎年2月頃）:
 * 1. 国立天文台 暦要項を確認: https://eco.mtk.nao.ac.jp/koyomi/yoko/
 * 2. 新年の春分・秋分の日付を src/index.ts に追加
 * 3. npm run build
 * 4. node scripts/check-year.js [年] で確認
 * 5. npm test でテスト実行
 * 6. npm version patch && npm publish
 */

const { between } = require('../dist/index.js');

const years = process.argv.slice(2).map(Number);

if (years.length === 0) {
  const currentYear = new Date().getFullYear();
  years.push(currentYear, currentYear + 1);
}

years.forEach(year => {
  if (isNaN(year)) return;

  console.log(`\n=== ${year}年 ===`);

  try {
    const holidays = between(new Date(`${year}-01-01`), new Date(`${year}-12-31`));

    holidays.forEach(h => {
      console.log(`${h.date}: ${h.name} (${h.nameEn})`);
    });

    console.log(`合計: ${holidays.length}件`);

    // 春分・秋分をハイライト
    const equinoxes = holidays.filter(h =>
      h.name === '春分の日' || h.name === '秋分の日'
    );
    if (equinoxes.length > 0) {
      console.log('\n[春分・秋分]');
      equinoxes.forEach(h => console.log(`  ${h.date}: ${h.name}`));
    }
  } catch (e) {
    console.log(`エラー: ${e.message}`);
  }
});

console.log('\n---');
console.log('参照: https://eco.mtk.nao.ac.jp/koyomi/yoko/');
