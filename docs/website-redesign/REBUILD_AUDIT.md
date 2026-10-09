# Atlas Website Rebuild Audit & Root Cause Analysis

Tanggal: 9 Oktober 2026
Auditor: Principal Product Designer, Technical SEO Architect & Senior Frontend Engineer
Status: Audit Selesai — Rencana Perbaikan Disiapkan

---

## 1. Ringkasan Eksekutif

Audit mendalam terhadap front-end dan landing page produksi Atlas (`https://atlas-automation.vercel.app`) membuktikan bahwa website saat ini memiliki backend yang solid (Next.js 16, Neon PostgreSQL durable, Vitest 25 suites passing, Zod validation), namun lapisan tampilan dan presentasi komersialnya mengalami beberapa cacat arsitektur layout dan inkonsistensi tipografi/bahasa yang signifikan.

Laporan ini mendokumentasikan akar masalah (root cause) teknis, file dan selector penyebab, dampaknya terhadap pengalaman pengguna dan persepsi calon klien enterprise, serta rencana tindakan korektif menyeluruh.

---

## 2. Investigasi Root Cause Cacat Layout & Tampilan

### Cacat 1: Hero Mengalami Pergeseran Vertikal Ekstrem (Kolom Kiri Turun Jauh, Kolom Kanan Naik)
- **Gejala:** Kolom judul di sebelah kiri baru dimulai jauh di bawah, sementara kartu demo workflow di sebelah kanan dimulai lebih tinggi. Terdapat ruang kosong vertikal buatan yang sangat besar di atas judul utama.
- **File Penyebab:** `app/globals.css` (baris 420-425) dan `app/page.tsx` (baris 61-71).
- **Akar Masalah Teknis (Root Cause):**
  1. `.hero-grid` pada `app/globals.css` menggunakan `align-items: center;`.
  2. Komponen demo di kolom kanan (`<WorkflowCanvas />`) memiliki tinggi render ~650px (karena memuat 4 kartu node, satu drawer draf WhatsApp, dan footer metrik), sedangkan kolom teks kiri memiliki tinggi konten awal ~420px.
  3. Properti `align-items: center` menghitung selisih tinggi kedua kolom dan mendorong kolom kiri turun secara vertikal sejauh `(650 - 420) / 2 = 115px`.
  4. Ditambah dengan `padding: var(--space-8) 0 var(--space-7) 0` (padding atas 64px) pada wrapper `<section>`, judul `<h1>` terdorong hingga ~180px dari header navigasi, menciptakan ilusi ruang kosong raksasa yang tidak wajar.
- **Dampak Klien:** Calon klien melihat ruang hampa yang canggung di bagian atas layar desktop, hierarki membaca terganggu, dan tombol CTA utama terdorong ke bawah garis lipatan layar (below-the-fold).
- **Solusi yang Diterapkan:**
  - Ubah `.hero-grid` menjadi `align-items: flex-start;` (atau `start`).
  - Sesuaikan rasio kolom desktop menjadi seimbang: 48% teks dan 52% visual demo canvas.
  - Kurangi padding atas hero menjadi terukur dan proporsional (`var(--space-6)` atau 32px-40px).
  - Buat kedua kolom sejajar persis pada baseline atas yang sama.

---

### Cacat 2: Tipografi Jatuh ke Font Serif (Times New Roman) di Browser
- **Gejala:** Teks judul dan navigasi tampil dengan font serif (Times New Roman), bukan sans-serif modern standar produk SaaS enterprise.
- **File Penyebab:** `app/globals.css` (baris 24-25 dan 98) serta ketiadaan font provider di `app/layout.tsx`.
- **Akar Masalah Teknis (Root Cause):**
  1. Pada `app/globals.css`, variabel `--font-sans` didefinisikan sebagai:
     ```css
     --font-sans: var(--font-schibsted), ui-sans-serif, system-ui, sans-serif;
     ```
  2. Variabel `--font-schibsted` tidak pernah diimpor atau dideklarasikan di mana pun dalam kode Next.js (tidak ada `next/font/google` untuk Schibsted Grotesk di `app/layout.tsx`).
  3. Berdasarkan spesifikasi CSS Custom Properties Level 1 (Guaranteed-Invalid Values), pemanggilan `var(--font-schibsted)` tanpa nilai fallback di dalam kurung kurawal fungsi `var()` menyebabkan deklarasi dievaluasi sebagai invalid pada computed-value time.
  4. Ketika suatu deklarasi properti `font-family` menjadi invalid pada computed-value time, browser mereset nilainya ke nilai `initial`, yaitu font bawaan peramban: **Times New Roman (serif)**!
- **Dampak Klien:** Website terlihat kuno, mentah, dan tidak seperti produk teknologi enterprise B2B modern.
- **Solusi yang Diterapkan:**
  - Deklarasikan stack font sans-serif sistem yang tahan gagal (bulletproof fallback):
     ```css
     --font-sans: var(--font-inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
     --font-mono: var(--font-jetbrains, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
     ```
  - Konfigurasikan font `Inter` dan `JetBrains_Mono` secara resmi di `app/layout.tsx` melalui `next/font/google` dengan fallback lokal otomatis.

---

