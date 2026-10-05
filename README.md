# Ciro — Yasal Metinler

[Ciro: Kolay Para Yönetimi](https://github.com/ap520888/esnaf-nakit-defteri) uygulamasının
herkese açık yasal sayfaları (GitHub Pages ile yayımlanır):

- Gizlilik Politikası: https://ap520888.github.io/ciro-yasal/gizlilik.html
- Hesap ve Veri Silme: https://ap520888.github.io/ciro-yasal/hesap-silme.html
- Kullanım Koşulları: https://ap520888.github.io/ciro-yasal/kullanim-kosullari.html

Kaynak metinler ana repodaki `public/` klasöründe tutulur; değişiklikler oradan buraya kopyalanır.

Davet açılış sayfasının tek kaynağı bu depodaki `davet.html` ve `davet.js`
dosyalarıdır; uygulama paketine kopyalanmaz. Bağlantı regresyonları
`node --test test/davet.test.mjs` ile çalıştırılır.
