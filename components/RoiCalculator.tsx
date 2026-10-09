"use client";

import { useState } from "react";
import { ArrowRight, Calculator, CheckCircle2, Clock, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

interface RoiCalculatorProps {
  dict: {
    title?: string;
    subtitle?: string;
  };
  locale?: string;
}

export function RoiCalculator({ locale = "id" }: RoiCalculatorProps) {
  const isEn = locale === "en";

  // Sliders state
  const [leadsPerMonth, setLeadsPerMonth] = useState<number>(250);
  const [avgDealValue, setAvgDealValue] = useState<number>(15000000); // 15jt IDR
  const [hourlyWage, setHourlyWage] = useState<number>(75000); // 75rb IDR

  // Business math:
  // Average manual lead handling: 20 minutes (0.33 hours) per lead (reading, researching, manual WhatsApp draft, CRM data entry)
  // With Atlas: down to 2 minutes (0.033 hours) human review time -> saving ~0.3 hours per lead
  const hoursSavedPerMonth = Math.round(leadsPerMonth * 0.3);
  const directPayrollSavings = Math.round(hoursSavedPerMonth * hourlyWage);

  // Speed-to-lead protection:
  // Delayed follow-up loses ~12% of qualified leads. Assume 10% qualification rate, 20% close rate on qualified.
  // 1 recovered deal every 2-3 months on average for 250 leads.
  const estimatedRevenueProtected = Math.round(leadsPerMonth * 0.1 * 0.05 * avgDealValue);

  // Payback period for Rp7.500.000 sprint in days
  const sprintCost = 7500000;
  const monthlyTotalValue = directPayrollSavings + (estimatedRevenueProtected * 0.25);
  const paybackDays = monthlyTotalValue > 0 ? Math.max(7, Math.round((sprintCost / monthlyTotalValue) * 30)) : 30;

  const formatIdr = (val: number) => {
    return new Intl.NumberFormat(isEn ? "en-US" : "id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="roi-calculator-box">
      {/* Inputs Column */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <Calculator size={20} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
          <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
            {isEn ? "Agency Capacity & ROI Calculator" : "Kalkulator Kapasitas & Penghematan Agensi"}
          </h3>
        </div>
        <p className="muted" style={{ fontSize: "var(--text-14)" }}>
          {isEn
            ? "Calculate your direct payroll savings and reclaimed operational capacity by deploying supervised lead qualification workflows."
            : "Hitung potensi penghematan biaya operasional dan kapasitas tim Anda dengan mengganti kualifikasi lead manual ke sistem otomatis berizin manusia."}
        </p>

        {/* Slider 1: Monthly Leads */}
        <div className="slider-group">
          <div className="slider-header">
            <span>{isEn ? "Monthly Inbound Leads" : "Volume Lead Masuk per Bulan"}</span>
            <span className="slider-val">{leadsPerMonth.toLocaleString()} leads</span>
          </div>
          <input
            type="range"
            min={50}
            max={2000}
            step={25}
            value={leadsPerMonth}
            onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
            className="slider-range"
            aria-label={isEn ? "Monthly Inbound Leads" : "Volume Lead Masuk per Bulan"}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
            <span>50</span>
            <span>1,000</span>
            <span>2,000+</span>
          </div>
        </div>

        {/* Slider 2: Average Deal Value */}
        <div className="slider-group">
          <div className="slider-header">
            <span>{isEn ? "Average Client / Deal Value" : "Rata-rata Nilai Kontrak / Klien"}</span>
            <span className="slider-val">{formatIdr(avgDealValue)}</span>
          </div>
          <input
            type="range"
            min={3000000}
            max={50000000}
            step={1000000}
            value={avgDealValue}
            onChange={(e) => setAvgDealValue(Number(e.target.value))}
            className="slider-range"
            aria-label={isEn ? "Average Client Deal Value" : "Rata-rata Nilai Kontrak Klien"}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
            <span>Rp3M</span>
            <span>Rp25M</span>
            <span>Rp50M+</span>
          </div>
        </div>

        {/* Slider 3: Hourly Staff Cost */}
        <div className="slider-group">
          <div className="slider-header">
            <span>{isEn ? "Staff Hourly Wage / Cost" : "Biaya Karyawan per Jam (Gaji/Beban)"}</span>
            <span className="slider-val">{formatIdr(hourlyWage)} / hr</span>
          </div>
          <input
            type="range"
            min={35000}
            max={250000}
            step={5000}
            value={hourlyWage}
            onChange={(e) => setHourlyWage(Number(e.target.value))}
            className="slider-range"
            aria-label={isEn ? "Staff Hourly Wage" : "Biaya Karyawan per Jam"}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
            <span>Rp35rb</span>
            <span>Rp125rb</span>
            <span>Rp250rb</span>
          </div>
        </div>
      </div>

      {/* Dynamic Results Column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          background: "var(--color-surface-2)",
          padding: "var(--space-5)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <span className="eyebrow">{isEn ? "PROJECTED MONTHLY VALUE" : "PROYEKSI NILAI PER BULAN"}</span>

          {/* Metric 1 */}
          <div className="roi-metric-tile">
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
              <Clock size={15} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
              <span>{isEn ? "Staff Hours Reclaimed" : "Waktu Tim yang Dihemat"}</span>
            </div>
            <div className="roi-metric-num">{hoursSavedPerMonth} jam / bulan</div>
            <span style={{ fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
              {isEn ? "Equivalent to ~1.5 weeks of full-time admin work" : "Setara ~1.5 minggu kerja admin penuh"}
            </span>
          </div>

          {/* Metric 2 */}
          <div className="roi-metric-tile">
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
              <DollarSign size={15} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
              <span>{isEn ? "Direct Payroll Savings" : "Penghematan Beban Gaji Langsung"}</span>
            </div>
            <div className="roi-metric-num">{formatIdr(directPayrollSavings)} / bln</div>
            <span style={{ fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
              {isEn ? "Reinvested into growth and client delivery" : "Dapat dialihkan untuk closing klien"}
            </span>
          </div>

          {/* Metric 3 */}
          <div className="roi-metric-tile">
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--text-12)", color: "var(--color-accent)" }}>
              <TrendingUp size={15} style={{ color: "var(--color-success)" }} aria-hidden="true" />
              <span>{isEn ? "Estimated Sprint Payback Period" : "Estimasi Balik Modal Sprint (Rp7.5jt)"}</span>
            </div>
            <div className="roi-metric-num" style={{ color: "var(--color-success)" }}>
              ~{paybackDays} {isEn ? "days" : "hari"}
            </div>
            <span style={{ fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
              {isEn ? "Based on Rp7.500.000 5-day implementation sprint" : "Berdasarkan investasi 5-Day Sprint Rp7.500.000"}
            </span>
          </div>
        </div>

        <Link
          href="#audit-form"
          className="btn btn-primary"
          style={{ width: "100%", textAlign: "center" }}
        >
          <span>{isEn ? "Lock In Your Implementation Sprint" : "Klaim Jadwal Sprint Anda Sekarang"}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