### Cacat 3: Bahasa Campur Aduk (Inggris & Indonesia Bercampur)
- **Gejala:** Navigasi dan judul menggunakan Bahasa Inggris (misal: "Deploy Supervised AI Workflows", "Book a 30-Min Workflow Audit"), sedangkan kartu demo dan form menggunakan Bahasa Indonesia (misal: "Demo Kanvas Interaktif", "Draf Respon WhatsApp Otomatis", "Persetujuan manusia wajib").
- **File Penyebab:** `lib/i18n/index.ts` (baris 15-17) dan hardcoding teks pada `components/WorkflowCanvas.tsx`.
- **Akar Masalah Teknis (Root Cause):**
  1. `lib/i18n/index.ts` mendeteksi bahasa pengguna melalui header `accept-language`:
     ```ts
     return first.startsWith("id") || first.startsWith("in") ? "id" : "en";
     ```
  2. Hampir semua instalasi browser Windows/Chrome di Indonesia memiliki header default `en-US,en;q=0.9`. Akibatnya, `getLocale()` mengembalikan `"en"`.
  3. Sementara itu, `app/page.tsx` memiliki teks bilingual conditional (`isEn ? ... : ...`), namun `WorkflowCanvas.tsx` memiliki teks Indonesia yang tertanam langsung di beberapa tombol dan judul drawer.
  4. Pengunjung dengan browser default mendapatkan navigasi Inggris bercampur dengan kartu Indonesia.
- **Dampak Klien:** Inkonsistensi bahasa merusak profesionalisme dan kredibilitas agensi/perusahaan enterprise di Indonesia.
- **Solusi yang Diterapkan:**
  - Jadikan Bahasa Indonesia sebagai bahasa default utama website pemasaran (jika tanpa cookie preferensi eksplisit).
  - Seluruh komponen (Navbar, Hero, Proof strip, WorkflowCanvas, Drawer, Bento grid, FAQ, Form, Footer) wajib 100% berbahasa Indonesia yang alami, baku, dan persuasif untuk buyer B2B Indonesia.
  - Sediakan dukungan toggle bahasa Inggris yang bersih tanpa kebocoran teks lintas bahasa.

---

### Cacat 4: Demo Workflow Terlalu Mendominasi & Status Bertentangan
- **Gejala:** Kartu demo visual berukuran terlalu besar sehingga menenggelamkan pesan penjualan. Di dalam demo, ikon status berwarna hijau (`CheckCircle2`) muncul bersamaan dengan label "Menunggu Persetujuan Manusia", memberikan kesan kontradiktif antara selesai vs tertunda.
- **File Penyebab:** `components/WorkflowCanvas.tsx` (baris 47-57, 182-198, 312-323).
- **Akar Masalah Teknis (Root Cause):**
  1. `WorkflowCanvas` dirancang seperti miniatur dasbor aplikasi penuh, bukan visualisasi ringkas produk yang elegan.
  2. Elemen status bawah menggunakan `<CheckCircle2 size={14} style={{ color: "var(--color-success)" }} />` bahkan ketika status alur kerja masih berada dalam state `approval` (tertahan menunggu izin).
- **Dampak Klien:** Calon klien bingung apakah alur kerja sudah berjalan atau sedang berhenti menunggu persetujuan.
- **Solusi yang Diterapkan:**
  - Redesain `WorkflowCanvas` menjadi visualisasi produk yang ringkas, berbingkai bersih, dan proporsional.
  - Harmonisasi status: saat state `approval`, gunakan warna peringatan amber dengan ikon jam/perisai (`Menunggu Tinjauan Operator`), node aksi eksternal diberi status `Tertahan`. Hanya setelah tombol "Setujui" diklik, status berubah menjadi hijau sukses (`Disetujui & Dijalankan di Sandbox`).

---

## 3. Fitur yang Wajib Dipertahankan

Selama proses perombakan front-end, backend dan integritas data berikut **TIDAK BOLEH DIRUSAK**:
1. **Engine Runtime Workflow:** Deterministic DAG execution, bounded LLM invocation, idempotency keying.
2. **Koneksi Database Neon PostgreSQL:** Adapter durable persisten di produksi (`api/health` terhubung ke pooler Neon).
3. **Endpoint API Leads:** `/api/leads` dengan validasi server-side Zod, rate limiting, dan penyimpanan data terisolasi.
4. **Katalog 120 Workflow Blueprint:** Seluruh struktur template pada `lib/templates/catalog.ts` dan schema validasinya.
5. **Autentikasi & Sesi:** Hashing sandi scrypt, HTTP-only signed session cookies, CSRF protection.
6. **25 Unit & Integration Test Suites:** Seluruh pengujian Vitest wajib tetap 100% lulus.

---

## 4. Matriks Rencana Aksi Perbaikan

| Area | Tindakan Teknis | Target File |
|:---|:---|:---|
| **Typography & Fonts** | Pasang font Inter & JetBrains Mono resmi, buat fallback sistem tahan banting tanpa serif | `app/layout.tsx`, `app/globals.css` |
| **Hero Alignment** | Ganti `align-items: center` ke `flex-start`, kurangi padding, seimbangkan grid | `app/globals.css`, `app/page.tsx` |
| **Workflow Canvas** | Kompakkan tata letak, perbaiki konsistensi status (amber saat review, hijau saat disetujui) | `components/WorkflowCanvas.tsx` |
| **Bahasa & Konten** | Satukan narasi Bahasa Indonesia untuk pasar B2B enterprise tanpa teks campur aduk | `app/page.tsx`, `components/Navbar.tsx`, `locales/id.json` |
| **Penawaran Komersial** | Tegaskan offer 5-Day Implementation Sprint (Rp7.500.000) dan Audit Gratis 30 Menit | `app/page.tsx`, `app/services/*` |
| **SEO Foundations** | Schema.org JSON-LD, sitemap dinamis, robots.txt, canonical metadata | `components/SchemaOrgJsonLd.tsx`, `app/sitemap.ts` |
