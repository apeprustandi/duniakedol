"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMail, FiUser, FiArrowRight, FiRefreshCw, FiCheckCircle } from "react-icons/fi";
import { useToast } from "@/components/ui/ToastProvider";

type Step = "form" | "otp";

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();

  /* ── State ──────────────────────────────────────────────── */
  const [step, setStep] = useState<Step>("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* ── Countdown timer ────────────────────────────────────── */
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  /* ── Render Turnstile widget saat step berubah ke form ──── */
  useEffect(() => {
    if (step !== "form" || !turnstileReady) return;

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey || typeof window === "undefined" || !(window as unknown as Record<string, unknown>).turnstile) return;

    // Jika widget sudah ada, hapus dulu
    if (widgetIdRef.current !== null) {
      try { (window as unknown as { turnstile: { remove: (id: string) => void } }).turnstile.remove(widgetIdRef.current); } catch { }
      widgetIdRef.current = null;
    }

    const id = (window as unknown as { turnstile: { render: (el: HTMLElement, opts: Record<string, unknown>) => string } }).turnstile.render(turnstileRef.current!, {
      sitekey: siteKey,
      theme: "dark",
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(null),
      "error-callback": () => setTurnstileToken(null),
    });
    widgetIdRef.current = id;

    return () => {
      if (widgetIdRef.current !== null) {
        try { (window as unknown as { turnstile: { remove: (id: string) => void } }).turnstile.remove(widgetIdRef.current); } catch { }
        widgetIdRef.current = null;
      }
    };
  }, [step, turnstileReady]);

  /* ── OTP input handlers ─────────────────────────────────── */
  const handleOtpChange = useCallback(
    (i: number, val: string) => {
      if (!/^\d?$/.test(val)) return;
      const next = [...otp];
      next[i] = val.slice(-1);
      setOtp(next);
      if (val && i < 5) inputRefs.current[i + 1]?.focus();
    },
    [otp]
  );

  const handleOtpKeyDown = useCallback(
    (i: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !otp[i] && i > 0) {
        inputRefs.current[i - 1]?.focus();
      }
    },
    [otp]
  );

  const handleOtpPaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    const last = Math.min(pasted.length, 5);
    inputRefs.current[last]?.focus();
  }, []);

  /* ── Step 1: Kirim OTP ──────────────────────────────────── */
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 2) {
      toast.error("Nama lengkap minimal 2 karakter.");
      return;
    }
    if (!email.toLowerCase().endsWith("@gmail.com")) {
      toast.error("Email harus menggunakan akun Gmail (@gmail.com).");
      return;
    }
    if (!turnstileToken) {
      toast.error("Selesaikan verifikasi keamanan terlebih dahulu.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, type: "register", turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Gagal mengirim OTP.");
        // Reset widget agar bisa verifikasi ulang
        setTurnstileToken(null);
        if (widgetIdRef.current !== null && typeof window !== "undefined") {
          try { (window as unknown as { turnstile: { reset: (id: string) => void } }).turnstile.reset(widgetIdRef.current); } catch { }
        }
        return;
      }
      toast.success("OTP berhasil dikirim! Cek inbox Gmail kamu 📧");
      setStep("otp");
      setCountdown(60);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch {
      toast.error("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  /* ── Step 2: Verifikasi OTP ─────────────────────────────── */
  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      toast.error("Masukkan 6 digit OTP terlebih dahulu.");
      return;
    }

    setVerifying(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, otp: code, type: "register" }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Verifikasi gagal.");
        if (data.error?.includes("salah")) setOtp(["", "", "", "", "", ""]);
        return;
      }
      toast.success(`Akun berhasil dibuat! Selamat datang, ${data.user?.fullName} 🚀`);
      setTimeout(() => { router.push("/dashboard"); router.refresh(); }, 1000);
    } catch {
      toast.error("Tidak dapat terhubung ke server.");
    } finally {
      setVerifying(false);
    }
  }

  /* ── Kirim ulang OTP ────────────────────────────────────── */
  async function handleResend() {
    if (countdown > 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, type: "register" }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Gagal mengirim ulang OTP."); return; }
      toast.info("OTP baru telah dikirim ke email kamu.");
      setOtp(["", "", "", "", "", ""]);
      setCountdown(60);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch {
      toast.error("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#0a0f0a] flex flex-col">
      {/* Cloudflare Turnstile Script */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => setTurnstileReady(true)}
      />
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00ff88]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#00ff88]/3 rounded-full blur-3xl" />
      </div>
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,255,136,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,136,0.03) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-5">
              <span className="text-[#00ff88] font-bold text-lg tracking-wide">Dunia<span className="text-[#f5f5f5]"> </span>Kedol</span>
            </Link>
            <div className="inline-block border border-[#00ff88]/30 px-3 py-1 mb-4 ml-3">
              <span className="text-[#00ff88] text-xs tracking-widest uppercase">// new member</span>
            </div>
            <h1 className="text-3xl font-bold text-[#f5f5f5] mb-2">Daftar Sekarang</h1>
            <p className="text-[#a1a1aa] text-sm">
              {step === "form" ? "Isi data kamu, OTP akan dikirim ke email kamu" : `OTP dikirim ke ${email}`}
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {(["form", "otp"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 flex items-center justify-center text-xs font-bold border transition-colors ${step === s ? "bg-[#00ff88] text-[#0a0f0a] border-[#00ff88]" : step === "otp" && i === 0 ? "bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/40" : "bg-transparent text-[#52525b] border-[#27272a]"}`}>
                  {step === "otp" && i === 0 ? <FiCheckCircle className="text-xs" /> : i + 1}
                </div>
                <span className={`text-xs ${step === s ? "text-[#00ff88]" : "text-[#52525b]"}`}>
                  {s === "form" ? "Data Diri" : "Verifikasi OTP"}
                </span>
                {i === 0 && <div className={`flex-1 h-px ${step === "otp" ? "bg-[#00ff88]/40" : "bg-[#27272a]"}`} />}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="bg-[#1a1f1a] border border-[#27272a] p-8 relative overflow-hidden hover:border-[#00ff88]/20 transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent" />

            {/* ── Step 1: Form ── */}
            {step === "form" && (
              <form onSubmit={handleSendOtp} className="space-y-5">
                {/* Nama */}
                <div>
                  <label htmlFor="reg-name" className="block text-[#a1a1aa] text-xs uppercase tracking-widest mb-2">Nama Lengkap</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] text-sm" />
                    <input id="reg-name" type="text" required minLength={2} value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className="w-full bg-[#0a0f0a] border border-[#27272a] pl-10 pr-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#52525b] focus:border-[#00ff88]/50 focus:outline-none transition-colors" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="reg-email" className="block text-[#a1a1aa] text-xs uppercase tracking-widest mb-2">Email Gmail</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] text-sm" />
                    <input id="reg-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="namakamu@gmail.com" className="w-full bg-[#0a0f0a] border border-[#27272a] pl-10 pr-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#52525b] focus:border-[#00ff88]/50 focus:outline-none transition-colors" />
                  </div>
                  {email && !email.toLowerCase().endsWith("@gmail.com") && (
                    <p className="text-xs text-yellow-400 mt-1">⚠ Harus menggunakan @gmail.com</p>
                  )}
                </div>

                {/* Turnstile Widget */}
                <div className="flex justify-center">
                  <div ref={turnstileRef} />
                  {!turnstileReady && (
                    <p className="text-[#52525b] text-xs font-mono animate-pulse">Memuat verifikasi keamanan...</p>
                  )}
                </div>

                <button id="reg-send-otp" type="submit" disabled={loading || !turnstileToken} className="w-full bg-[#00ff88] text-[#0a0f0a] py-3 font-bold text-sm tracking-wide hover:bg-[#f5f5f5] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {loading ? (<><span className="w-4 h-4 border-2 border-[#0a0f0a]/30 border-t-[#0a0f0a] rounded-full animate-spin" />Mengirim OTP...</>) : (<>Kirim OTP <FiArrowRight /></>)}
                </button>

                <p className="text-center text-[#a1a1aa] text-sm">
                  Sudah punya akun? <Link href="/login" className="text-[#00ff88] hover:underline">Masuk</Link>
                </p>
              </form>
            )}

            {/* ── Step 2: OTP ── */}
            {step === "otp" && (
              <form onSubmit={handleVerify} className="space-y-6">
                {/* Info chip */}
                <div className="bg-[#0a0f0a] border border-[#00ff88]/20 p-3 text-xs font-mono text-[#a1a1aa]">
                  <span className="text-[#00ff88]">$</span> otp sent to <span className="text-[#f5f5f5]">{email}</span>
                </div>

                {/* 6-digit OTP boxes */}
                <div>
                  <label className="block text-[#a1a1aa] text-xs uppercase tracking-widest mb-4 text-center">Masukkan Kode OTP</label>
                  <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className={`w-11 h-14 text-center text-2xl font-bold bg-[#0a0f0a] border transition-all duration-200 focus:outline-none ${digit ? "border-[#00ff88]/60 text-[#00ff88]" : "border-[#27272a] text-[#f5f5f5]"} focus:border-[#00ff88]`}
                      />
                    ))}
                  </div>
                  <p className="text-center text-[#52525b] text-xs mt-3 font-mono">
                    OTP berlaku 10 menit sejak dikirim
                  </p>
                </div>

                {/* Verify button */}
                <button id="reg-verify-otp" type="submit" disabled={verifying || otp.join("").length < 6} className="w-full bg-[#00ff88] text-[#0a0f0a] py-3 font-bold text-sm tracking-wide hover:bg-[#f5f5f5] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {verifying ? (<><span className="w-4 h-4 border-2 border-[#0a0f0a]/30 border-t-[#0a0f0a] rounded-full animate-spin" />Memverifikasi...</>) : "Verifikasi & Daftar →"}
                </button>

                {/* Resend + back */}
                <div className="flex items-center justify-between text-xs">
                  <button type="button" onClick={() => { setStep("form"); setOtp(["", "", "", "", "", ""]); }} className="text-[#a1a1aa] hover:text-[#f5f5f5] transition-colors">
                    ← Ganti email
                  </button>
                  <button type="button" onClick={handleResend} disabled={countdown > 0 || loading} className="flex items-center gap-1 text-[#a1a1aa] hover:text-[#00ff88] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <FiRefreshCw className={loading ? "animate-spin" : ""} />
                    {countdown > 0 ? `Kirim ulang (${countdown}s)` : "Kirim ulang OTP"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
