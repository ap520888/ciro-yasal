/* Davet yalnız URL fragmentinde; ağ isteği, çerez ve analiz yok. */
const davetiGoster = () => {
  for (const id of ['ac', 'kopyala', 'eski']) document.getElementById(id).hidden = true
  document.getElementById('ac').removeAttribute('href')
  document.getElementById('baslik').textContent = 'Deftere katıl'
  document.getElementById('metin').value = ''
  document.getElementById('mesaj').textContent = ''
  let metin = ''
  try { if (location.hash.length <= 8193) metin = decodeURIComponent(location.hash.slice(1)) } catch { /* bozuk bağlantı */ }
  const hamDavet = metin
  const zarfOneki = 'CIRO-DAVET-2\n'
  const zarfSonu = '\nCIRO-DAVET-SON'
  if (metin.startsWith(zarfOneki)) {
    if (!metin.endsWith(zarfSonu)) {
      document.getElementById('bilgi').textContent = 'Davet bağlantısı eksik veya bozuk. Patronundan yeni bir davet iste.'
      return
    }
    metin = metin.slice(zarfOneki.length, -zarfSonu.length)
  }
  const kod = metin.match(/ESNAF-DAVET-1\.([0-9a-f]{24})\.([A-Za-z0-9+/=]{40,50})/)
  const ortak = /ESNAF-ORTAK-1\.[0-9a-f]{24}/.test(metin)
  let gecerli = !!kod || ortak
  if (kod) { try { gecerli = atob(kod[2]).length === 32 } catch { gecerli = false } }
  if (!gecerli || metin.length > 4096) {
    document.getElementById('bilgi').textContent = 'Davet bağlantısı eksik veya bozuk. Patronundan yeni bir davet iste.'
    return
  }
  const ad = metin.match(/(.+) defterine (?:kayıt|ortak)/)?.[1]?.trim()
  document.getElementById('baslik').textContent = ad ? `${ad} defterine katıl` : 'Deftere katıl'
  document.getElementById('bilgi').textContent = 'Ciro’da katıl’a dokun. Davet uygulamada hazır gelecek; hesabınla bağlanıp Katıl demen yeterli.'
  const fragment = encodeURIComponent(hamDavet).replace(/[!'()*]/g, karakter => `%${karakter.charCodeAt(0).toString(16).toUpperCase()}`)
  const ac = document.getElementById('ac')
  ac.hidden = false
  ac.href = `intent://katil#${fragment}#Intent;scheme=ciro;package=com.esnaf.nakitdefteri;S.browser_fallback_url=${encodeURIComponent('https://play.google.com/store/apps/details?id=com.esnaf.nakitdefteri')};end`
  const kopyala = document.getElementById('kopyala')
  kopyala.hidden = false
  const kopyalaMetin = async (deger) => {
    try { await navigator.clipboard.writeText(deger); document.getElementById('mesaj').textContent = 'Kopyalandı. Ciro’daki Davetle katıl alanına yapıştır.' }
    catch { document.getElementById('mesaj').textContent = 'Kopyalanamadı. Bağlantıyı veya aşağıdaki mesajı seçip kopyalayabilirsin.' }
  }
  kopyala.onclick = () => kopyalaMetin(location.href)
  document.getElementById('eski').hidden = false
  document.getElementById('metin').value = metin
  document.getElementById('eski-kopyala').onclick = () => kopyalaMetin(metin)
}
davetiGoster()
window.addEventListener('hashchange', davetiGoster)
