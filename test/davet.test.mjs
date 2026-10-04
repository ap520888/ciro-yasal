import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'

const script = readFileSync(new URL('../davet.js', import.meta.url), 'utf8')
const kod = `ESNAF-DAVET-1.${'a'.repeat(24)}.${Buffer.alloc(32).toString('base64')}`
const ortak = `ESNAF-ORTAK-1.${'b'.repeat(24)}`
const metin = `Ali'nin (Ciro) defterine ortak daveti\n${kod}\nCiro'yu aç\n${ortak}`
const zarf = `CIRO-DAVET-2\n${metin}\nCIRO-DAVET-SON`

function sayfa(ham) {
  const elemanlar = new Map()
  const kopyalanan = []
  const hash = '#' + encodeURIComponent(ham)
  const location = { hash, href: 'https://ap520888.github.io/ciro-yasal/davet.html' + hash }
  const olaylar = {}
  runInNewContext(script, {
    location,
    window: { addEventListener: (tur, is) => { olaylar[tur] = is } },
    document: { getElementById(id) {
      if (!elemanlar.has(id)) elemanlar.set(id, { hidden: true, removeAttribute(ad) { delete this[ad] } })
      return elemanlar.get(id)
    } },
    navigator: { clipboard: { writeText: async text => kopyalanan.push(text) } },
    atob: text => Buffer.from(text, 'base64').toString('binary'),
  })
  return { elemanlar, kopyalanan, location, olaylar }
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
