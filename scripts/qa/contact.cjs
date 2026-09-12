const { chromium, base, mailFile, output, verifyPreview } = require('./context.cjs');
const assert = require('node:assert/strict');
(async () => {
 await verifyPreview(); const browser = await chromium.launch({channel:'chrome',headless:true});
 try {
 for (const viewport of [{width:1440,height:1000},{width:390,height:844}]) {
  const page = await browser.newPage({viewport});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  const consoleErrors=[];page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
  let mode='failure'; let count=0;
  await page.route('**/api/contact', async route => {
    count++;
    if(mode==='network')return route.abort('internetdisconnected');
    if(mode==='malformed')return route.fulfill({status:200,contentType:'text/html',body:'Unavailable'});
    return route.fulfill({status:mode==='success'?200:502,contentType:'application/json',body:JSON.stringify(mode==='success'?{success:true}:{error:'Viestin lähetys epäonnistui. Yritä uudelleen tai ota yhteyttä sähköpostitse.'})});
  });
  await page.goto(base + '/ota-yhteytta',{waitUntil:'networkidle'});
  assert.match(await page.title(),/yhteyttä/i);
  const form=page.locator('form').filter({has:page.locator('textarea[name="message"]')});
  for(const [key,value] of Object.entries({firstName:'Maija',lastName:'Meikäläinen',email:'maija@example.com',phone:'040 1234567',company:'Testi Oy',message:'Tarvitsen tarjouksen.\nKiitos!'}))await form.locator(`[name="${key}"]`).fill(value);
  const submit=form.getByRole('button',{name:'LÄHETÄ',exact:true});
  for(const scenario of ['failure','network','malformed']) {
   mode=scenario; await submit.click();
   await form.getByRole('alert').waitFor({state:'visible'});
   assert.equal(await form.locator('[name="message"]').inputValue(),'Tarvitsen tarjouksen.\nKiitos!');
   assert.equal(await form.locator('[name="email"]').inputValue(),'maija@example.com');
   assert.equal(await submit.isEnabled(),true);
   assert.equal(await page.getByText('Kiitos yhteydenotostasi!',{exact:false}).count(),0);
   if(scenario==='failure'){
    assert.equal(await form.getByRole('alert').evaluate(el => document.activeElement === el), true);
    await page.screenshot({path:output(`hietakulma-contact-error-${viewport.width}.png`)});
   }
  }
  mode='success'; await submit.click();
  await page.getByRole('status').filter({hasText:'Kiitos yhteydenotostasi'}).waitFor();
  assert.equal(await form.count(),0);
  assert.equal(count,4);
  assert.deepEqual(errors,[]);
  assert.equal(await page.locator('nextjs-portal').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  console.log(JSON.stringify({viewport,url:page.url(),title:await page.title(),scenarios:'provider rejection, network failure, malformed response, successful retry: PASS',runtimeErrors:errors,consoleErrors}));
  await page.close();
 }
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
