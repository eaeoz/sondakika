# Sondakika
**Modern Electron-Based RSS News Reader for Windows**  
*Native desktop application for seamless Turkish news reading with real-time RSS feed aggregation*

[![Version](https://img.shields.io/badge/version-2.0.0-blue)](https://github.com/eaeoz/sondakika/releases)  
[![License](https://img.shields.io/badge/license-ISC-green)](LICENSE)  
[![Windows Support](https://img.shields.io/badge/Windows-10+-lightgrey)](https://www.microsoft.com/windows)  
[![Download](https://img.shields.io/badge/Download-Windows%20Installer-blue?style=for-the-badge)](https://github.com/eaeoz/sondakika/releases/download/2.0.0/Sondakika.Setup.2.0.0.exe)

---

## 📋 Table of Contents
1. [Overview](#-overview)
2. [🪟 Windows Desktop Application](#-windows-desktop-application)
   - [What is Sondakika?](#what-is-sondakika)
   - [How It Works](#how-it-works)
   - [System Requirements](#system-requirements)
   - [📥 Download](#-download)
   - [Installation](#installation)
   - [Getting Started](#getting-started)
   - [Key Features](#key-features)
3. [⌨️ Keyboard Shortcuts](#️-keyboard-shortcuts)
4. [🛠️ Building from Source](#️-building-from-source)
5. [📦 What We Built in v2.0.0](#-what-we-built-in-v200)
6. [🤝 Contributing](#-contributing)
7. [📄 License](#-license)

---

## 📖 Overview
Sondakika is a native Windows desktop application built with Electron that aggregates news from major Turkish news sources. It features a modern, responsive UI with dark/light themes, customizable font sizes, and an in-app article reader.

**Note:** This v2.0.0 release is a complete migration from the original CLI-only tool to a full-featured desktop GUI application.

---

## 🪟 Windows Desktop Application

### What is Sondakika?
A native Windows application that fetches and displays real-time news from 9 major Turkish news sources (Cumhuriyet, TRT Haber, Mynet, Sabah, Star, Gazete Vatan, Habertürk, CNN Türk, Yeni Şafak, Anadolu Ajansı) in a modern, easy-to-read interface.

### How It Works
1. The app uses `rss-parser` to fetch RSS feeds from configured Turkish news sources
2. News articles are displayed in a card-based layout with source badges and timestamps
3. Click any article to open it in the in-app reader with full content view
4. User preferences (enabled sources, theme, font sizes, window position) are saved locally
5. Navigate between articles using keyboard shortcuts or on-screen buttons
6. Open any article in your default browser with one click

### System Requirements
- Windows 10 (version 1809 or later) / Windows 11
- 64-bit (x64) processor
- 200MB free disk space
- Internet connection for fetching news

### 📥 Download

Download the latest Windows installer directly:

[![Download Sondakika 2.0.0](https://img.shields.io/badge/⬇️%20Download-Windows%20Installer%20(64-bit)-blue?style=for-the-badge)](https://github.com/eaeoz/sondakika/releases/download/2.0.0/Sondakika.Setup.2.0.0.exe)

**Direct Link:**  
`https://github.com/eaeoz/sondakika/releases/download/2.0.0/Sondakika.Setup.2.0.0.exe`

Or visit the [GitHub Releases page](https://github.com/eaeoz/sondakika/releases) for all versions.

### Installation
1. Download `Sondakika.Setup.2.0.0.exe` using the link above
2. Run the installer and follow the on-screen prompts
3. The app will launch automatically after installation
4. A shortcut will be added to your Start Menu and Desktop

### Getting Started
1. **First Launch**: The app opens with default news sources enabled (Cumhuriyet, TRT Haber, Mynet, Habertürk, CNN Türk)
2. **Select Sources**: Use the sidebar checkboxes to enable/disable news sources
3. **Fetch News**: Click the "🔄 Yenile" (Refresh) button to fetch latest headlines
4. **Read Articles**: Click any news card to open the full article in the in-app reader
5. **Customize**: Use the sidebar options to change theme, font sizes, sort order, and items per page

### Key Features
- ✅ **9 Turkish News Sources**: Cumhuriyet, TRT Haber, Mynet, Sabah, Star, Gazete Vatan, Habertürk, CNN Türk, Yeni Şafak, Anadolu Ajansı
- ✅ **Modern UI**: Clean, responsive design with card-based news layout
- ✅ **Dark/Light Theme**: Toggle between dark (default) and light themes
- ✅ **In-App Article Reader**: Read full articles without opening a browser
- ✅ **Article Navigation**: Navigate between articles in the reader with animation transitions
- ✅ **Adjustable Font Sizes**: Separate controls for title (12-32px) and content (10-28px) fonts
- ✅ **Keyboard Navigation**: Full keyboard support for navigation and controls
- ✅ **Source Filtering**: Enable/disable individual news sources
- ✅ **Sorting Options**: Sort by newest or oldest first
- ✅ **Pagination**: Control how many articles display per page (5, 10, 15, 20)
- ✅ **Image Extraction**: Automatically extracts and displays article images from RSS feeds
- ✅ **State Persistence**: Remembers your settings, window position, and enabled sources
- ✅ **External Link Support**: Open articles in your default browser
- ✅ **Turkish Language UI**: Fully localized interface
- ✅ **Custom App Icon**: Professional branding with multi-size icon

---

## ⌨️ Keyboard Shortcuts

### Main Window
| Shortcut | Action |
|----------|--------|
| `↑` `↓` | Select news article |
| `←` `→` | Navigate between pages |
| `Enter` | Open selected article in reader |
| `1` `2` | Decrease/Increase title font size |
| `3` `4` | Decrease/Increase content font size |
| `` ` `` | Open selected article in browser |
| `F5` / Click Refresh | Fetch latest news |

### Article Reader
| Shortcut | Action |
|----------|--------|
| `↑` `↓` `Space` | Scroll article content |
| `PageUp` `PageDown` | Scroll by page |
| `Home` `End` | Scroll to top/bottom |
| `←` `→` | Previous/Next article |
| `Enter` `Escape` | Return to news list |
| `1` `2` | Decrease/Increase title font size |
| `3` `4` | Decrease/Increase content font size |
| `` ` `` | Open article in browser |

---

## 🛠️ Building from Source

```bash
# Clone the repository
git clone https://github.com/eaeoz/sondakika.git
cd sondakika

# Install dependencies
npm install

# Run in development mode (Electron GUI)
npm start

# Build Windows installer (NSIS format, x64)
npm run build
```

The built installer will be available in the `dist/` folder as `Sondakika.Setup.2.0.0.exe`.

---

## 📦 What We Built in v2.0.0

This release is a complete migration from the original CLI-only tool to a full-featured Windows desktop application:

### Technical Implementation
- ✅ Integrated **Electron 28.3.3** as the desktop application framework
- ✅ Configured **electron-builder 24.13.3** with NSIS target for Windows x64
- ✅ Designed and embedded a custom multi-size app icon (`assets/icon.ico` and `assets/icon.png`)
- ✅ Built a portable Windows installer with automatic Start Menu/Desktop shortcuts
- ✅ Implemented IPC communication between main and renderer processes
- ✅ Created preload scripts for secure context isolation

### GUI Development
- ✅ Designed modern UI with **Inter font** and CSS custom properties for theming
- ✅ Implemented **dark/light theme system** with CSS variables
- ✅ Built **sidebar** with source selection checkboxes and settings controls
- ✅ Created **card-based news grid** with hover effects and selection states
- ✅ Developed **in-app article reader** with dedicated window and navigation
- ✅ Added **keyboard navigation** support across all windows
- ✅ Implemented **state persistence** using JSON files in userData directory
- ✅ Added **font size controls** for accessibility (title and content separately)
- ✅ Built **pagination system** with configurable items per page
- ✅ Implemented **RSS parsing** with image extraction and date formatting
- ✅ Added **loading skeletons** for better UX during news fetch
- ✅ Created **Turkish language interface** throughout the application

### News Source Integration
- ✅ Integrated 9 major Turkish news RSS feeds
- ✅ Implemented source-specific image extraction patterns (e.g., Gazete Vatan)
- ✅ Added timezone correction for sources with incorrect UTC offsets (CNN Türk, Yeni Şafak)
- ✅ Categorized sources as "Son Dakika" (Breaking News) vs regular news

---

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License
This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

*Developed by [Sedat Ergoz](https://github.com/eaeoz)*

---

# Sondakika (Türkçe)

**Windows için Modern Electron Tabanlı RSS Haber Okuyucu**  
*Türkçe haberleri gerçek zamanlı toplayan, yerel masaüstü uygulaması*

[![Sürüm](https://img.shields.io/badge/sürüm-2.0.0-blue)](https://github.com/eaeoz/sondakika/releases)  
[![Lisans](https://img.shields.io/badge/lisans-ISC-green)](LICENSE)  
[![Windows Desteği](https://img.shields.io/badge/Windows-10+-lightgrey)](https://www.microsoft.com/windows)  
[![İndir](https://img.shields.io/badge/İndir-Windows%20Yükleyici-blue?style=for-the-badge)](https://github.com/eaeoz/sondakika/releases/download/2.0.0/Sondakika.Setup.2.0.0.exe)

---

## 📋 İçindekiler
1. [Genel Bakış](#-genel-bakış)
2. [🪟 Windows Masaüstü Uygulaması](#-windows-masaüstü-uygulaması)
   - [Sondakika Nedir?](#sondakika-nedir)
   - [Nasıl Çalışır?](#nasıl-çalışır)
   - [Sistem Gereksinimleri](#sistem-gereksinimleri)
   - [📥 İndirme](#-indirme)
   - [Kurulum](#kurulum)
   - [Başlangıç](#başlangıç)
   - [Temel Özellikler](#temel-özellikler)
3. [⌨️ Klavye Kısayolları](#️-klavye-kısayolları)
4. [🛠️ Kaynaktan Derleme](#️-kaynaktan-derleme)
5. [📦 v2.0.0'da Neler Yaptık?](#-v200da-neler-yaptık)
6. [🤝 Katkıda Bulunma](#-katkıda-bulunma)
7. [📄 Lisans](#-lisans)

---

## 📖 Genel Bakış
Sondakika, Electron ile geliştirilen ve büyük Türk haber kaynaklarını toplayan yerel bir Windows masaüstü uygulamasıdır. Modern, duyarlı arayüzü, karanlık/açık temaları, özelleştirilebilir yazı boyutları ve uygulama içi makale okuyucusu ile gelir.

**Not:** Bu v2.0.0 sürümü, orijinal CLI aracından tam özellikli bir masaüstü GUI uygulamasına tamamen geçişi temsil eder.

---

## 🪟 Windows Masaüstü Uygulaması

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

Veya tüm sürümler için [GitHub Releases sayfasını](https://github.com/eaeoz/sondakika/releases) ziyaret edin.

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

## ⌨️ Klavye Kısayolları

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

## 🛠️ Kaynaktan Derleme

```bash
# Depoyu klonlayın
git clone https://github.com/eaeoz/sondakika.git
cd sondakika

# Bağımlılıkları yükleyin
npm install

# Geliştirme modunda çalıştır (Electron GUI)
npm start

# Windows yükleyicisini derle (NSIS formatı, x64)
npm run build
```

Derlenen yükleyici `dist/` klasöründe `Sondakika.Setup.2.0.0.exe` olarak bulunacaktır.

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
- ✅Özel pencere ve gezinti ile **uygulama içi makale okuyucu** geliştirildi
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

---

## 🤝 Katkıda Bulunma
Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:
1. Depoyu çatallayın (fork)
2. Özelliğiniz için yeni bir dal oluşturun (`git checkout -b feature/ozelliginiz`)
3. Değişikliklerinizi işleyin (`git commit -m "Yeni özellik ekle"`)
4. Dala gönderin (`git push origin feature/ozelliginiz`)
5. Bir Pull Request açın

---

## 📄 Lisans
Bu proje ISC Lisansı altında lisanslanmıştır - ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.

---

*Geliştirici: [Sedat Ergoz](https://github.com/eaeoz)*
