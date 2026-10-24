/* No analytics, remote requests, financial data or token in query strings. */
(() => {
  const token = location.hash.slice(1)
  const durum = document.getElementById('durum')
  const dilSecici = document.getElementById('dil')
  const metinler = {
    fil: { baslik: "Ciro · Pagbabahagi ng account", dil: "Wika", gecersiz: "Hindi wastong link ng pagpapares. Humingi ng bagong link.", kabul: "Mag-sign in sa Ciro account upang tanggapin ang pagpapares.", uygulama: "Buksan sa app", tarayici: "Magpatuloy sa browser", kur: 'Wala pang Ciro? I-install ito mula sa store, pagkatapos ay buksan muli ang link na ito.' },
    km: { baslik: "Ciro · ចែករំលែកគណនីដៃគូ", dil: "ភាសា", gecersiz: "តំណផ្គូផ្គងមិនត្រឹមត្រូវ។ ស្នើសុំតំណថ្មី។", kabul: "ចូលគណនី Ciro ដើម្បីទទួលសំណើផ្គូផ្គង។", uygulama: "បើកក្នុងកម្មវិធី", tarayici: "បន្តក្នុងកម្មវិធីរុករក", kur: 'មិនទាន់មាន Ciro? ដំឡើងពីហាង រួចបើកតំណនេះម្ដងទៀត។' },
    vi: { baslik: "Ciro · Chia sẻ công nợ", dil: "Ngôn ngữ", gecersiz: "Liên kết ghép nối không hợp lệ. Hãy yêu cầu liên kết mới.", kabul: "Đăng nhập tài khoản Ciro để chấp nhận yêu cầu ghép nối.", uygulama: "Mở trong ứng dụng", tarayici: "Tiếp tục trên trình duyệt", kur: 'Chưa có Ciro? Hãy cài từ cửa hàng ứng dụng, rồi mở lại liên kết này.' },
    ur: { baslik: "Ciro · حساب کا اشتراک", dil: "زبان", gecersiz: "جوڑنے کا لنک غلط ہے۔ نیا لنک مانگیں۔", kabul: "جوڑنے کی درخواست قبول کرنے کے لیے Ciro اکاؤنٹ میں سائن اِن کریں۔", uygulama: "ایپ میں کھولیں", tarayici: "براؤزر میں جاری رکھیں", kur: 'Ciro نہیں ہے؟ اسٹور سے انسٹال کریں، پھر یہ لنک دوبارہ کھولیں۔' },
    bn: { baslik: 'Ciro · হিসাব শেয়ারিং', dil: 'ভাষা', gecersiz: 'জোড়া লাগানোর লিঙ্ক বৈধ নয়। নতুন লিঙ্ক চান।', kabul: 'জোড়া লাগানোর অনুরোধ গ্রহণ করতে Ciro অ্যাকাউন্টে সাইন ইন করুন।', uygulama: 'অ্যাপে খুলুন', tarayici: 'ব্রাউজারে এগিয়ে যান', kur: 'Ciro নেই? স্টোর থেকে ইনস্টল করুন, তারপর এই লিঙ্কটি আবার খুলুন।' },
    sw: { baslik: 'Ciro · Ushiriki wa akaunti', dil: 'Lugha', gecersiz: 'Kiungo cha kuoanisha si halali. Omba kiungo kipya.', kabul: 'Ingia kwenye akaunti yako ya Ciro ili kukubali ombi la kuoanisha.', uygulama: 'Fungua kwenye programu', tarayici: 'Endelea kwenye kivinjari', kur: 'Huna Ciro? Isakinishe kutoka dukani, kisha fungua kiungo hiki tena.' },
    am: { baslik: 'Ciro · የሂሳብ ማጋራት', dil: 'ቋንቋ', gecersiz: 'የግንኙነት አገናኙ ልክ አይደለም። አዲስ አገናኝ ይጠይቁ።', kabul: 'የግንኙነት ጥያቄውን ለመቀበል በCiro መለያዎ ይግቡ።', uygulama: 'በመተግበሪያው ክፈት', tarayici: 'በአሳሽ ቀጥል', kur: 'Ciro የለዎትም? ከመተግበሪያ ሱቅ ይጫኑ፣ ከዚያ ይህን አገናኝ እንደገና ይክፈቱ።' },
    id: { baslik: 'Ciro · Berbagi akun', dil: 'Bahasa', gecersiz: 'Tautan pemasangan tidak valid. Minta tautan baru.', kabul: 'Login ke akun Ciro untuk menerima permintaan pemasangan.', uygulama: 'Buka di aplikasi', tarayici: 'Lanjut di browser', kur: 'Belum punya Ciro? Pasang dari toko aplikasi, lalu buka tautan ini lagi.' },
    fr: { baslik: 'Ciro · Partage de compte', dil: 'Langue', gecersiz: 'Lien d’association invalide. Demandez un nouveau lien.', kabul: 'Connectez-vous à votre compte Ciro pour accepter l’association.', uygulama: 'Ouvrir dans l’application', tarayici: 'Continuer dans le navigateur', kur: 'Vous n’avez pas Ciro ? Installez-le depuis la boutique, puis rouvrez ce lien.' },
    ar: { baslik: 'Ciro · مشاركة الحساب', dil: 'اللغة', gecersiz: 'رابط الربط غير صالح. اطلب رابطًا جديدًا.', kabul: 'سجّل الدخول إلى حساب Ciro لقبول طلب الربط.', uygulama: 'فتح في التطبيق', tarayici: 'المتابعة في المتصفح', kur: 'ليس لديك Ciro؟ ثبّته من المتجر ثم افتح هذا الرابط مرة أخرى.' },
    tr: { baslik: 'Ciro · Hesap paylaşımı', dil: 'Dil', gecersiz: 'Geçersiz eşleşme bağlantısı. Yeni bağlantı iste.', kabul: 'Ciro hesabınla giriş yaparak eşleşme isteğini kabul et.', uygulama: 'Uygulamada aç', tarayici: 'Tarayıcıda devam et', kur: 'Ciro yüklü değil mi? Önce mağazadan kur, sonra bu bağlantıyı yeniden aç.' },
    en: { baslik: 'Ciro · Account sharing', dil: 'Language', gecersiz: 'Invalid pairing link. Request a new link.', kabul: 'Sign in to your Ciro account to accept the pairing request.', uygulama: 'Open in app', tarayici: 'Continue in browser', kur: "Don't have Ciro? Install it from the store, then open this link again." },
    es: { baslik: 'Ciro · Compartir cuenta', dil: 'Idioma', gecersiz: 'El enlace de vinculación no es válido. Solicita uno nuevo.', kabul: 'Inicia sesión en tu cuenta de Ciro para aceptar la solicitud de vinculación.', uygulama: 'Abrir en la app', tarayici: 'Continuar en el navegador', kur: '¿No tienes Ciro? Instálalo desde la tienda y vuelve a abrir este enlace.' },
    'pt-BR': { baslik: 'Ciro · Compartilhamento de conta', dil: 'Idioma', gecersiz: 'Link de vínculo inválido. Solicite um novo link.', kabul: 'Entre na sua conta do Ciro para aceitar a solicitação de vínculo.', uygulama: 'Abrir no aplicativo', tarayici: 'Continuar no navegador', kur: 'Não tem o Ciro? Instale pela loja e abra este link novamente.' },
  }
  // Mağaza bağlantıları. Hesap sahibi kararıyla (24 Ekim 2026) Google Play düğmesi açık.
  // Play genel yayına çıkana kadar mağaza sayfası testçi olmayanlara "bulunamadı" gösterebilir;
  // sorun olursa bu anahtar false yapılır.
  const GOOGLE_PLAY_YAYINDA = true
  // "Tarayıcıda devam et" bu sayfanın klasöründeki tam web uygulamasını açar. Sayfa yalnız
  // başına yayınlandıysa (ör. ciro-yasal, GitHub Pages) orada uygulama yoktur; bağlantı gizli kalır.
  const WEB_UYGULAMA_YAYINDA = false
  const MAGAZA = {
    ios: 'https://apps.apple.com/app/id6812468853',
    android: 'https://play.google.com/store/apps/details?id=com.esnaf.nakitdefteri',
  }
  let saklananDil
  try { saklananDil = localStorage.getItem('ciro-ui-locale-v1') } catch { /* Storage is optional. */ }
  const tarayiciDili = navigator.language?.toLowerCase()
  let dil = saklananDil === 'fil' || saklananDil === 'km' || saklananDil === 'vi' || saklananDil === 'ur' || saklananDil === 'bn' || saklananDil === 'sw' || saklananDil === 'am' || saklananDil === 'id' || saklananDil === 'fr' || saklananDil === 'ar' || saklananDil === 'tr' || saklananDil === 'en' || saklananDil === 'es' || saklananDil === 'pt-BR' ? saklananDil : tarayiciDili?.startsWith('vi') ? 'vi' : tarayiciDili?.startsWith('km') ? 'km' : tarayiciDili?.startsWith('fil') || tarayiciDili?.startsWith('tl') ? 'fil' : tarayiciDili?.startsWith('ur') ? 'ur' : tarayiciDili?.startsWith('bn') ? 'bn' : tarayiciDili?.startsWith('sw') ? 'sw' : tarayiciDili?.startsWith('am') ? 'am' : tarayiciDili?.startsWith('id') || tarayiciDili?.startsWith('in') ? 'id' : tarayiciDili?.startsWith('fr') ? 'fr' : tarayiciDili?.startsWith('ar') ? 'ar' : tarayiciDili?.startsWith('tr') ? 'tr' : tarayiciDili?.startsWith('pt') ? 'pt-BR' : tarayiciDili?.startsWith('es') ? 'es' : 'en'
  const gecerli = /^CIRO-CARI-1\.[a-f0-9]{64}$/.test(token)
  const goster = () => {
    const m = metinler[dil]
    document.documentElement.lang = dil === 'es' ? 'es-419' : dil
    document.documentElement.dir = dil === 'ar' || dil === 'ur' ? 'rtl' : 'ltr'
    document.title = m.baslik
    document.getElementById('baslik').textContent = m.baslik
    document.getElementById('dil-etiketi').textContent = m.dil
    document.getElementById('uygulama').textContent = m.uygulama
    document.getElementById('tarayici').textContent = m.tarayici
    dilSecici.value = dil
    durum.textContent = gecerli ? m.kabul : m.gecersiz
    document.getElementById('kur-notu').textContent = m.kur
  }
  dilSecici.addEventListener('change', () => {
    if (dilSecici.value !== 'fil' && dilSecici.value !== 'km' && dilSecici.value !== 'vi' && dilSecici.value !== 'ur' && dilSecici.value !== 'bn' && dilSecici.value !== 'sw' && dilSecici.value !== 'am' && dilSecici.value !== 'id' && dilSecici.value !== 'fr' && dilSecici.value !== 'ar' && dilSecici.value !== 'tr' && dilSecici.value !== 'en' && dilSecici.value !== 'es' && dilSecici.value !== 'pt-BR') return
    dil = dilSecici.value
    goster()
  })
  goster()
  if (!gecerli) return
  const uygulama = document.getElementById('uygulama')
  uygulama.href = 'ciro://katil#' + token
  uygulama.hidden = false
  const tarayici = document.getElementById('tarayici')
  const web = new URL('./', location.href)
  web.hash = token
  tarayici.href = web.href
  tarayici.hidden = !WEB_UYGULAMA_YAYINDA
  // Uygulaması olmayan kişi çıkmaz sokakta kalmasın: mağaza bağlantıları. Gizli bilgi
  // (token) mağaza adreslerine hiçbir biçimde eklenmez.
  // Telefonda yalnız o telefonun mağazası gösterilir; cihaz anlaşılamazsa (masaüstü) ikisi de.
  document.getElementById('kur-notu').hidden = false
  const ua = navigator.userAgent || ''
  const iphone = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  const androidCihaz = /Android/i.test(ua)
  if (!androidCihaz) {
    const ios = document.getElementById('magaza-ios')
    ios.href = MAGAZA.ios
    ios.hidden = false
  }
  if (GOOGLE_PLAY_YAYINDA && !iphone) {
    const android = document.getElementById('magaza-android')
    android.href = MAGAZA.android
    android.hidden = false
  }
})()
