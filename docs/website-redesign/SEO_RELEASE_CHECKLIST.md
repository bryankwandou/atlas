# Atlas SEO Release & Quality Checklist

Tanggal Verifikasi: 9 Oktober 2026
Tujuan: Checklist Pra-Rilis dan Pasca-Deployment untuk Memastikan Nol Cacat SEO di Google SERP

---

## 1. Verifikasi Crawlability & Indexing

- [x] **Robots.txt Berfungsi Normal:** Status HTTP 200 di `/robots.txt`. Aturan memperbolehkan pengindeksan halaman publik (`/`, `/services/*`, `/solutions/*`) dan melindungi area privat (`/app/*`, `/api/*`).
- [x] **Sitemap XML Valid:** Status HTTP 200 di `/sitemap.xml`. Struktur XML mematuhi skema `sitemaps.org/schemas/sitemap/0.9` tanpa tag rusak.
- [x] **Tidak Ada `noindex` Tak Sengaja:** Seluruh halaman komersial memiliki meta `robots: { index: true, follow: true }`.
- [x] **Canonical URL Lengkap:** Semua halaman menyertakan tag `<link rel="canonical" href="..." />` yang mengarah ke domain produksi resmi `https://atlas-automation.vercel.app`.
- [x] **Bebas Broken Links (404 Internal):** Seluruh tautan di navbar, footer, dan kartu konten dicek dan merujuk ke rute internal yang valid (status 200).

---

## 2. On-Page Semantics & Content Quality

- [x] **Satu H1 per Halaman:** Setiap halaman publik memiliki tepat satu judul H1 utama yang deskriptif dan mencakup intent kata kunci.
- [x] **Hierarki H2 & H3 Logis:** Struktur heading membentuk outline dokumen yang mudah dibaca dan diparsing oleh bot pencari.
- [x] **Meta Title & Description Unik:** Tidak ada duplikasi judul antar-halaman. Panjang title 50–60 karakter dan meta description 140–160 karakter.
- [x] **Konten Utama Hadir di DOM Awal:** Server-Side Pre-rendered oleh Next.js sehingga bot pencari dapat membaca konten lengkap tanpa eksekusi JavaScript client yang lambat.
- [x] **Aksesibilitas Gambar & Ikon:** Semua ikon Lucide memiliki atribut `aria-hidden="true"`, sedangkan elemen interaktif memiliki label teks atau `aria-label` yang jelas.

---

## 3. Structured Data (Schema.org)

- [x] **JSON-LD Server Rendered:** Menggunakan komponen server `SchemaOrgJsonLd`.
- [x] **Skema Organization:** Menyediakan identitas brand, URL resmi, dan tipe entitas.
- [x] **Skema Service:** Mendokumentasikan layanan utama "5-Day Automation Implementation Sprint" dan "Workflow Discovery Audit".
- [x] **Skema FAQPage:** Pertanyaan dan jawaban aktual pada homepage dicocokkan 100% dengan teks visual tanpa manipulasi.
- [x] **Nol Fake Reviews / Ratings:** Tidak menyertakan review sintetis untuk mencegah penalti Google Search Manual Action.

---

## 4. Kecepatan & Core Web Vitals (CWV)

- [x] **Zero Layout Shift (CLS < 0.1):** Layout container memiliki dimensi stabil, font dimuat dengan `display: swap`.
- [x] **Fast First Contentful Paint (FCP < 1.5s):** CSS terkompresi tanpa dependensi font eksternal yang memblokir render.
- [x] **Responsif Mobile:** Teruji pada viewport 360px hingga 1440px tanpa overflow horizontal atau pemotongan tombol CTA.
