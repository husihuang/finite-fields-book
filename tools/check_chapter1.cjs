const { chromium } = require('C:/Users/husih/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('path');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8765/chapters/c01.html');
  await page.locator('.cyclic-result').waitFor(); await page.waitForFunction(() => !!document.querySelector('mjx-container svg')); assert.equal(await page.locator('mjx-merror').count(), 0);
  assert.match(await page.locator('.cyclic-result').innerText(), /元素 2 的阶 = 3/);
  for (let n = 2; n <= 30; n++) {
    await page.locator('.cyclic-n').fill(String(n));
    for (let a = 0; a < n; a++) {
      await page.locator('.cyclic-a').fill(String(a));
      const gcd = (x,y) => y ? gcd(y,x%y) : x;
      assert.match(await page.locator('.cyclic-result').innerText(), new RegExp(`元素 ${a} 的阶 = ${n/gcd(n,a)}(?:\\n|$)`));
    }
  }
  await page.locator('.cyclic-n').fill('6'); await page.locator('.cyclic-a').fill('2');
  await page.locator('.cyclic-a').fill('6'); assert.match(await page.locator('.cyclic-result').innerText(), /请输入 0 到 5/);
  await page.locator('.cyclic-a').fill('2');
  await page.locator('.cyclic-n').fill(''); assert.match(await page.locator('.cyclic-result').innerText(), /请输入 2 到 30/);
  await page.locator('.cyclic-n').fill('6');
  const paragraphs = page.locator('.source-line');
  await paragraphs.first().focus(); await page.keyboard.press('ArrowDown');
  assert.equal(await paragraphs.nth(1).evaluate(e => document.activeElement === e), true);
  const position = await page.locator('#reader-position').innerText();
  await page.locator('#reader-notes').focus(); await page.keyboard.press('ArrowDown');
  assert.equal(await page.locator('#reader-position').innerText(), position);
  await page.locator('#reader-notes').click(); assert.equal(await page.locator('.reading-note').first().isVisible(), false);
  await page.locator('#reader-notes').click();
  await page.locator('.quiz [data-correct="yes"]').click(); assert.match(await page.locator('.quiz-feedback').innerText(), /回答正确/);
  await page.locator('#note-1').fill('检查：单位元唯一'); await page.reload();
  assert.equal(await page.locator('#note-1').inputValue(), '检查：单位元唯一');
  await page.locator('#note-1').fill('');
  for (let i = 1; i <= 9; i++) assert.equal(await page.locator(`#slide-${String(i).padStart(3,'0')}`).count(), 1);
  await page.locator('#reader-reset').click(); await page.evaluate(() => { document.activeElement.blur(); scrollTo(0,0); }); await page.waitForTimeout(500); await page.screenshot({ path: 'finite-fields-book/_build/chapter-review/chapter1-desktop.png', fullPage: false });
  await page.setViewportSize({ width: 390, height: 844 }); await page.reload(); await page.waitForFunction(() => !!document.querySelector('mjx-container svg')); await page.evaluate(() => scrollTo(0,0)); await page.waitForTimeout(500);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
  await page.screenshot({ path: 'finite-fields-book/_build/chapter-review/chapter1-mobile.png', fullPage: false });
  await page.evaluate(() => document.documentElement.dataset.theme = 'dark');
  await page.waitForTimeout(300); await page.screenshot({ path: 'finite-fields-book/_build/chapter-review/chapter1-dark.png', fullPage: false });
  assert.deepEqual(errors, []);
  await page.goto('http://127.0.0.1:8765/chapters/c16.html');
  assert.match(await page.locator('.ff-widget .result').innerText(), /GF\(2\^4\)/);
  assert.deepEqual(errors, []);
  console.log('Passed: 464 cyclic-group cases, invalid inputs, focus navigation, quizzes, note reload, PPT anchors, mobile width, and existing field calculator.');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });


