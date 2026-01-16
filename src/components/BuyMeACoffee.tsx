import { useState } from 'react'
import { Coffee, Heart, Sparkles, X } from 'lucide-react'

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function BuyMeACoffee() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState(10)
  const [customAmount, setCustomAmount] = useState('')
  const [showThankYou, setShowThankYou] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || ''

  const handlePaystackPayment = () => {
    const finalEmail = email.trim() || 'anonymous@buildrr.com'
    const finalAmount = amount > 0 ? amount : 10

    setIsProcessing(true);

    const paystack = new window.PaystackPop();
    paystack.newTransaction({
      key: publicKey,
      email: finalEmail,
      amount: finalAmount * 100, 
      currency: 'GHS',
      onSuccess: () => {
        setIsProcessing(false);
        handleSuccess();
      },
      onCancel: () => {
        setIsProcessing(false);
      },
    });
  }

  const handleSuccess = () => {
    setShowThankYou(true)
    setTimeout(() => {
      setIsOpen(false)
      setShowThankYou(false)
      setEmail('')
      setAmount(10)
      setCustomAmount('')
    }, 4000)
  }

  const predefinedAmounts = [
    { label: 'Small', amount: 10 },
    { label: 'Medium', amount: 30 },
    { label: 'Large', amount: 50 },
  ]

  return (
    <>
      {/* Sleek Professional Floating Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] group flex items-center gap-3 p-1.5 pr-6 bg-black text-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 active:scale-95 border border-white/10"
      >
        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-zinc-700 transition-colors shadow-inner">
          <Coffee size={18} className="text-yellow-400" />
        </div>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-300 transition-colors">Support</span>
          <span className="font-bold text-xs tracking-tight">Buy us a Coffee</span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => !isProcessing && setIsOpen(false)}
          />
          
          <div className="bg-white rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.25)] max-w-md w-full overflow-hidden relative z-10 border border-zinc-100 animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 flex flex-col max-h-[90vh]">
            {/* Header / Close */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-100 shadow-sm">
                   <Coffee size={20} className="text-zinc-400" />
                </div>
                <h2 className="text-lg font-bold text-zinc-900 tracking-tight">Support Builderr</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                disabled={isProcessing}
                className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-all disabled:opacity-0"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="px-8 py-8">
                {showThankYou ? (
                  <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                      <Heart size={32} fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-2 tracking-tight">You're Amazing!</h3>
                    <p className="text-zinc-500 max-w-[240px] mx-auto text-sm leading-relaxed">Your kindness fuels our creativity and helps us keep building.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Amount Grid */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] pl-1">Select Tier</label>
                      <div className="grid grid-cols-3 gap-3">
                        {predefinedAmounts.map((item) => (
                          <button
                            key={item.amount}
                            type="button"
                            onClick={() => {
                              setAmount(item.amount)
                              setCustomAmount('')
                            }}
                            className={`py-4 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-1 ${
                              amount === item.amount && !customAmount
                                ? 'border-black bg-black text-white shadow-lg shadow-black/20'
                                : 'border-zinc-100 bg-zinc-50/50 hover:border-zinc-200 hover:bg-zinc-100/50 text-zinc-600'
                            }`}
                          >
                            <span className="text-[9px] font-bold uppercase tracking-widest opacity-60 leading-none">{item.label}</span>
                            <span className="text-lg font-black tabular-nums">₵{item.amount}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Inputs Section */}
                    <div className="space-y-4 pt-2">
                      <div className="relative group">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-zinc-400 text-sm">₵</span>
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value)
                            setAmount(parseFloat(e.target.value) || 0)
                          }}
                          placeholder="Other amount..."
                          className="w-full pl-9 pr-6 py-4 bg-zinc-50/50 border border-zinc-100 focus:border-black focus:bg-white rounded-2xl outline-none transition-all font-bold text-zinc-900 placeholder:font-medium placeholder:text-zinc-300"
                        />
                      </div>
                      
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address (optional)"
                        className="w-full px-6 py-4 bg-zinc-50/50 border border-zinc-100 focus:border-black focus:bg-white rounded-2xl outline-none transition-all font-medium text-zinc-800"
                      />
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={handlePaystackPayment}
                        disabled={amount <= 0 || isProcessing}
                        className="w-full py-5 bg-black text-white rounded-3xl font-bold text-lg shadow-xl hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-3 overflow-hidden relative"
                      >
                        {isProcessing ? (
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Sparkles size={18} className="text-yellow-400" />
                            <span className="tabular-nums uppercase tracking-widest text-sm">Support with ₵{amount}</span>
                          </>
                        )}
                      </button>
                      
                      <p className="mt-6 text-[10px] text-zinc-400 text-center leading-relaxed font-bold uppercase tracking-widest opacity-60">
                        Thank you for helping us keep Buildrr free.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.1);
        }
      `}} />
    </>
  )
}