"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { useToast } from "@/components/ui/ToastProvider";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.error ?? "Autentikasi gagal.");
        return;
      }
      
      toast.success(`Selamat datang, ${data.user?.name}! 👋`);
      setTimeout(() => { 
        router.push("/dashboard"); 
        router.refresh(); 
      }, 800);
    } catch (err) {
      toast.error("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In gagal. Silakan coba lagi.");
  };

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
                <span className="text-[#00ff88] text-xs tracking-widest uppercase">// auth</span>
              </div>
              <h1 className="text-3xl font-bold text-[#f5f5f5] mb-2">Selamat Datang</h1>
              <p className="text-[#a1a1aa] text-sm">Masuk atau Daftar dengan akun Google Anda</p>
            </div>

            {/* Card */}
            <div className="bg-[#1a1f1a] border border-[#27272a] p-8 relative overflow-hidden hover:border-[#00ff88]/20 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent" />

              {!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 text-red-200 text-xs rounded">
                  ⚠ NEXT_PUBLIC_GOOGLE_CLIENT_ID belum diatur di .env.local
                </div>
              )}

              <div className="flex flex-col items-center justify-center space-y-4">
                {loading ? (
                  <div className="flex items-center gap-2 text-[#00ff88]">
                    <span className="w-5 h-5 border-2 border-[#00ff88]/30 border-t-[#00ff88] rounded-full animate-spin" />
                    <span className="text-sm font-bold">Memproses...</span>
                  </div>
                ) : (
                  <div className="w-full flex justify-center">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      theme="filled_black"
                      size="large"
                      text="continue_with"
                      shape="rectangular"
                    />
                  </div>
                )}
                
                <p className="text-center text-[#a1a1aa] text-sm mt-4">
                  Dengan masuk, Anda menyetujui persyaratan kami.
                </p>
              </div>

              {/* Terminal hint */}
              <div className="mt-8 p-3 bg-[#0a0f0a] border border-[#27272a] font-mono text-xs text-[#a1a1aa]">
                <span className="text-[#00ff88]">$</span> dkl auth <span className="text-[#52525b]">--method google</span>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}
