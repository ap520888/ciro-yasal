/* Davet yalnız URL fragmentinde; ağ isteği, çerez ve analiz yok. */
/* Davet sayfası metinleri. Terimler uygulamadaki karşılıklarla aynıdır ("Davetle katıl", "Katıl", defter). */
const METINLER = {
  tr: { title: 'Ciro defter daveti', ust: 'Ciro · Defter daveti', baslik: 'Deftere katıl', adli: '{ad} defterine katıl', kontrol: 'Davet kontrol ediliyor…', ac: 'Ciro’da katıl', kopyala: 'Davet kodunu kopyala', android: 'Android uygulamasını indir', iphone: 'iPhone uygulamasını indir', eskiBaslik: 'Eski sürüm kullanıyorum', eskiBilgi: 'Ciro’daki “Davetle katıl” alanına aşağıdaki mesajı yapıştırabilirsin.', eskiEtiket: 'Eski sürüm davet mesajı', eskiKopyala: 'Eski sürüm mesajını kopyala', alt: 'İlk kez kuruyorsan, indirdikten sonra bu bağlantıya tekrar dön. Davet yalnız kendi hesabınla katıldıktan sonra etkinleşir.', bozuk: 'Davet bağlantısı eksik veya bozuk. Patronundan yeni bir davet iste.', hazir: 'Ciro’da katıl’a dokun. Davet uygulamada hazır gelecek; hesabınla bağlanıp Katıl demen yeterli.', kopyalandi: 'Kopyalandı. Ciro’daki “Davetle katıl” alanına yapıştır.', kopyalanamadi: 'Kopyalanamadı. Bağlantıyı veya aşağıdaki mesajı seçip kopyalayabilirsin.' },
  en: { title: 'Ciro ledger invitation', ust: 'Ciro · Ledger invitation', baslik: 'Join the ledger', adli: 'Join the {ad} ledger', kontrol: 'Checking the invitation…', ac: 'Join in Ciro', kopyala: 'Copy invitation code', android: 'Download the Android app', iphone: 'Download the iPhone app', eskiBaslik: 'I’m using an older version', eskiBilgi: 'You can paste the message below into “Join with invitation” in Ciro.', eskiEtiket: 'Invitation message for older versions', eskiKopyala: 'Copy message for older versions', alt: 'Installing for the first time? Come back to this link after downloading. The invitation only becomes active once you join with your own account.', bozuk: 'This invitation link is incomplete or broken. Ask the owner for a new invitation.', hazir: 'Tap “Join in Ciro”. The invitation will be ready in the app; just sign in and tap Join.', kopyalandi: 'Copied. Paste it into “Join with invitation” in Ciro.', kopyalanamadi: 'Couldn’t copy. Select and copy the link or the message below.' },
  es: { title: 'Invitación al libro de Ciro', ust: 'Ciro · Invitación al libro', baslik: 'Únete al libro', adli: 'Únete al libro de {ad}', kontrol: 'Comprobando la invitación…', ac: 'Unirme en Ciro', kopyala: 'Copiar código de invitación', android: 'Descargar la app para Android', iphone: 'Descargar la app para iPhone', eskiBaslik: 'Uso una versión anterior', eskiBilgi: 'Puedes pegar el mensaje de abajo en “Unirse con invitación” en Ciro.', eskiEtiket: 'Mensaje de invitación para versiones anteriores', eskiKopyala: 'Copiar mensaje para versiones anteriores', alt: '¿Lo instalas por primera vez? Después de descargarlo, vuelve a este enlace. La invitación solo se activa cuando te unes con tu propia cuenta.', bozuk: 'El enlace de invitación está incompleto o dañado. Pide una nueva invitación al dueño.', hazir: 'Toca “Unirme en Ciro”. La invitación llegará lista a la app; solo inicia sesión y toca Unirse.', kopyalandi: 'Copiado. Pégalo en “Unirse con invitación” en Ciro.', kopyalanamadi: 'No se pudo copiar. Selecciona y copia el enlace o el mensaje de abajo.' },
  'pt-BR': { title: 'Convite para o livro do Ciro', ust: 'Ciro · Convite para o livro', baslik: 'Entre no livro', adli: 'Entre no livro {ad}', kontrol: 'Verificando o convite…', ac: 'Entrar pelo Ciro', kopyala: 'Copiar código do convite', android: 'Baixar o app para Android', iphone: 'Baixar o app para iPhone', eskiBaslik: 'Uso uma versão anterior', eskiBilgi: 'Você pode colar a mensagem abaixo em “Entrar com convite” no Ciro.', eskiEtiket: 'Mensagem de convite para versões anteriores', eskiKopyala: 'Copiar mensagem para versões anteriores', alt: 'Instalando pela primeira vez? Depois de baixar, volte a este link. O convite só fica ativo quando você entra com a sua própria conta.', bozuk: 'O link do convite está incompleto ou com erro. Peça um novo convite ao dono.', hazir: 'Toque em “Entrar pelo Ciro”. O convite chega pronto no app; é só entrar na sua conta e tocar em Entrar.', kopyalandi: 'Copiado. Cole em “Entrar com convite” no Ciro.', kopyalanamadi: 'Não foi possível copiar. Selecione e copie o link ou a mensagem abaixo.' },
  fr: { title: 'Invitation au registre Ciro', ust: 'Ciro · Invitation au registre', baslik: 'Rejoindre le registre', adli: 'Rejoindre le registre {ad}', kontrol: 'Vérification de l’invitation…', ac: 'Rejoindre dans Ciro', kopyala: 'Copier le code d’invitation', android: 'Télécharger l’app Android', iphone: 'Télécharger l’app iPhone', eskiBaslik: 'J’utilise une ancienne version', eskiBilgi: 'Vous pouvez coller le message ci-dessous dans « Rejoindre avec une invitation » de Ciro.', eskiEtiket: 'Message d’invitation pour les anciennes versions', eskiKopyala: 'Copier le message pour ancienne version', alt: 'Première installation ? Revenez à ce lien après le téléchargement. L’invitation ne s’active qu’une fois que vous rejoignez avec votre propre compte.', bozuk: 'Le lien d’invitation est incomplet ou endommagé. Demandez une nouvelle invitation au propriétaire.', hazir: 'Touchez « Rejoindre dans Ciro ». L’invitation sera prête dans l’app ; connectez-vous puis touchez Rejoindre.', kopyalandi: 'Copié. Collez-le dans « Rejoindre avec une invitation » de Ciro.', kopyalanamadi: 'Copie impossible. Sélectionnez et copiez le lien ou le message ci-dessous.' },
  id: { title: 'Undangan buku Ciro', ust: 'Ciro · Undangan buku', baslik: 'Gabung ke buku', adli: 'Gabung ke buku {ad}', kontrol: 'Memeriksa undangan…', ac: 'Gabung di Ciro', kopyala: 'Salin kode undangan', android: 'Unduh aplikasi Android', iphone: 'Unduh aplikasi iPhone', eskiBaslik: 'Saya memakai versi lama', eskiBilgi: 'Anda bisa menempelkan pesan di bawah ke “Gabung dengan undangan” di Ciro.', eskiEtiket: 'Pesan undangan untuk versi lama', eskiKopyala: 'Salin pesan untuk versi lama', alt: 'Baru pertama kali memasang? Kembali ke tautan ini setelah mengunduh. Undangan baru aktif setelah Anda bergabung dengan akun Anda sendiri.', bozuk: 'Tautan undangan tidak lengkap atau rusak. Minta undangan baru kepada pemilik.', hazir: 'Ketuk “Gabung di Ciro”. Undangan akan siap di aplikasi; cukup masuk lalu ketuk Gabung.', kopyalandi: 'Tersalin. Tempelkan ke “Gabung dengan undangan” di Ciro.', kopyalanamadi: 'Gagal menyalin. Pilih dan salin tautan atau pesan di bawah.' },
  vi: { title: 'Lời mời sổ Ciro', ust: 'Ciro · Lời mời sổ', baslik: 'Tham gia sổ', adli: 'Tham gia sổ {ad}', kontrol: 'Đang kiểm tra lời mời…', ac: 'Tham gia trong Ciro', kopyala: 'Sao chép mã mời', android: 'Tải ứng dụng Android', iphone: 'Tải ứng dụng iPhone', eskiBaslik: 'Tôi đang dùng phiên bản cũ', eskiBilgi: 'Bạn có thể dán tin nhắn bên dưới vào mục “Tham gia bằng lời mời” trong Ciro.', eskiEtiket: 'Tin nhắn mời cho phiên bản cũ', eskiKopyala: 'Sao chép tin nhắn cho phiên bản cũ', alt: 'Cài lần đầu? Sau khi tải xong, hãy quay lại liên kết này. Lời mời chỉ có hiệu lực khi bạn tham gia bằng tài khoản của chính mình.', bozuk: 'Liên kết mời bị thiếu hoặc bị lỗi. Hãy xin chủ sổ một lời mời mới.', hazir: 'Chạm “Tham gia trong Ciro”. Lời mời sẽ có sẵn trong ứng dụng; chỉ cần đăng nhập rồi chạm Tham gia.', kopyalandi: 'Đã sao chép. Dán vào mục “Tham gia bằng lời mời” trong Ciro.', kopyalanamadi: 'Không sao chép được. Hãy chọn và sao chép liên kết hoặc tin nhắn bên dưới.' },
  ar: { title: 'دعوة إلى دفتر Ciro', ust: 'Ciro · دعوة إلى الدفتر', baslik: 'انضم إلى الدفتر', adli: 'انضم إلى دفتر {ad}', kontrol: 'جارٍ التحقق من الدعوة…', ac: 'انضم في Ciro', kopyala: 'انسخ رمز الدعوة', android: 'نزّل تطبيق Android', iphone: 'نزّل تطبيق iPhone', eskiBaslik: 'أستخدم إصدارًا قديمًا', eskiBilgi: 'يمكنك لصق الرسالة أدناه في «الانضمام بدعوة» داخل Ciro.', eskiEtiket: 'رسالة الدعوة للإصدارات القديمة', eskiKopyala: 'انسخ رسالة الإصدار القديم', alt: 'تثبّته لأول مرة؟ ارجع إلى هذا الرابط بعد التنزيل. لا تُفعَّل الدعوة إلا بعد انضمامك بحسابك الخاص.', bozuk: 'رابط الدعوة ناقص أو تالف. اطلب دعوة جديدة من صاحب الدفتر.', hazir: 'اضغط «انضم في Ciro». ستكون الدعوة جاهزة في التطبيق؛ سجّل الدخول ثم اضغط انضمام.', kopyalandi: 'تم النسخ. الصقه في «الانضمام بدعوة» داخل Ciro.', kopyalanamadi: 'تعذّر النسخ. حدّد الرابط أو الرسالة أدناه وانسخها.' },
  bn: { title: 'Ciro খাতার আমন্ত্রণ', ust: 'Ciro · খাতার আমন্ত্রণ', baslik: 'খাতায় যোগ দিন', adli: '{ad} খাতায় যোগ দিন', kontrol: 'আমন্ত্রণ যাচাই করা হচ্ছে…', ac: 'Ciro-তে যোগ দিন', kopyala: 'আমন্ত্রণ কোড কপি করুন', android: 'Android অ্যাপ ডাউনলোড করুন', iphone: 'iPhone অ্যাপ ডাউনলোড করুন', eskiBaslik: 'আমি পুরোনো সংস্করণ ব্যবহার করছি', eskiBilgi: 'নিচের বার্তাটি Ciro-র “আমন্ত্রণ দিয়ে যোগ দিন” অংশে পেস্ট করতে পারেন।', eskiEtiket: 'পুরোনো সংস্করণের আমন্ত্রণ বার্তা', eskiKopyala: 'পুরোনো সংস্করণের বার্তা কপি করুন', alt: 'প্রথমবার ইনস্টল করছেন? ডাউনলোডের পর এই লিংকে ফিরে আসুন। নিজের অ্যাকাউন্ট দিয়ে যোগ দেওয়ার পরই আমন্ত্রণ চালু হয়।', bozuk: 'আমন্ত্রণ লিংকটি অসম্পূর্ণ বা নষ্ট। মালিকের কাছে নতুন আমন্ত্রণ চান।', hazir: '“Ciro-তে যোগ দিন”-এ চাপুন। আমন্ত্রণ অ্যাপে তৈরি থাকবে; সাইন ইন করে যোগ দিন চাপলেই হবে।', kopyalandi: 'কপি হয়েছে। Ciro-র “আমন্ত্রণ দিয়ে যোগ দিন” অংশে পেস্ট করুন।', kopyalanamadi: 'কপি করা যায়নি। লিংক বা নিচের বার্তাটি বেছে নিয়ে কপি করুন।' },
  ur: { title: 'Ciro کھاتے کی دعوت', ust: 'Ciro · کھاتے کی دعوت', baslik: 'کھاتے میں شامل ہوں', adli: '{ad} کھاتے میں شامل ہوں', kontrol: 'دعوت کی جانچ ہو رہی ہے…', ac: 'Ciro میں شامل ہوں', kopyala: 'دعوت کا کوڈ کاپی کریں', android: 'Android ایپ ڈاؤن لوڈ کریں', iphone: 'iPhone ایپ ڈاؤن لوڈ کریں', eskiBaslik: 'میں پرانا ورژن استعمال کر رہا ہوں', eskiBilgi: 'آپ نیچے والا پیغام Ciro میں “دعوت سے شامل ہوں” میں پیسٹ کر سکتے ہیں۔', eskiEtiket: 'پرانے ورژن کا دعوتی پیغام', eskiKopyala: 'پرانے ورژن کا پیغام کاپی کریں', alt: 'پہلی بار انسٹال کر رہے ہیں؟ ڈاؤن لوڈ کے بعد اس لنک پر واپس آئیں۔ دعوت صرف اپنے اکاؤنٹ سے شامل ہونے کے بعد فعال ہوتی ہے۔', bozuk: 'دعوت کا لنک نامکمل یا خراب ہے۔ مالک سے نئی دعوت مانگیں۔', hazir: '“Ciro میں شامل ہوں” پر ٹیپ کریں۔ دعوت ایپ میں تیار ملے گی؛ بس سائن اِن کر کے شامل ہوں پر ٹیپ کریں۔', kopyalandi: 'کاپی ہو گیا۔ Ciro میں “دعوت سے شامل ہوں” میں پیسٹ کریں۔', kopyalanamadi: 'کاپی نہیں ہو سکا۔ لنک یا نیچے والا پیغام منتخب کر کے کاپی کریں۔' },
  fil: { title: 'Imbitasyon sa talaan ng Ciro', ust: 'Ciro · Imbitasyon sa talaan', baslik: 'Sumali sa talaan', adli: 'Sumali sa talaan ng {ad}', kontrol: 'Sinusuri ang imbitasyon…', ac: 'Sumali sa Ciro', kopyala: 'Kopyahin ang code ng imbitasyon', android: 'I-download ang Android app', iphone: 'I-download ang iPhone app', eskiBaslik: 'Lumang bersyon ang gamit ko', eskiBilgi: 'Puwede mong i-paste ang mensahe sa ibaba sa “Sumali gamit ang imbitasyon” sa Ciro.', eskiEtiket: 'Mensahe ng imbitasyon para sa lumang bersyon', eskiKopyala: 'Kopyahin ang mensahe para sa lumang bersyon', alt: 'Unang beses mag-install? Bumalik sa link na ito pagkatapos mag-download. Magiging aktibo lang ang imbitasyon kapag sumali ka gamit ang sarili mong account.', bozuk: 'Kulang o sira ang link ng imbitasyon. Humingi ng bagong imbitasyon sa may-ari.', hazir: 'I-tap ang “Sumali sa Ciro”. Handa na ang imbitasyon sa app; mag-sign in lang at i-tap ang Sumali.', kopyalandi: 'Nakopya. I-paste sa “Sumali gamit ang imbitasyon” sa Ciro.', kopyalanamadi: 'Hindi makopya. Piliin at kopyahin ang link o ang mensahe sa ibaba.' },
  sw: { title: 'Mwaliko wa daftari la Ciro', ust: 'Ciro · Mwaliko wa daftari', baslik: 'Jiunge na daftari', adli: 'Jiunge na daftari la {ad}', kontrol: 'Tunakagua mwaliko…', ac: 'Jiunge kwenye Ciro', kopyala: 'Nakili msimbo wa mwaliko', android: 'Pakua programu ya Android', iphone: 'Pakua programu ya iPhone', eskiBaslik: 'Natumia toleo la zamani', eskiBilgi: 'Unaweza kubandika ujumbe ulio hapa chini kwenye “Jiunge kwa mwaliko” ndani ya Ciro.', eskiEtiket: 'Ujumbe wa mwaliko kwa matoleo ya zamani', eskiKopyala: 'Nakili ujumbe wa toleo la zamani', alt: 'Unasakinisha kwa mara ya kwanza? Rudi kwenye kiungo hiki baada ya kupakua. Mwaliko unaanza kufanya kazi tu ukijiunga kwa akaunti yako mwenyewe.', bozuk: 'Kiungo cha mwaliko hakijakamilika au kimeharibika. Omba mwaliko mpya kwa mmiliki.', hazir: 'Gusa “Jiunge kwenye Ciro”. Mwaliko utakuwa tayari kwenye programu; ingia tu kisha gusa Jiunge.', kopyalandi: 'Imenakiliwa. Ibandike kwenye “Jiunge kwa mwaliko” ndani ya Ciro.', kopyalanamadi: 'Imeshindikana kunakili. Chagua na unakili kiungo au ujumbe ulio hapa chini.' },
  am: { title: 'የCiro ደብተር ግብዣ', ust: 'Ciro · የደብተር ግብዣ', baslik: 'ደብተሩን ይቀላቀሉ', adli: 'የ{ad} ደብተርን ይቀላቀሉ', kontrol: 'ግብዣው እየተረጋገጠ ነው…', ac: 'በCiro ይቀላቀሉ', kopyala: 'የግብዣ ኮዱን ይቅዱ', android: 'የAndroid መተግበሪያውን ያውርዱ', iphone: 'የiPhone መተግበሪያውን ያውርዱ', eskiBaslik: 'የቆየ ስሪት እየተጠቀምኩ ነው', eskiBilgi: 'ከታች ያለውን መልዕክት በCiro “በግብዣ ተቀላቀል” ውስጥ መለጠፍ ይችላሉ።', eskiEtiket: 'ለቆየ ስሪት የግብዣ መልዕክት', eskiKopyala: 'የቆየ ስሪት መልዕክቱን ይቅዱ', alt: 'ለመጀመሪያ ጊዜ እየጫኑ ነው? ካወረዱ በኋላ ወደዚህ አገናኝ ይመለሱ። ግብዣው የሚሠራው በራስዎ መለያ ከተቀላቀሉ በኋላ ብቻ ነው።', bozuk: 'የግብዣ አገናኙ ያልተሟላ ወይም የተበላሸ ነው። ከባለቤቱ አዲስ ግብዣ ይጠይቁ።', hazir: '“በCiro ይቀላቀሉ”ን ይንኩ። ግብዣው በመተግበሪያው ዝግጁ ይሆናል፤ ገብተው ተቀላቀልን ይንኩ።', kopyalandi: 'ተቀድቷል። በCiro “በግብዣ ተቀላቀል” ውስጥ ይለጥፉት።', kopyalanamadi: 'መቅዳት አልተቻለም። አገናኙን ወይም ከታች ያለውን መልዕክት መርጠው ይቅዱ።' },
  km: { title: 'ការអញ្ជើញបញ្ជី Ciro', ust: 'Ciro · ការអញ្ជើញបញ្ជី', baslik: 'ចូលរួមបញ្ជី', adli: 'ចូលរួមបញ្ជី {ad}', kontrol: 'កំពុងពិនិត្យការអញ្ជើញ…', ac: 'ចូលរួមក្នុង Ciro', kopyala: 'ចម្លងកូដអញ្ជើញ', android: 'ទាញយកកម្មវិធី Android', iphone: 'ទាញយកកម្មវិធី iPhone', eskiBaslik: 'ខ្ញុំកំពុងប្រើកំណែចាស់', eskiBilgi: 'អ្នកអាចបិទភ្ជាប់សារខាងក្រោមទៅក្នុង “ចូលរួមតាមការអញ្ជើញ” ក្នុង Ciro។', eskiEtiket: 'សារអញ្ជើញសម្រាប់កំណែចាស់', eskiKopyala: 'ចម្លងសារសម្រាប់កំណែចាស់', alt: 'ដំឡើងជាលើកដំបូង? បន្ទាប់ពីទាញយក សូមត្រឡប់មកតំណនេះវិញ។ ការអញ្ជើញនឹងដំណើរការតែពេលអ្នកចូលរួមដោយគណនីផ្ទាល់ខ្លួនប៉ុណ្ណោះ។', bozuk: 'តំណអញ្ជើញមិនពេញលេញ ឬខូច។ សូមស្នើការអញ្ជើញថ្មីពីម្ចាស់។', hazir: 'ចុច “ចូលរួមក្នុង Ciro”។ ការអញ្ជើញនឹងរួចរាល់ក្នុងកម្មវិធី គ្រាន់តែចូលគណនី រួចចុចចូលរួម។', kopyalandi: 'បានចម្លង។ បិទភ្ជាប់ទៅក្នុង “ចូលរួមតាមការអញ្ជើញ” ក្នុង Ciro។', kopyalanamadi: 'មិនអាចចម្លងបានទេ។ សូមជ្រើសរើស ហើយចម្លងតំណ ឬសារខាងក្រោម។' },
}
const PLAY = 'https://play.google.com/store/apps/details?id=com.esnaf.ciro'
const ua = navigator.userAgent || ''
const iphone = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
// Dil: uygulamanın kaydettiği seçim (cari paylaşım sayfasıyla ortak anahtar), yoksa telefonun dili.
let dil
try { const secim = localStorage.getItem('ciro-ui-locale-v1'); if (secim in METINLER) dil = secim } catch { /* depolama isteğe bağlı */ }
const tarayiciDili = (navigator.language || '').toLowerCase()
dil ??= tarayiciDili.startsWith('pt') ? 'pt-BR' : tarayiciDili.startsWith('tl') ? 'fil' : tarayiciDili.startsWith('in') ? 'id'
  : Object.keys(METINLER).find(d => tarayiciDili.startsWith(d)) ?? 'en'
