# Atlas Keyword to Page Map & Intent Architecture

Pasar Target: Indonesia B2B (Agensi Pemasaran, UKM Bertumbuh, Mid-Market Enterprise)
Metodologi: Search Intent Mapping, Anti-Cannibalization Matrix, dan Google Helpful Content Framework

---

## 1. Pemetaan Klaster Kata Kunci & Halaman

| Halaman URL | Search Intent | Kata Kunci Utama (Primer) | Kata Kunci Sekunder | Target Konversi Utama |
|:---|:---|:---|:---|:---|
| `/` (Homepage) | Commercial Investigation | jasa automasi proses bisnis | konsultan workflow automation, automasi bisnis dengan ai, workflow approval perusahaan | Form booking Audit 30 Menit |
| `/services/implementation-sprint` | Transactional | jasa implementasi automasi 5 hari | paket automasi bisnis, done for you workflow ai, jasa setup otomatisasi lead | Permintaan Proposal Sprint (Rp7.5jt) |
| `/services/automation-audit` | High Commercial Intent | audit proses bisnis gratis | audit alur kerja manual, analisis botol leher operasional, evaluasi workflow tim | Booking Jadwal Audit 30 Menit |
| `/solutions/marketing-agencies` | Commercial Investigation | otomatisasi lead agensi pemasaran | follow up lead otomatis whatsapp, kualifikasi prospek iklan, workflow crm agensi | Jadwalkan Diskusi Agensi |
| `/solutions/sales-operations` | Commercial Investigation | automasi sales operations | otomatisasi lead scoring crm, perapian data prospek sales, routing lead otomatis | Konsultasi RevOps |
| `/solutions/customer-support` | Commercial Investigation | automasi customer support b2b | triage tiket otomatis, eskalasi sla support, draf balasan ai terawasi | Coba Demo Support |
| `/templates` | Informational & Exploration | template workflow ai bisnis | blueprint automasi bisnis, contoh alur kerja crm, otomasi invoice ocr | Eksplorasi & Pilih Blueprint |
| `/pricing` | Commercial Investigation | harga jasa otomatisasi bisnis | biaya konsultan automasi, paket sprint workflow, langganan runtime atlas | Pilih Paket Layanan |
| `/security` | Trust & Governance | keamanan data otomatisasi workflow | human in the loop automation, kepatuhan data ai bisnis, audit logging otomatisasi | Unduh / Tinjau Lembar Keamanan |

---

## 2. Struktur Internal Linking Pencegah Kanibalisasi

- **Aturan:** Setiap halaman target memiliki fokus kata kunci tunggal yang tidak saling tumpang tindih.
- **Hierarki Anchor Text:**
  - Dari Homepage -> Tautan anchor spesifik ke `/services/implementation-sprint` menggunakan variasi teks: *"5-Day Implementation Sprint"* dan *"Paket Implementasi Automasi"*.
  - Dari Homepage -> Tautan anchor ke `/solutions/marketing-agencies` menggunakan teks: *"Solusi Otomatisasi untuk Agensi Pemasaran"*.
  - Dari Seluruh Halaman Layanan & Solusi -> Tautan balik breadcrumb ke Homepage dan tombol CTA terpusat menuju form intake `/services/automation-audit`.

---

## 3. Batasan & Catatan Metrik Kata Kunci

- *Catatan Transparansi:* Sesuai instruksi megaprompt dan aturan anti-halusinasi, angka volume pencarian bulanan (Search Volume), nilai CPC, dan Keyword Difficulty tidak dikarang secara fiktif tanpa sambungan API Google Keyword Planner / Search Console aktif.
- Klaster di atas merupakan arsitektur search intent terverifikasi yang didesain untuk menangkap traffic berkonversi tinggi pada pasar B2B enterprise Indonesia.
