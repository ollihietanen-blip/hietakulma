#!/bin/bash
# Hietakulma verkkosivukuvien kopiointiskripti
# Aja tämä OneDrive-kansion juuresta (Markkinointi - Tiedostot)
# Käyttö: bash hietakulma.fi/verkkosivukuvat/kopioi-kuvat.sh

SRC="Kuvat"
DST="hietakulma.fi/verkkosivukuvat"

echo "=== HIETAKULMA VERKKOSIVUKUVIEN KOPIOINTI ==="
echo ""

# ─── HERO-KUVAT (etusivu ja alasivujen herot) ───
echo ">> Hero-kuvat (drone-kuvat tehtaasta)"
cp "$SRC/Koskenojankatu 11 kopterikuvat/DJI_0196.JPG" "$DST/hero/tehdas-drone-01.jpg" 2>/dev/null && echo "  OK: tehdas-drone-01.jpg"
cp "$SRC/Koskenojankatu 11 kopterikuvat/DJI_0190.JPG" "$DST/hero/tehdas-drone-02.jpg" 2>/dev/null && echo "  OK: tehdas-drone-02.jpg"
cp "$SRC/Koskenojankatu 11 kopterikuvat/DJI_0192.JPG" "$DST/hero/tehdas-drone-03.jpg" 2>/dev/null && echo "  OK: tehdas-drone-03.jpg"
cp "$SRC/Koskenojankatu 11 kopterikuvat/Restauroitu/HietakulmaOy_Koskenojankatu_11.jpg" "$DST/hero/tehdas-drone-restauroitu.jpg" 2>/dev/null && echo "  OK: tehdas-drone-restauroitu.jpg"

# ─── KOHTEET: Kirjavaisenkatu 40 (Huunala) — ammattikuvat, HDR ───
echo ""
echo ">> Kohteet: Kirjavaisenkatu 40 / Huunala (ammattivalokuvaus)"
for f in 01_DJI_0965-HDR.jpg 02_DJI_0955-HDR.jpg 03_DJI_0935-HDR.jpg 07_1KUV0829-HDR.jpg 10_1KUV0904-HDR.jpg 28_1KUV1034-HDR.jpg; do
  cp "$SRC/Kohteet/Kirjavaisenkatu 40/Huunala B7/$f" "$DST/kohteet/kirjavaisenkatu-40/" 2>/dev/null && echo "  OK: B7/$f"
done
for f in 01_DJI_0735-HDR.jpg 02_1KUV0497-HDR.jpg 03_1KUV0461-HDR.jpg; do
  cp "$SRC/Kohteet/Kirjavaisenkatu 40/Huunala A1/$f" "$DST/kohteet/kirjavaisenkatu-40/" 2>/dev/null && echo "  OK: A1/$f"
done
for f in 01_DJI_0755-HDR.jpg 02_DJI_0765-HDR.jpg 03_1KUV0542-HDR.jpg; do
  cp "$SRC/Kohteet/Kirjavaisenkatu 40/Huunala A2/$f" "$DST/kohteet/kirjavaisenkatu-40/" 2>/dev/null && echo "  OK: A2/$f"
done

# ─── KOHTEET: Nokia (ammattikuvat) ───
echo ""
echo ">> Kohteet: Nokia (ammattikuvat DSC-sarja)"
cp "$SRC/Kohteet/Nokia/Kohde 1/DSC01201.jpg" "$DST/kohteet/nokia/nokia-kohde1-01.jpg" 2>/dev/null && echo "  OK: nokia-kohde1-01.jpg"
cp "$SRC/Kohteet/Nokia/Kohde 1/DSC01213.jpg" "$DST/kohteet/nokia/nokia-kohde1-02.jpg" 2>/dev/null && echo "  OK: nokia-kohde1-02.jpg"
cp "$SRC/Kohteet/Nokia/Kohde 2/DSC01246.jpg" "$DST/kohteet/nokia/nokia-kohde2-01.jpg" 2>/dev/null && echo "  OK: nokia-kohde2-01.jpg"
cp "$SRC/Kohteet/Nokia/Kohde 2/DSC01256.jpg" "$DST/kohteet/nokia/nokia-kohde2-02.jpg" 2>/dev/null && echo "  OK: nokia-kohde2-02.jpg"
cp "$SRC/Kohteet/Nokia/Kohde 2/DSC01997.jpg" "$DST/kohteet/nokia/nokia-kohde2-03.jpg" 2>/dev/null && echo "  OK: nokia-kohde2-03.jpg"

