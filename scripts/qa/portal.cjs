const { chromium, base, mailFile, output, verifyPreview } = require('./context.cjs');
const fs=require('node:fs');const assert=require('node:assert/strict');

function mailFor(email,subject){return fs.readFileSync(mailFile,'utf8').trim().split('\n').map(x=>JSON.parse(x)).filter(m=>m.to===email&&m.subject===subject).at(-1)}
(async()=>{
 await verifyPreview(); const browser=await chromium.launch({channel:'chrome',headless:true});
 try{for(const width of [1440,390]){
 const context=await browser.newContext({viewport:{width,height:width===390?844:1000}});const page=await context.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!m.location().url.endsWith('/favicon.ico'))errors.push(m.text())});
 const email=`browser-${width}-${Date.now()}@example.com`;const password='Testi-salasana-123';const updated='Testi-uusi-salasana-456';
 await page.goto(base+'/tietopankki');assert.equal(new URL(page.url()).pathname,'/login');
 await page.goto(base+'/signup');
 for(const [name,value]of Object.entries({firstName:'Maija',lastName:'Testaaja',email,company:'Testiyritys',useCase:'Tietopankin testaaminen'}))await page.locator(`[name="${name}"]`).first().fill(value);
 await page.locator('[name="roleCategory"]').selectOption('DESIGNER');await page.getByRole('checkbox').first().check();
 await page.getByRole('button',{name:'Lähetä vahvistuslinkki',exact:true}).click();
 await page.getByText('Tarkista sähköpostisi ja aktivoi tunnus 30 minuutin kuluessa.',{exact:true}).waitFor();
 const activation=mailFor(email,'Vahvista Hietakulman tietopankin käyttöoikeus').html.match(/token=([^"<]+)/)[1];
 await page.goto(base+'/activate?token='+activation);await page.getByRole('heading',{name:'Aseta salasana'}).waitFor();
 await page.getByLabel('Salasana',{exact:true}).fill(password);await page.getByLabel('Vahvista salasana',{exact:true}).fill(password);
 await page.getByRole('button',{name:'Aktivoi tunnus',exact:true}).click();await page.waitForURL('**/tietopankki');
 await page.getByText('Kirjautunut: '+email,{exact:true}).waitFor();
 await page.getByRole('button',{name:'Kirjaudu ulos',exact:true}).click();await page.waitForURL('**/login');
 await page.getByRole('link',{name:'Unohtuiko salasana?'}).click();await page.waitForURL('**/forgot-password');
 await page.getByLabel('Sähköpostiosoite',{exact:true}).fill(email);await page.getByRole('button',{name:'Lähetä palautuslinkki'}).click();
 await page.getByRole('status').filter({hasText:'Jos osoitteella on käyttäjätunnus'}).waitFor();
 const reset=mailFor(email,'Vaihda Hietakulman tietopankin salasana').text.match(/token=([^\s]+)/)[1];
 await page.goto(base+'/reset-password?token='+reset);await page.getByLabel('Uusi salasana',{exact:true}).fill(updated);await page.getByLabel('Vahvista uusi salasana',{exact:true}).fill(updated);
 await page.getByRole('button',{name:'Vaihda salasana',exact:true}).click();await page.getByRole('status').filter({hasText:'Salasana on vaihdettu'}).waitFor();
 await page.screenshot({path:output(`hietakulma-reset-success-${width}.png`)});
 await page.getByRole('link',{name:'Takaisin kirjautumiseen'}).click();await page.waitForURL('**/login');await page.getByRole('heading',{name:'Kirjaudu tietopankkiin'}).waitFor();
 await page.locator('[name="email"]').first().fill(email);await page.locator('[name="password"]').fill(updated);await page.getByRole('button',{name:'Kirjaudu sisään',exact:true}).click();await page.waitForURL('**/tietopankki').catch(async e=>{console.log('FAILED LOGIN',page.url(),await page.locator('form').first().innerText());await page.screenshot({path:output('hietakulma-login-failure.png')});throw e});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);assert.equal(await page.locator('nextjs-portal').count(),0);assert.deepEqual(errors,[]);
 console.log(JSON.stringify({width,result:'PASS',flow:'signup → activation → authenticated portal → logout → reset request → change password → login with new password',realDatabase:true,externalEmailsSent:0}));
 await context.close();
 }}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
