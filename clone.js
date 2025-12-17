import Firecrawl from 'firecrawl';
import fs from 'fs';
import path from 'path';

// Firecrawl API key - aseta tämä ympäristömuuttujaan tai .env-tiedostoon
const apiKey = process.env.FIRECRAWL_API_KEY || 'fc-YOUR_API_KEY';
const targetUrl = 'https://pentagon-dolphin-ztr3.squarespace.com';

async function cloneWebsite() {
  try {
    console.log('Aloitetaan verkkosivuston kloonaus...');
    console.log(`Kohde: ${targetUrl}`);
    
    if (apiKey === 'fc-YOUR_API_KEY') {
      console.error('❌ Virhe: Aseta FIRECRAWL_API_KEY ympäristömuuttujaksi!');
      console.log('Esimerkki: $env:FIRECRAWL_API_KEY="fc-YOUR_API_KEY"');
      process.exit(1);
    }
    
    const app = new Firecrawl({ apiKey });

    // Vaihtoehto 1: Scrape - hakee yhden sivun
    console.log('\nHaetaan pääsivu...');
    const scrapeResult = await app.scrape(targetUrl, {
      formats: ['markdown', 'html'],
    });
    
    console.log('Pääsivu haettu onnistuneesti!');
    console.log(`Otsikko: ${scrapeResult.metadata?.title || 'Ei otsikkoa'}`);
    
    // Tallenna pääsivu
    const outputDir = './cloned-website';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Tallenna markdown-versio
    if (scrapeResult.markdown) {
      fs.writeFileSync(
        path.join(outputDir, 'index.md'),
        scrapeResult.markdown
      );
      console.log('✓ Tallenettu: index.md');
    }
    
    // Tallenna HTML-versio
    if (scrapeResult.html) {
      fs.writeFileSync(
        path.join(outputDir, 'index.html'),
        scrapeResult.html
      );
      console.log('✓ Tallenettu: index.html');
    }
    
    // Tallenna metadata
    if (scrapeResult.metadata) {
      fs.writeFileSync(
        path.join(outputDir, 'metadata.json'),
        JSON.stringify(scrapeResult.metadata, null, 2)
      );
      console.log('✓ Tallenettu: metadata.json');
    }
    
    // Vaihtoehto 2: Crawl - hakee koko verkkosivuston
    console.log('\n\nAloitetaan koko verkkosivuston kloonaus (crawl)...');
    console.log('Tämä voi kestää hetken...');
    
    const crawlResult = await app.crawl(targetUrl, {
      limit: 100, // Maksimimäärä sivuja
      scrapeOptions: {
        formats: ['markdown', 'html'],
      },
      excludePaths: ['/admin', '/api'], // Jätä admin- ja API-polut pois
    });
    
    console.log(`\nKloonaus valmis! Löydettiin ${crawlResult.data?.length || 0} sivua.`);
    
    // Tallenna kaikki crawlatut sivut
    if (crawlResult.data && Array.isArray(crawlResult.data)) {
      crawlResult.data.forEach((page, index) => {
        let fileName;
        
        // Yritä käyttää URL:ia tiedoston nimeämiseen
        try {
          const pageUrl = new URL(page.sourceURL || page.url || targetUrl);
          const pagePath = pageUrl.pathname || '/';
          
          if (pagePath === '/' || pagePath === '') {
            fileName = 'index';
          } else {
            // Poista alku- ja loppuslasheet ja korvaa erikoismerkit
            fileName = pagePath
              .replace(/^\//, '')
              .replace(/\/$/, '')
              .replace(/\//g, '_')
              .replace(/[^a-zA-Z0-9_-]/g, '_')
              .replace(/_+/g, '_')
              .replace(/^_|_$/g, '');
            
            // Jos tyhjä, käytä otsikkoa tai indeksiä
            if (!fileName || fileName === '') {
              fileName = `page_${index + 1}`;
            }
          }
        } catch (e) {
          // Jos URL-parsinta epäonnistuu, käytä otsikkoa tai indeksiä
          fileName = `page_${index + 1}`;
        }
        
        // Jos otsikko on saatavilla ja tiedosto on index, yritä käyttää otsikkoa
        if (fileName === 'index' && page.metadata?.title && index > 0) {
          const titleSlug = page.metadata.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_|_$/g, '')
            .substring(0, 50);
          if (titleSlug) {
            fileName = titleSlug;
          }
        }
        
        // Varmista että tiedostonimi on uniikki
        let finalFileName = fileName;
        let counter = 1;
        while (fs.existsSync(path.join(outputDir, `${finalFileName}.md`)) && 
               fs.readFileSync(path.join(outputDir, `${finalFileName}.md`), 'utf8') !== page.markdown) {
          finalFileName = `${fileName}_${counter}`;
          counter++;
        }
        
        // Tallenna markdown
        if (page.markdown) {
          const mdPath = path.join(outputDir, `${finalFileName}.md`);
          fs.writeFileSync(mdPath, page.markdown);
          console.log(`✓ Tallenettu: ${finalFileName}.md (${page.metadata?.title || 'Ei otsikkoa'})`);
        }
        
        // Tallenna HTML
        if (page.html) {
          const htmlPath = path.join(outputDir, `${finalFileName}.html`);
          fs.writeFileSync(htmlPath, page.html);
        }
        
        // Tallenna metadata jokaiselle sivulle
        if (page.metadata) {
          const metaPath = path.join(outputDir, `${finalFileName}_metadata.json`);
          fs.writeFileSync(metaPath, JSON.stringify({
            ...page.metadata,
            sourceURL: page.sourceURL || page.url,
            fileName: finalFileName
          }, null, 2));
        }
      });
      
      // Tallenna sitemap
      const sitemap = crawlResult.data.map((page, index) => {
        let fileName;
        try {
          const pageUrl = new URL(page.sourceURL || page.url || targetUrl);
          const pagePath = pageUrl.pathname || '/';
          fileName = pagePath === '/' || pagePath === '' 
            ? 'index' 
            : pagePath.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '_');
        } catch (e) {
          fileName = `page_${index + 1}`;
        }
        return {
          url: page.sourceURL || page.url,
          title: page.metadata?.title,
          description: page.metadata?.description,
          fileName: fileName
        };
      });
      
      fs.writeFileSync(
        path.join(outputDir, 'sitemap.json'),
        JSON.stringify(sitemap, null, 2)
      );
      console.log('✓ Tallenettu: sitemap.json');
    }
    
    console.log(`\n✅ Verkkosivusto kloonattu onnistuneesti kansioon: ${outputDir}`);
    
  } catch (error) {
    console.error('❌ Virhe kloonauksessa:', error.message);
    if (error.response) {
      console.error('API-vastaus:', error.response.data);
    }
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

cloneWebsite();

