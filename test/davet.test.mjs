import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'

const script = readFileSync(new URL('../davet.js', import.meta.url), 'utf8')
const kod = `ESNAF-DAVET-1.${'a'.repeat(24)}.${Buffer.alloc(32).toString('base64')}`
const ortak = `ESNAF-ORTAK-1.${'b'.repeat(24)}`
const metin = `Ali'nin (Ciro) defterine ortak daveti\n${kod}\nCiro'yu aç\n${ortak}`
const zarf = `CIRO-DAVET-2\n${metin}\nCIRO-DAVET-SON`

function sayfa(ham, disIsaret = '', userAgent = 'Mozilla/5.0 (Linux; Android 14)', language = 'tr-TR') {
  const documentElement = {}
  const elemanlar = new Map()
  const kopyalanan = []
  const hash = '#' + encodeURIComponent(ham) + disIsaret
  const location = { hash, href: 'https://ap520888.github.io/ciro-yasal/davet.html' + hash }
  const olaylar = {}
  runInNewContext(script, {
    location,
    window: { addEventListener: (tur, is) => { olaylar[tur] = is } },
    document: { documentElement, title: '', getElementById(id) {
      if (!elemanlar.has(id)) elemanlar.set(id, { hidden: true, removeAttribute(ad) { delete this[ad] } })
      return elemanlar.get(id)
    } },
    navigator: { userAgent, language, clipboard: { writeText: async text => kopyalanan.push(text) } },
    atob: text => Buffer.from(text, 'base64').toString('binary'),
  })
  return { elemanlar, kopyalanan, location, olaylar, documentElement }
}

