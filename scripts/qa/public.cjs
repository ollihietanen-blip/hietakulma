const { chromium, base, mailFile, output, verifyPreview } = require('./context.cjs');
const assert=require('node:assert/strict');
(async()=>{
 await verifyPreview(); const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
 const sitemap=await (await fetch(base+'/sitemap.xml')).text();assert.ok(!sitemap.includes('/tietopankki'));
 const paths=[...sitemap.matchAll(/<loc>https:\/\/hietakulma.fi([^<]*)<\/loc>/g)].map(x=>x[1]||'/');
 for(const path of paths){const res=await fetch(base+path);assert.equal(res.status,200);const html=await res.text();assert.ok(html.includes('rel="canonical"'),path);assert.ok(html.includes('property="og:image"'),path)}
 for(const [old,dest]of [['/favicon.ico','/icon.svg'],['/puuristikot','/kattoristikot'],['/puutalot-ja-elementit','/puutalot'],['/asiakaskertomukset','/kohteet'],['/yritystarina','/tarina'],['/pyyda-tarjous-elementit','/ota-yhteytta'],['/pyyda-tarjous-kattoristikko','/ota-yhteytta']]){const res=await fetch(base+old,{redirect:'manual'});assert.equal(res.status,308);assert.equal(res.headers.get('location'),dest)}
 for(const path of ['/login','/signup','/activate','/forgot-password','/reset-password']){const html=await (await fetch(base+path)).text();assert.match(html,/<meta name="robots" content="noindex, nofollow"/)}
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:width===390?844:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  for(const path of paths){
   await page.goto(base+path,{waitUntil:'networkidle'});assert.ok(await page.getByRole('heading').count());assert.equal(await page.locator('nextjs-portal').count(),0);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,path);
   if(path==='/ota-yhteytta'){
    const people=page.locator('img[src*="henkilot"]');assert.equal(await people.count(),5);
    for(const img of await people.all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
    assert.equal(await page.locator('footer a[href="#"]').count(),0);
    assert.equal(await page.locator('footer a[aria-label="Facebook"]').getAttribute('href'),'https://www.facebook.com/hietakulma/');
    await people.first().scrollIntoViewIfNeeded();await page.waitForTimeout(500);await page.screenshot({path:output(`hietakulma-contacts-local-${width}.png`)});
   }
  }
  assert.deepEqual(errors,[]);console.log(JSON.stringify({width,status:'PASS',pages:paths.length,images:'5 local staff photos decoded',consoleErrors:errors}));await page.close();
 }
 console.log(JSON.stringify({sitemapPages:paths.length,redirects:7,privateNoindex:5,status:'PASS'}));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
