/* Davet yalnız URL fragmentinde; ağ isteği, çerez ve analiz yok. */
(() => {
  let metin = ''
  try { if (location.hash.length <= 8193) metin = decodeURIComponent(location.hash.slice(1)) } catch { /* bozuk bağlantı */ }
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
  const fragment = encodeURIComponent(metin)
  const ac = document.getElementById('ac')
  ac.hidden = false
  ac.href = `intent://katil#${fragment}#Intent;scheme=ciro;package=com.esnaf.nakitdefteri;S.browser_fallback_url=${encodeURIComponent('https://play.google.com/store/apps/details?id=com.esnaf.nakitdefteri')};end`
  const kopyala = document.getElementById('kopyala')
  kopyala.hidden = false
  const kopyalaMetin = async (deger) => {
    try { await navigator.clipboard.writeText(deger); document.getElementById('mesaj').textContent = 'Kopyalandı. Ciro’daki Davetle katıl alanına yapıştır.' }
    catch { document.getElementById('mesaj').textContent = 'Kopyalanamadı. Bağlantıyı veya aşağıdaki mesajı seçip kopyalayabilirsin.' }
  }
  kopyala.addEventListener('click', () => kopyalaMetin(location.href))
  document.getElementById('eski').hidden = false
  document.getElementById('metin').value = metin
  document.getElementById('eski-kopyala').addEventListener('click', () => kopyalaMetin(metin))
})()