const t = METINLER[dil]
document.documentElement.lang = dil === 'es' ? 'es-419' : dil
document.documentElement.dir = dil === 'ar' || dil === 'ur' ? 'rtl' : 'ltr'
document.title = t.title
const yaz = (id, metin) => { document.getElementById(id).textContent = metin }
yaz('ust', t.ust); yaz('ac', t.ac); yaz('kopyala', t.kopyala); yaz('eski-baslik', t.eskiBaslik)
yaz('eski-bilgi', t.eskiBilgi); yaz('eski-kopyala', t.eskiKopyala); yaz('alt', t.alt)
document.getElementById('metin').ariaLabel = t.eskiEtiket
const indir = document.getElementById('indir')
indir.href = iphone ? 'https://apps.apple.com/app/id6812468853' : PLAY
indir.textContent = iphone ? t.iphone : t.android
const davetiGoster = () => {
  for (const id of ['ac', 'kopyala', 'eski']) document.getElementById(id).hidden = true
  document.getElementById('ac').removeAttribute('href')
  document.getElementById('baslik').textContent = t.baslik
  document.getElementById('bilgi').textContent = t.kontrol
  document.getElementById('metin').value = ''
  document.getElementById('mesaj').textContent = ''
  const disIsaretler = /[.,!?;:…)\]}>'"”’»]+$/u
  let metin = ''
  try {
    if (location.hash.length <= 8193) {
      // Sohbette URL sonuna eklenen işaretler kaçırılmış davet içeriğine ait değildir.
      const fragment = location.hash.slice(1).replace(disIsaretler, '')
      metin = decodeURIComponent(fragment)
    }
  } catch { /* bozuk bağlantı */ }
  const zarfOneki = 'CIRO-DAVET-2\n'
  const zarfSonu = '\nCIRO-DAVET-SON'
  // Kısa biçim (#~KOD~KOD~SON): yalnız kodlar; kesik olan hiçbir rolü açmaz.
  if (metin.startsWith(zarfOneki) || metin.startsWith('~')) metin = metin.replace(disIsaretler, '')
  const hamDavet = metin
  if (metin.startsWith('~')) {
    if (!metin.endsWith('~SON')) {
      document.getElementById('bilgi').textContent = t.bozuk
      return
    }
    // ESNAF- ile başlamayan parça işletme adıdır; uygulamadaki biçimle aynı satıra çevrilir.
    const parcalar = metin.slice(1, -4).split('~')
    const isletme = parcalar.find(p => !p.startsWith('ESNAF-'))
    metin = (isletme ? `${isletme} defterine kayıt daveti\n` : '') + parcalar.filter(p => p.startsWith('ESNAF-')).join('\n')
  }
  if (metin.startsWith(zarfOneki)) {
    if (!metin.endsWith(zarfSonu)) {
      document.getElementById('bilgi').textContent = t.bozuk
      return
    }
    metin = metin.slice(zarfOneki.length, -zarfSonu.length)
  }
  const kod = metin.match(/ESNAF-DAVET-1\.([0-9a-f]{24})\.([A-Za-z0-9+/=]{40,50})/)
  const ortak = /ESNAF-ORTAK-1\.[0-9a-f]{24}/.test(metin)
  let gecerli = !!kod || ortak
  if (kod) { try { gecerli = atob(kod[2]).length === 32 } catch { gecerli = false } }
  if (!gecerli || metin.length > 4096) {
    document.getElementById('bilgi').textContent = t.bozuk
    return
  }
  const ad = metin.match(/(.+) defterine (?:kayıt|ortak)/)?.[1]?.trim()
  document.getElementById('baslik').textContent = ad ? t.adli.replace('{ad}', ad) : t.baslik
  document.getElementById('bilgi').textContent = t.hazir
  const fragment = encodeURIComponent(hamDavet).replace(/[!'()*]/g, karakter => `%${karakter.charCodeAt(0).toString(16).toUpperCase()}`)
  const ac = document.getElementById('ac')
  ac.hidden = false
  // intent:// yalnız Android Chrome'da çalışır; Safari onu "adres geçersiz" diye reddeder.
  ac.href = iphone ? `ciro://katil#${fragment}` : `intent://katil#${fragment}#Intent;scheme=ciro;package=com.esnaf.ciro;S.browser_fallback_url=${encodeURIComponent(PLAY)};end`
  const kopyala = document.getElementById('kopyala')
  kopyala.hidden = false
  const kopyalaMetin = async (deger) => {
    try { await navigator.clipboard.writeText(deger); document.getElementById('mesaj').textContent = t.kopyalandi }
    catch { document.getElementById('mesaj').textContent = t.kopyalanamadi }
  }
  kopyala.onclick = () => kopyalaMetin(location.href)
  document.getElementById('eski').hidden = false
  document.getElementById('metin').value = metin
  document.getElementById('eski-kopyala').onclick = () => kopyalaMetin(metin)
}
davetiGoster()
window.addEventListener('hashchange', davetiGoster)
