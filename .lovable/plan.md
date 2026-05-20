## Tujuan
Selaraskan persis konten aplikasi dengan dummy data pada dokumen "CEPAT PRO — Dummy Data & Content Seed", dan ganti palet warna ke spesifikasi dokumen.

## 1. Visual tokens — `src/styles.css`
Default tema dijadikan dark (sesuai dokumen):
- `--background` → #0F1115
- `--card`, `--popover`, `--sidebar` → #171A21
- `--border`, `--input`, `--sidebar-border` → #252A35
- `--foreground` → #FFFFFF
- `--muted-foreground` → #A1A1AA (#A1A1AA)
- `--primary`, `--accent`, `--ring` → #E8FF4D (CTA kuning-lime)
- `--primary-foreground`, `--accent-foreground` → #0F1115 (teks gelap di atas lime)
- `--accent-soft` → versi soft dari #E8FF4D (~15% alpha)
- `--muted` → tone gelap di antara card & border
- `--success` tetap hijau, `--warning` amber, `--destructive` merah
- Block `.dark{}` disinkronkan dengan nilai yang sama (atau diabaikan karena root sudah dark).
- Body tetap Inter, radius tetap 8px max (CTA pill seperti memo sebelumnya).

## 2. Dashboard — `src/routes/_app.dashboard.tsx`
Ganti 4 Metric jadi persis stats cards JSON:
- Total Dokumen 128 (+12%) — icon FileText
- Proposal Dibuat 54 (+8%) — icon Briefcase
- Kontrak Aktif 21 (+3%) — icon ShieldCheck
- AI Credits 840 (-10%) — icon Sparkles

Recent Activities → array `recent` diganti 3 item:
- "Proposal Website Klinik Gigi" · Completed · 2 menit lalu
- "Kontrak Freelance Design" · Draft · 15 menit lalu
- "SOP Admin CS" · Generated · 1 jam lalu

Sapaan & sidebar widget tetap, hanya angka/teks utama yang disinkronkan.

## 3. Proposal — `src/routes/_app.proposal.tsx`
- Tambah list proposal di atas (Klinik Sehat Dental / Laundry Express / Padel Arena Bandung) dengan badge status Approved/Pending/Draft.
- Field form diselaraskan: Nama Klien, Nama Project, Jenis Layanan, Budget, Timeline, Tone Proposal, CTA Penawaran.
- Default values: Klinik Sehat Dental, Website Development, Rp12.000.000, 21 Hari.
- Preview text persis paragraf dummy ("Halo Klinik Sehat Dental, … Estimasi pengerjaan: 21 Hari, Total investasi: Rp12.000.000") + bullet Responsive Design, WhatsApp Integration, SEO Friendly, Admin Dashboard.

## 4. Kontrak — `src/routes/_app.kontrak.tsx`
Ganti dari `PagePlaceholder` ke halaman nyata:
- Template selector 4 kartu: Freelance Agreement (Freelancer), NDA Agreement (Legal), Vendor Contract (Business), Project Agreement (Agency).
- Live preview kontrak dengan teks dummy ("PIHAK PERTAMA … Website Development … Rp15.000.000 … 30 hari …") dan 3 milestone cards: DP 50%, Progress 30%, Final 20%.
- Tombol Export.

## 5. SOP — `src/routes/_app.sop.tsx`
Ganti placeholder dengan:
- Sidebar kategori: Customer Service, Admin Finance, Sales, Social Media, Warehouse, HR Recruitment.
- Preview "SOP Customer Service" dengan 5 langkah persis dokumen.

## 6. WhatsApp — `src/routes/_app.whatsapp.tsx`
Ganti placeholder dengan:
- Campaign cards: Promo Klinik Gigi (Customer Lama · Scheduled), Launching Padel Arena (New Leads · Draft).
- AI Generated copy box dengan teks dummy "Halo Kak 👋 … wa.me/628xxxx".

## 7. Financial — `src/routes/_app.financial.tsx`
Ganti placeholder dengan:
- Revenue cards 4 bulan: Jan 12jt, Feb 18.5jt, Mar 22jt, Apr 17.5jt + bar chart sederhana.
- Transaksi: "Pembayaran Proposal Website +Rp12.000.000 Paid", "Langganan OpenAI API -Rp450.000 Completed".

## 8. Billing — `src/routes/_app.billing.tsx`
Selaraskan plan dengan dokumen:
- Starter Rp99.000: 100 AI Credits, Proposal Generator, Contract Generator.
- Pro Rp299.000: Unlimited AI, All Templates, Export PDF, Priority Support.
Hapus/ubah plan Free & Business agar persis JSON (hanya 2 plan).

## 9. Templates — `src/routes/_app.templates.tsx`
Tambahkan 3 kartu utama persis dokumen: "Proposal Website UMKM" (Proposal), "Kontrak Freelancer" (Legal), "SOP Customer Service" (Operations). Kartu lain dipertahankan sebagai pelengkap, kategori "Legal" & "Operations" ditambahkan ke filter chips.

## 10. Settings — `src/routes/_app.settings.tsx`
Tambah blok "User Profile" di atas:
- Name: Fahmi Studio
- Email: hello@cepatpro.id
- Plan: Pro Plan
- Credits: 840

Field bisnis existing dipertahankan di bawah.

## Catatan teknis
- Tetap pakai semantic token (`bg-card`, `text-accent`, dsb) — tidak hard-code hex di komponen.
- Kontrak/SOP/WhatsApp/Financial dibuat ulang sebagai page penuh (bukan PagePlaceholder).
- Tidak menyentuh routing/auth/server logic.