test('tam ortak bağlantısı rolü ve bitiş işaretini Android intentinde korur', async () => {
  const { elemanlar, kopyalanan } = sayfa(zarf)
  const intent = elemanlar.get('ac').href
  assert.equal(elemanlar.get('ac').hidden, false)
  const fragment = intent.slice(intent.indexOf('#') + 1, intent.indexOf('#Intent'))
  assert.equal(decodeURIComponent(fragment), zarf)
  assert.doesNotMatch(fragment, /[!'()*]/)
  assert.equal(elemanlar.get('metin').value, metin)
  await elemanlar.get('eski-kopyala').onclick()
  assert.equal(kopyalanan[0], metin)
})

test('personel kodu geçerli olsa da kesilmiş ortak bağlantısında katıl düğmesi açılmaz', () => {
  const { elemanlar } = sayfa(zarf.slice(0, zarf.indexOf('ESNAF-ORTAK')))
  assert.match(elemanlar.get('bilgi').textContent, /eksik veya bozuk/)
  assert.equal(elemanlar.get('ac').hidden, true)
})

test('sohbetin bağlantıya eklediği nokta ve parantez geçerli ortak zarfını bozmaz', () => {
  for (const son of ['.', ')', '.)', '],', '!”']) {
    const { elemanlar } = sayfa(zarf, son)
    assert.equal(elemanlar.get('ac').hidden, false)
    const intent = elemanlar.get('ac').href
    assert.equal(decodeURIComponent(intent.slice(intent.indexOf('#') + 1, intent.indexOf('#Intent'))), zarf)
    assert.equal(elemanlar.get('metin').value, metin)
  }
})

test('davet içindeki işaretler korunur; son işaretleri kesik zarfı tamamlamaz', () => {
  const isaretli = `CIRO-DAVET-2\n${metin}\nMesaj sonu.)\nCIRO-DAVET-SON`
  assert.equal(sayfa(isaretli, '.)').elemanlar.get('metin').value, `${metin}\nMesaj sonu.)`)
  assert.equal(sayfa(zarf.slice(0, -4), '.)').elemanlar.get('ac').hidden, true)
  assert.equal(sayfa(zarf + 'x', '.)').elemanlar.get('ac').hidden, true)
})

test('tarayıcı yüzde kaçışıyla dış işaretleri taşıdığında da ortak zarfı korunur', () => {
  const disIsaret = new URL('https://ornek.test/#.”').hash.slice(1)
  const { elemanlar } = sayfa(zarf, disIsaret)
  assert.equal(elemanlar.get('ac').hidden, false)
  const intent = elemanlar.get('ac').href
  assert.equal(decodeURIComponent(intent.slice(intent.indexOf('#') + 1, intent.indexOf('#Intent'))), zarf)
})

test('eski sürüm mesajı ve yalnız ortak daveti çalışmaya devam eder', () => {
  assert.equal(sayfa(metin).elemanlar.get('ac').hidden, false)
  assert.equal(sayfa(ortak).elemanlar.get('ac').hidden, false)
})

test('bozuk veya çok uzun bağlantı katılmayı açmaz', () => {
  assert.equal(sayfa('bozuk').elemanlar.get('ac').hidden, true)
  assert.equal(sayfa(kod + 'x'.repeat(4100)).elemanlar.get('ac').hidden, true)
})

test('açık sayfada bağlantı eksik davete değişirse eski katılma ve mesaj temizlenir', () => {
  const { elemanlar, location, olaylar } = sayfa(zarf)
  assert.equal(elemanlar.get('ac').hidden, false)
  location.hash = '#' + encodeURIComponent(zarf.slice(0, zarf.indexOf('ESNAF-ORTAK')))
  olaylar.hashchange()
  assert.equal(elemanlar.get('ac').hidden, true)
  assert.equal(elemanlar.get('ac').href, undefined)
  assert.equal(elemanlar.get('metin').value, '')
  assert.match(elemanlar.get('bilgi').textContent, /eksik veya bozuk/)
})

test('iPhone Safari intent yerine ciro:// açar ve App Store bağlantısı gösterir', () => {
  const { elemanlar } = sayfa(zarf, '', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)')
  assert.equal(decodeURIComponent(elemanlar.get('ac').href.replace('ciro://katil#', '')), zarf)
  assert.match(elemanlar.get('ac').href, /^ciro:\/\/katil#/)
  assert.match(elemanlar.get('indir').href, /apps\.apple\.com/)
})

test('Android intenti yeni paket adını kullanır', () => {
  const { elemanlar } = sayfa(zarf)
  assert.match(elemanlar.get('ac').href, /package=com\.esnaf\.ciro;/)
  assert.doesNotMatch(elemanlar.get('ac').href + elemanlar.get('indir').href, /nakitdefteri/)
})

test('kısa bağlantı kodları açar; kesik kısa bağlantı hiçbir rolü açmaz', () => {
  const kisa = `~${kod}~${ortak}~SON`
  const { elemanlar } = sayfa(kisa, '.')
  assert.equal(elemanlar.get('ac').hidden, false)
  assert.equal(elemanlar.get('metin').value, `${kod}
${ortak}`)
  const intent = elemanlar.get('ac').href
  assert.equal(decodeURIComponent(intent.slice(intent.indexOf('#') + 1, intent.indexOf('#Intent'))), kisa)
  const kesik = sayfa(`~${kod}~`)
  assert.equal(kesik.elemanlar.get('ac').hidden, true)
  assert.match(kesik.elemanlar.get('bilgi').textContent, /eksik veya bozuk/)
})

test('sayfa telefonun dilinde açılır; bilinmeyen dil İngilizceye düşer', () => {
  const kisa = `~${kod}~${ortak}~SON`
  const en = sayfa(kisa, '', undefined, 'en-GB')
  assert.equal(en.elemanlar.get('ac').textContent, 'Join in Ciro')
  assert.match(en.elemanlar.get('bilgi').textContent, /Join in Ciro/)
  const ar = sayfa(kisa, '', undefined, 'ar-SA')
  assert.equal(ar.documentElement.dir, 'rtl')
  assert.equal(ar.elemanlar.get('kopyala').textContent, 'انسخ رمز الدعوة')
  assert.equal(sayfa(kisa, '', undefined, 'pt-PT').documentElement.lang, 'pt-BR')
  assert.equal(sayfa(kisa, '', undefined, 'de-DE').elemanlar.get('ac').textContent, 'Join in Ciro')
  assert.match(sayfa('bozuk', '', undefined, 'es-MX').elemanlar.get('bilgi').textContent, /incompleto/)
})

test('her dil aynı anahtarları taşır', () => {
  const metinler = runInNewContext(script.slice(0, script.indexOf('const PLAY')) + ';METINLER')
  const anahtarlar = Object.keys(metinler.tr).sort().join()
  assert.equal(Object.keys(metinler).length, 14)
  for (const [dil, m] of Object.entries(metinler)) {
    assert.equal(Object.keys(m).sort().join(), anahtarlar, dil)
    assert.match(m.adli, /\{ad\}/, dil)
  }
})

test('kısa bağlantıdaki işletme adı başlıkta görünür', () => {
  const { elemanlar } = sayfa(`~${kod}~${ortak}~SimCo Ltd~SON`, '', undefined, 'en-US')
  assert.equal(elemanlar.get('baslik').textContent, 'Join the SimCo Ltd ledger')
  assert.equal(elemanlar.get('ac').hidden, false)
  assert.match(elemanlar.get('metin').value, /ESNAF-ORTAK-1\./)
})