# ─── KOHTEET: Vesikkotie, Vantaa ───
echo ""
echo ">> Kohteet: Vesikkotie, Vantaa"
cp "$SRC/Kohteet/Vesikkotie, Vantaa/FI-6009558-1-1.jpg" "$DST/kohteet/vesikkotie-vantaa/vesikkotie-01.jpg" 2>/dev/null && echo "  OK: vesikkotie-01.jpg"
cp "$SRC/Kohteet/Vesikkotie, Vantaa/FI-6009558-1-10.jpg" "$DST/kohteet/vesikkotie-vantaa/vesikkotie-02.jpg" 2>/dev/null && echo "  OK: vesikkotie-02.jpg"
cp "$SRC/Kohteet/Vesikkotie, Vantaa/FI-6009558-1-16.jpg" "$DST/kohteet/vesikkotie-vantaa/vesikkotie-03.jpg" 2>/dev/null && echo "  OK: vesikkotie-03.jpg"

# ─── KOHTEET: Leppätie, Pori ───
echo ""
echo ">> Kohteet: Leppätie 5-9, Pori (rivitalot)"
cp "$SRC/Kohteet/Leppätie 5-9, Pori/IMG_0607.jpg" "$DST/kohteet/leppatie-pori/leppatie-01.jpg" 2>/dev/null && echo "  OK: leppatie-01.jpg"
cp "$SRC/Kohteet/Leppätie 5-9, Pori/IMG_0609.jpg" "$DST/kohteet/leppatie-pori/leppatie-02.jpg" 2>/dev/null && echo "  OK: leppatie-02.jpg"
cp "$SRC/Kohteet/Leppätie 5-9, Pori/IMG_1375.jpg" "$DST/kohteet/leppatie-pori/leppatie-03.jpg" 2>/dev/null && echo "  OK: leppatie-03.jpg"

# ─── KOHTEET: Hankreetintie, Pori (uusi 2025) ───
echo ""
echo ">> Kohteet: Hankreetintie 189, Pori (OKT, 2025)"
cp "$SRC/Kohteet/Hankreetintie 189, Pori - OKT Kangasmaa/Talo_16102025 (1).jpg" "$DST/kohteet/hankreetintie-pori/hankreetintie-valmis-01.jpg" 2>/dev/null && echo "  OK: hankreetintie-valmis-01.jpg"
cp "$SRC/Kohteet/Hankreetintie 189, Pori - OKT Kangasmaa/IMG20250126152643.jpg" "$DST/kohteet/hankreetintie-pori/hankreetintie-rakennus-01.jpg" 2>/dev/null && echo "  OK: hankreetintie-rakennus-01.jpg"

# ─── KOHTEET: Tampere ───
echo ""
echo ">> Kohteet: Tampere (kohde 9, ammattikuvat)"
cp "$SRC/Kohteet/Tampere/Kohde 9/DSC01790.jpg" "$DST/kohteet/tampere/tampere-01.jpg" 2>/dev/null && echo "  OK: tampere-01.jpg"
cp "$SRC/Kohteet/Tampere/Kohde 9/DSC02004.jpg" "$DST/kohteet/tampere/tampere-02.jpg" 2>/dev/null && echo "  OK: tampere-02.jpg"

# ─── KOHTEET: Pori (kohteet 3, 5, 6 — ammattikuvat) ───
echo ""
echo ">> Kohteet: Pori (ammattikuvat DSC-sarja)"
cp "$SRC/Kohteet/Pori/Kohde 3/DSC01887.jpg" "$DST/kohteet/pori/pori-kohde3-01.jpg" 2>/dev/null && echo "  OK: pori-kohde3-01.jpg"
cp "$SRC/Kohteet/Pori/Kohde 3/DSC01890.jpg" "$DST/kohteet/pori/pori-kohde3-02.jpg" 2>/dev/null && echo "  OK: pori-kohde3-02.jpg"
cp "$SRC/Kohteet/Pori/Kohde 5/DSC01798.jpg" "$DST/kohteet/pori/pori-kohde5-01.jpg" 2>/dev/null && echo "  OK: pori-kohde5-01.jpg"
cp "$SRC/Kohteet/Pori/Kohde 6/DSC02971.jpg" "$DST/kohteet/pori/pori-kohde6-01.jpg" 2>/dev/null && echo "  OK: pori-kohde6-01.jpg"
cp "$SRC/Kohteet/Pori/Kohde 6/DSC02982.jpg" "$DST/kohteet/pori/pori-kohde6-02.jpg" 2>/dev/null && echo "  OK: pori-kohde6-02.jpg"

# ─── KOHTEET: Pyrstötiaisentie (rivitalot) ───
echo ""
echo ">> Kohteet: Pyrstötiaisentie (rivitalot)"
cp "$SRC/Kohteet/Rivitalot/Pyrstötiaisentie/202.JPG" "$DST/kohteet/pyrstotiaisentie/pyrstotiaisentie-01.jpg" 2>/dev/null && echo "  OK: pyrstotiaisentie-01.jpg"
cp "$SRC/Kohteet/Rivitalot/Pyrstötiaisentie/203.JPG" "$DST/kohteet/pyrstotiaisentie/pyrstotiaisentie-02.jpg" 2>/dev/null && echo "  OK: pyrstotiaisentie-02.jpg"
cp "$SRC/Kohteet/Rivitalot/Pyrstötiaisentie/204.JPG" "$DST/kohteet/pyrstotiaisentie/pyrstotiaisentie-03.jpg" 2>/dev/null && echo "  OK: pyrstotiaisentie-03.jpg"

