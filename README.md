# Sondakika (Türkçe)

**Windows için Modern Electron Tabanlı RSS Haber Okuyucu + Eski CLI Aracı**  
*Türkçe haberleri gerçek zamanlı toplayan yerel masaüstü uygulaması, artı orijinal terminal tabanlı CLI işlevselliği*

[![Sürüm](https://img.shields.io/badge/sürüm-2.0.0-blue)](https://github.com/eaeoz/sondakika/releases)  
[![Lisans](https://img.shields.io/badge/lisans-ISC-green)](LICENSE)  
[![Windows Desteği](https://img.shields.io/badge/Windows-10+-lightgrey)](https://www.microsoft.com/windows)  
[![İndir](https://img.shields.io/badge/İndir-Windows%20Yükleyici-blue?style=for-the-badge)](https://github.com/eaeoz/sondakika/releases/download/2.0.0/Sondakika.Setup.2.0.0.exe)

---

## 📋 İçindekiler
1. [Genel Bakış](#-genel-bakış-1)
2. [🪟 Windows Masaüstü Uygulaması (v2.0.0 GUI)](#-windows-masaüstü-uygulaması-v200-gui-1)
   - [Sondakika Nedir?](#sondakika-nedir)
   - [Nasıl Çalışır?](#nasıl-çalışır)
   - [Sistem Gereksinimleri](#sistem-gereksinimleri)
   - [📥 İndirme](#-indirme)
   - [Kurulum](#kurulum)
   - [Başlangıç](#başlangıç)
   - [Temel Özellikler](#temel-özellikler)
3. [⌨️ GUI Klavye Kısayolları](#️-gui-klavye-kısayolları)
4. [⌨️ Eski CLI Kullanımı (v1.x)](#️-eski-cli-kullanımı-v1x)
   - [CLI Özellikleri](#cli-özellikleri)
   - [CLI Kurulumu](#cli-kurulumu)
   - [CLI Kullanım Örnekleri](#cli-kullanım-örnekleri)
   - [Mevcut Kaynaklar](#mevcut-kaynaklar)
5. [🛠️ Kaynaktan Derleme](#️-kaynaktan-derleme)
6. [📦 v2.0.0'da Neler Yaptık?](#-v200da-neler-yaptık)
7. [🤝 Katkıda Bulunma](#-katkıda-bulunma)
8. [📄 Lisans](#-lisans-1)

---

## 📖 Genel Bakış
Sondakika iki modda mevcuttur:
- **v2.0.0+**: Uygulama içi makale okuyucu, temalandırma ve klavye navigasyonu içeren tam özellikli yerel Windows Electron GUI
- **v1.x Eski**: Türk RSS beslemelerinden terminalinizde doğrudan haber getirmek ve görüntülemek için hafif terminal tabanlı CLI aracı

Varsayılan `npm start` komutu v2.0.0 Electron GUI'sini çalıştırır. Eski CLI işlevselliği, terminal tabanlı iş akışlarını tercih eden kullanıcılar için korunmuştur (tam CLI kodu için v1.x sürümlerine bakın).

---

## 🪟 Windows Masaüstü Uygulaması (v2.0.0 GUI)

### Sondakika Nedir?
9 büyük Türk haber kaynağından (Cumhuriyet, TRT Haber, Mynet, Sabah, Star, Gazete Vatan, Habertürk, CNN Türk, Yeni Şafak, Anadolu Ajansı) gerçek zamanlı haberleri modern ve kolay okunabilir bir arayüzde getiren yerel bir Windows uygulaması.

### Nasıl Çalışır?
1. Uygulama, yapılandırılmış Türk haber kaynaklarından RSS beslemelerini almak için `rss-parser` kullanır
2. Haber makaleleri, kaynak rozetleri ve zaman damgalarıyla kart tabanlı düzende görüntülenir
3. Tam içeriği görüntülemek için herhangi bir makaleye tıklayarak uygulama içi okuyucuyu açın
4. Kullanıcı tercihleri (etkin kaynaklar, tema, yazı boyutları, pencere konumu) yerel olarak kaydedilir
5. Makaleler arasında klavye kısayollarını veya ekrandaki düğmeleri kullanarak gezinin
6. Tek tıklamayla herhangi bir makaleyi varsayılan tarayıcınızda açın

### Sistem Gereksinimleri
- Windows 10 (sürüm 1809 veya üzeri) / Windows 11
- 64-bit (x64) işlemci
- 200MB boş disk alanı
- Haberleri çekmek için internet bağlantısı

### 📥 İndirme

Windows yükleyicisini doğrudan indirin:

[![Sondakika 2.0.0 İndir](https://img.shields.io/badge/⬇️%20İndir-Windows%20Yükleyici%20(64-bit)-blue?style=for-the-badge)](https://github.com/eaeoz/sondakika/releases/download/2.0.0/Sondakika.Setup.2.0.0.exe)

**Doğrudan Link:**  
`https://github.com/eaeoz/sondakika/releases/download/2.0.0/Sondakika.Setup.2.0.0.exe`

Veya tüm sürümler için (v1.x CLI-only sürümleri dahil) [GitHub Releases sayfasını](https://github.com/eaeoz/sondakika/releases) ziyaret edin.

### Kurulum
1. Yukarıdaki bağlantıyı kullanarak `Sondakika.Setup.2.0.0.exe` dosyasını indirin
2. Yükleyiciyi çalıştırın ve ekrandaki talimatları izleyin
3. Uygulama kurulumdan sonra otomatik olarak başlayacaktır
4. Başlat menüsüne ve Masaüstüne kısayollar eklenecektir

### Başlangıç
1. **İlk Açılış**: Uygulama varsayılan haber kaynakları etkin olarak açılır (Cumhuriyet, TRT Haber, Mynet, Habertürk, CNN Türk)
2. **Kaynak Seçimi**: Kenar çubuğu onay kutularını kullanarak haber kaynaklarını etkinleştirin/devre dışı bırakın
3. **Haberleri Getir**: En son başlıkları getirmek için "🔄 Yenile" düğmesine tıklayın
4. **Makaleleri Oku**: Tam makaleyi uygulama içi okuyucuda açmak için herhangi bir haber kartına tıklayın
5. **Özelleştir**: Kenar çubuğu seçeneklerini kullanarak temayı, yazı boyutlarını, sıralama düzenini ve sayfa başına öğe sayısını değiştirin

### Temel Özellikler
- ✅ **9 Türk Haber Kaynağı**: Cumhuriyet, TRT Haber, Mynet, Sabah, Star, Gazete Vatan, Habertürk, CNN Türk, Yeni Şafak, Anadolu Ajansı
- ✅ **Modern Arayüz**: Kart tabanlı haber düzeni ile temiz, duyarlı tasarım
- ✅ **Karanlık/Açık Tema**: Karanlık (varsayılan) ve açık temalar arasında geçiş yapın
- ✅ **Uygulama İçi Makale Okuyucu**: Tarayıcı açmadan tam makaleleri okuyun
- ✅ **Makale Gezintisi**: Animasyonlu geçişlerle okuyucudaki makaleler arasında gezinin
- ✅ **Ayarlabilir Yazı Boyutları**: Başlık (12-32px) ve içerik (10-28px) yazı tipleri için ayrı kontroller
- ✅ **Klavye Navigasyonu**: Navigasyon ve kontroller için tam klavye desteği
- ✅ **Kaynak Filtreleme**: Bireysel haber kaynaklarını etkinleştirin/devre dışı bırakın
- ✅ **Sıralama Seçenekleri**: Önce en yeni veya en eski olarak sıralayın
- ✅ **Sayfalama**: Sayfa başına kaç makale görüntüleneceğini kontrol edin (5, 10, 15, 20)
- ✅ **Görsel Çıkarımı**: RSS beslemelerinden makale görsellerini otomatik olarak çıkarır ve görüntüler
- ✅ **Durum Kalıcılığı**: Ayarlarınızı, pencere konumunuzu ve etkin kaynakları hatırlar
- ✅ **Harici Bağlantı Desteği**: Makaleleri varsayılan tarayıcınızda açın
- ✅ **Türkçe Dil Arayüzü**: Tamamen yerelleştirilmiş arayüz
- ✅ **Özel Uygulama Simgesi**: Çok boyutlu simge ile profesyonel markalama

---

## ⌨️ GUI Klavye Kısayolları

### Ana Pencere
| Kısayol | Eylem |
|---------|-------|
| `↑` `↓` | Haber makalesi seç |
| `←` `→` | Sayfalar arasında gezinti |
| `Enter` | Seçili makaleyi okuyucuda aç |
| `1` `2` | Başlık yazı boyutunu azalt/artır |
| `3` `4` | İçerik yazı boyutunu azalt/artır |
| `` ` `` | Seçili makaleyi tarayıcıda aç |
| `F5` / Yenile'ye Tıkla | En son haberleri getir |

### Makale Okuyucu
| Kısayol | Eylem |
|---------|-------|
| `↑` `↓` `Space` | Makale içeriğini kaydır |
| `PageUp` `PageDown` | Sayfa sayfa kaydır |
| `Home` `End` | En üste/en alta kaydır |
| `←` `→` | Önceki/Sonraki makale |
| `Enter` `Escape` | Haber listesine dön |
| `1` `2` | Başlık yazı boyutunu azalt/artır |
| `3` `4` | İçerik yazı boyutunu azalt/artır |
| `` ` `` | Makaleyi tarayıcıda aç |

---

### CLI Özellikleri
- 📰 Birden fazla Türk haber kaynağından haber getir
- 🔗 Terminalde tıklanabilir URL'ler (iTerm2, Windows Terminal, macOS Terminal)
- 🎨 Unicode kenarlıkları ile stillendirilmiş terminal çıktısı
- ⚡ Hızlı ve hafif

### CLI Kurulumu
#### npx kullanarak (kurulum gerektirmez, sadece v1.x)
```bash
npx sondakika trt
```

#### Global kurulum (v1.x)
```bash
npm install -g sondakika
```

### CLI Kullanım Örnekleri
```bash
# Cumhuriyet haberlerini göster
sondakika cumhuriyet

# Cumhuriyet haberlerini özel sayıyla göster
sondakika cumhuriyet 20

# TRT Haber haberlerini göster
sondakika trt

# TRT Haber haberlerini özel sayıyla göster
sondakika trt 15

# Mynet haberlerini göster
sondakika mynet

# Mynet haberlerini özel sayıyla göster
sondakika mynet 15

# Sabah haberlerini göster
sondakika sabah

# Habertürk haberlerini özel sayıyla göster
sondakika haberturk 5

# Star haberlerini göster
sondakika star

# CNN Türk haberlerini göster
sondakika cnnturk

# Yeni Şafak haberlerini göster
sondakika yenisafak

# Anadolu Ajansı haberlerini göster
sondakika aa
```

### Mevcut Kaynaklar
#### Son Dakika (Breaking News)
| Komut | Kaynak |
|-------|--------|
| `cumhuriyet` | Cumhuriyet |
| `trt` | TRT Haber |
| `mynet` | Mynet |

#### Haberler (General News)
| Komut | Kaynak |
|-------|--------|
| `sabah` | Sabah |
| `star` | Star |
| `vatan` | Gazete Vatan |
| `haberturk` | Habertürk |
| `cnnturk` | CNN Türk |
| `yenisafak` | Yeni Şafak |
| `aa` | Anadolu Ajansı |

### CLI Yardım
```bash
sondakika
# veya
sondakika --help
```

### CLI Çıktı Örneği
```
📰 ══════════════════════════════════════════════════
   Latest 10 News from TRT (Son Dakika)
   Son guncelleme: 10.04.2026 20:02
   ══════════════════════════════════════════════════

  ┌─ 1. Son dakika deprem mi oldu?
  │
  │   📅 10.04.2026 20:02
  │
  │   Son depremler...
  └─────────────────────────────────────────────────────────────────────
  🔗 https://www.trt...
```

---

## 🛠️ Kaynaktan Derleme

```bash
# Depoyu klonlayın
git clone https://github.com/eaeoz/sondakika.git
cd sondakika

# Bağımlılıkları yükleyin (hem GUI hem de eski CLI bağımlılıklarını içerir)
npm install

# v2.0.0 Electron GUI'sini çalıştır (varsayılan)
npm start

# Windows yükleyicisini derle (NSIS formatı, x64)
npm run build
```

Derlenen yükleyici `dist/` klasöründe `Sondakika.Setup.2.0.0.exe` olarak bulunacaktır.

Eski CLI işlevselliği üzerinde çalışmak için [eski sürümlerdeki](https://github.com/eaeoz/sondakika/releases) v1.x kaynak koduna bakın.

---

## 📦 v2.0.0'da Neler Yaptık?

Bu sürüm, orijinal CLI aracından tam özellikli bir Windows masaüstü uygulamasına tam geçiştir:

### Teknik Uygulama
- ✅ Masaüstü uygulama çatısı olarak **Electron 28.3.3** entegre edildi
- ✅ Windows x64 için NSIS hedefi ile **electron-builder 24.13.3** yapılandırıldı
- ✅ Özel çok boyutlu uygulama simgesi tasarlandı ve gömüldü (`assets/icon.ico` ve `assets/icon.png`)
- ✅ Otomatik Başlat menüsü/Masaüstü kısayolları ile taşınabilir Windows yükleyicisi oluşturuldu
- ✅ Ana ve oluşturucu işlemler arasında IPC iletişimi uygulandı
- ✅ Güvenli bağlam yalıtımı için ön yükleme (preload) komut dosyaları oluşturuldu

### GUI Geliştirme
- ✅ Temalandırma için CSS özel özellikleri ile **Inter font** ve modern UI tasarlandı
- ✅ CSS değişkenleri ile **karanlık/açık tema sistemi** uygulandı
- ✅ Kaynak seçim onay kutuları ve ayar kontrolleri ile **kenar çubuğu** oluşturuldu
- ✅ Hover efektleri ve seçim durumları ile **kart tabanlı haber ızgarası** oluşturuldu
- ✅ Özel pencere ve gezinti ile **uygulama içi makale okuyucu** geliştirildi
- ✅ Tüm pencerelerde **klavye navigasyonu** desteği eklendi
- ✅ Kullanıcı verileri dizininde JSON dosyaları kullanarak **durum kalıcılığı** uygulandı
- ✅ Erişilebilirlik için **yazı boyutu kontrolleri** eklendi (başlık ve içerik ayrı)
- ✅ Yapılandırılabilir sayfa başına öğe ile **sayfalama sistemi** oluşturuldu
- ✅ Görsel çıkarımı ve tarih biçimlendirmesi ile **RSS ayrıştırma** uygulandı
- ✅ Haber getirme sırasında daha iyi UX için **yükleme iskeletleri** eklendi
- ✅ Uygulama genelinde **Türkçe dil arayüzü** oluşturuldu

### Haber Kaynağı Entegrasyonu
- ✅ 9 büyük Türk haber RSS beslemesi entegre edildi
- ✅ Kaynağa özel görsel çıkarım desenleri uygulandı (örn. Gazete Vatan)
- ✅ Yanlış UTC sapması olan kaynaklar için saat dilimi düzeltmesi eklendi (CNN Türk, Yeni Şafak)
- ✅ Kaynaklar "Son Dakika" ve normal haber olarak kategorize edildi

### Eski CLI Korunması
- ✅ Terminal UI desteği için `blessed` bağımlılığı korundu
- ✅ Eski kullanıcılar için tüm v1.x CLI belgeleri korundu
- ✅ CLI'dan GUI'ye geçiş yapan kullanıcılar için geriye dönük uyumluluk notları tutuldu

---

## 🤝 Katkıda Bulunma
Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:
1. Depoyu çatallayın (fork)
2. Özelliğiniz için yeni bir dal oluşturun (`git checkout -b feature/ozelliginiz`)
3. Değişikliklerinizi işleyin (`git commit -m "Yeni özellik ekle"`)
4. Dala gönderin (`git push origin feature/ozelliginiz`)
5. Bir Pull Request açın

CLI ile ilgili katkılar için v1.x kaynak kodu yapısına bakın.

---

## 📄 Lisans
Bu proje ISC Lisansı altında lisanslanmıştır - ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.

---

*Geliştirici: [Sedat Ergoz](https://github.com/eaeoz)*
