"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMail, FiArrowRight, FiRefreshCw, FiCheckCircle } from "react-icons/fi";
import { useToast } from "@/components/ui/ToastProvider";

type Step = "email" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();

  /* ── State ──────────────────────────────────────────────── */
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* ── Countdown ──────────────────────────────────────────── */
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

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
    if (!email.toLowerCase().endsWith("@gmail.com")) {
      toast.error("Email harus menggunakan akun Gmail (@gmail.com).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "login" }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Gagal mengirim OTP.");
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
        body: JSON.stringify({ email, otp: code, type: "login" }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Verifikasi gagal.");
        if (data.error?.includes("salah")) setOtp(["", "", "", "", "", ""]);
        return;
      }
      toast.success(`Selamat datang kembali, ${data.user?.fullName}! 👋`);
      setTimeout(() => { router.push("/dashboard"); router.refresh(); }, 800);
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
        body: JSON.stringify({ email, type: "login" }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Gagal kirim ulang OTP."); return; }
      toast.info("OTP baru telah dikirim.");
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
              <span className="text-[#00ff88] text-xs tracking-widest uppercase">// member login</span>
            </div>
            <h1 className="text-3xl font-bold text-[#f5f5f5] mb-2">Selamat Datang Kembali</h1>
            <p className="text-[#a1a1aa] text-sm">
              {step === "email" ? "Masuk dengan Gmail — tanpa password" : `Cek inbox ${email}`}
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {(["email", "otp"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 flex items-center justify-center text-xs font-bold border transition-colors ${step === s ? "bg-[#00ff88] text-[#0a0f0a] border-[#00ff88]" : step === "otp" && i === 0 ? "bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/40" : "bg-transparent text-[#52525b] border-[#27272a]"}`}>
                  {step === "otp" && i === 0 ? <FiCheckCircle className="text-xs" /> : i + 1}
                </div>
                <span className={`text-xs ${step === s ? "text-[#00ff88]" : "text-[#52525b]"}`}>
                  {s === "email" ? "Email" : "Verifikasi OTP"}
                </span>
                {i === 0 && <div className={`flex-1 h-px ${step === "otp" ? "bg-[#00ff88]/40" : "bg-[#27272a]"}`} />}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="bg-[#1a1f1a] border border-[#27272a] p-8 relative overflow-hidden hover:border-[#00ff88]/20 transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent" />

            {/* ── Step 1: Email ── */}
            {step === "email" && (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label htmlFor="login-email" className="block text-[#a1a1aa] text-xs uppercase tracking-widest mb-2">Email Gmail</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] text-sm" />
                    <input id="login-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="namakamu@gmail.com" className="w-full bg-[#0a0f0a] border border-[#27272a] pl-10 pr-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#52525b] focus:border-[#00ff88]/50 focus:outline-none transition-colors" />
                  </div>
                  {email && !email.toLowerCase().endsWith("@gmail.com") && (
                    <p className="text-xs text-yellow-400 mt-1">⚠ Harus menggunakan @gmail.com</p>
                  )}
                </div>

                <button id="login-send-otp" type="submit" disabled={loading} className="w-full bg-[#00ff88] text-[#0a0f0a] py-3 font-bold text-sm tracking-wide hover:bg-[#f5f5f5] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {loading ? (<><span className="w-4 h-4 border-2 border-[#0a0f0a]/30 border-t-[#0a0f0a] rounded-full animate-spin" />Mengirim OTP...</>) : (<>Kirim OTP <FiArrowRight /></>)}
                </button>

                <p className="text-center text-[#a1a1aa] text-sm">
                  Belum punya akun? <Link href="/register" className="text-[#00ff88] hover:underline">Daftar sekarang</Link>
                </p>
              </form>
            )}

            {/* ── Step 2: OTP ── */}
            {step === "otp" && (
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="bg-[#0a0f0a] border border-[#00ff88]/20 p-3 text-xs font-mono text-[#a1a1aa]">
                  <span className="text-[#00ff88]">$</span> otp sent to <span className="text-[#f5f5f5]">{email}</span>
                </div>

                {/* 6 OTP boxes */}
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
                  <p className="text-center text-[#52525b] text-xs mt-3 font-mono">OTP berlaku 10 menit</p>
                </div>

                <button id="login-verify-otp" type="submit" disabled={verifying || otp.join("").length < 6} className="w-full bg-[#00ff88] text-[#0a0f0a] py-3 font-bold text-sm tracking-wide hover:bg-[#f5f5f5] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {verifying ? (<><span className="w-4 h-4 border-2 border-[#0a0f0a]/30 border-t-[#0a0f0a] rounded-full animate-spin" />Memverifikasi...</>) : "Verifikasi & Masuk →"}
                </button>

                <div className="flex items-center justify-between text-xs">
                  <button type="button" onClick={() => { setStep("email"); setOtp(["", "", "", "", "", ""]); }} className="text-[#a1a1aa] hover:text-[#f5f5f5] transition-colors">
                    ← Ganti email
                  </button>
                  <button type="button" onClick={handleResend} disabled={countdown > 0 || loading} className="flex items-center gap-1 text-[#a1a1aa] hover:text-[#00ff88] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <FiRefreshCw className={loading ? "animate-spin" : ""} />
                    {countdown > 0 ? `Kirim ulang (${countdown}s)` : "Kirim ulang OTP"}
                  </button>
                </div>
              </form>
            )}

            {/* Terminal hint */}
            <div className="mt-6 p-3 bg-[#0a0f0a] border border-[#27272a] font-mono text-xs text-[#a1a1aa]">
              <span className="text-[#00ff88]">$</span> dkl auth login <span className="text-[#52525b]">--method otp-email</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