# ─── KOHTEET: Höyläkatu (tuore 2025) ───
echo ""
echo ">> Kohteet: Höyläkatu (2025)"
cp "$SRC/Kohteet/Höyläkatu/20250317_104347.jpg" "$DST/kohteet/hoylakatu/hoylakatu-01.jpg" 2>/dev/null && echo "  OK: hoylakatu-01.jpg"
cp "$SRC/Kohteet/Höyläkatu/20250317_104358.jpg" "$DST/kohteet/hoylakatu/hoylakatu-02.jpg" 2>/dev/null && echo "  OK: hoylakatu-02.jpg"

# ─── KOHTEET: Maitiaisentie, Tuusula ───
echo ""
echo ">> Kohteet: Maitiaisentie 9, Tuusula"
cp "$SRC/Kohteet/Maitiaisentie 9, Tuusula/IMG_1607.jpg" "$DST/kohteet/maitiaisentie-tuusula/maitiaisentie-01.jpg" 2>/dev/null && echo "  OK: maitiaisentie-01.jpg"
cp "$SRC/Kohteet/Maitiaisentie 9, Tuusula/IMG_1608.jpg" "$DST/kohteet/maitiaisentie-tuusula/maitiaisentie-02.jpg" 2>/dev/null && echo "  OK: maitiaisentie-02.jpg"

# ─── TEHDAS: Elementtituotanto ───
echo ""
echo ">> Tehdas: Elementtituotanto"
for f in IMG_4213.JPG IMG_4214.JPG IMG_4215.JPG IMG_4219.JPG IMG_4220.JPG IMG_4222.JPG IMG_4225.JPG IMG_4236.JPG IMG_4265.JPG IMG_4268.JPG; do
  cp "$SRC/Kohteet/Tehdas/Elementti/$f" "$DST/tehdas/elementtituotanto/" 2>/dev/null && echo "  OK: elementti/$f"
done

# ─── TEHDAS: Ristikkotuotanto ───
echo ""
echo ">> Tehdas: Ristikkotuotanto"
for f in IMG_4251.JPG IMG_4253.JPG IMG_4255.JPG IMG_4256.JPG IMG_4260.JPG IMG_4262.JPG IMG_4263.JPG; do
  cp "$SRC/Kohteet/Tehdas/Ristikko/$f" "$DST/tehdas/ristikkotuotanto/" 2>/dev/null && echo "  OK: ristikko/$f"
done

# ─── TEHDAS: Dronekuvat ───
echo ""
echo ">> Tehdas: Dronekuvat Koskenojankatu 11"
cp "$SRC/Koskenojankatu 11 kopterikuvat/DJI_0189.JPG" "$DST/tehdas/dronekuvat/tehdas-drone-01.jpg" 2>/dev/null && echo "  OK: tehdas-drone-01.jpg"
cp "$SRC/Koskenojankatu 11 kopterikuvat/DJI_0193.JPG" "$DST/tehdas/dronekuvat/tehdas-drone-02.jpg" 2>/dev/null && echo "  OK: tehdas-drone-02.jpg"
cp "$SRC/Koskenojankatu 11 kopterikuvat/DJI_0195.JPG" "$DST/tehdas/dronekuvat/tehdas-drone-03.jpg" 2>/dev/null && echo "  OK: tehdas-drone-03.jpg"

# ─── TYÖMAA: Nokia ammattikuvaus (prosessikuvat) ───
echo ""
echo ">> Työmaa: Nokia ammattikuvaukset (prosessikuvat)"
for num in 1 10 20 30 50 80 100 120 150 179 186; do
  cp "$SRC/Kohteet/Nokia, kuvaukset/Työmaakuvat/hietakulma-$num.jpg" "$DST/tehdas/elementtituotanto/tyomaa-nokia-$num.jpg" 2>/dev/null && echo "  OK: tyomaa-nokia-$num.jpg"
done

# ─── LOGOT ───
echo ""
echo ">> Logot"
cp "$SRC/Logot/Hietakulma_logo_valk.png" "$DST/logot/" 2>/dev/null && echo "  OK: logo_valk.png"
cp "$SRC/Logot/Hietakulma_logo_cmyk_musta.jpg" "$DST/logot/" 2>/dev/null && echo "  OK: logo_musta.jpg"

echo ""
echo "=== KOPIOINTI VALMIS ==="
echo "Tarkista kuvat kansiossa: $DST"
