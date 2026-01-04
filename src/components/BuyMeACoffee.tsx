// // components/BuyMeACoffee.tsx
// import { useState } from 'react'
// import { usePaystackPayment } from 'react-paystack'
// import { Coffee, X, Heart } from 'lucide-react'

// interface PaystackConfig {
//   reference: string
//   email: string
//   amount: number
//   publicKey: string
// }

// export default function BuyMeACoffee() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [email, setEmail] = useState('')
//   const [amount, setAmount] = useState(500) // Default GHS 5 (500 pesewas)
//   const [customAmount, setCustomAmount] = useState('')
//   const [showThankYou, setShowThankYou] = useState(false)

//   const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || ''

//   const config: PaystackConfig = {
//     reference: `buildrr_${new Date().getTime()}`,
//     email: email,
//     amount: amount * 100, // Paystack expects amount in pesewas (GHS * 100)
//     publicKey: publicKey,
//   }

//   const onSuccess = () => {
//     setShowThankYou(true)
//     setTimeout(() => {
//       setIsOpen(false)
//       setShowThankYou(false)
//       setEmail('')
//       setAmount(500)
//       setCustomAmount('')
//     }, 3000)
//   }

//   const onClose = () => {
//     // Payment closed without completing
//   }

//   const initializePayment = usePaystackPayment(config)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (!email || amount <= 0) {
//       alert('Please enter your email and amount')
//       return
//     }

//     initializePayment({ onSuccess, onClose })
//   }

//   const predefinedAmounts = [
//     { label: '1 Coffee', amount: 500, emoji: '☕' },
//     { label: '3 Coffees', amount: 1500, emoji: '☕☕☕' },
//     { label: '5 Coffees', amount: 2500, emoji: '☕☕☕☕☕' },
//   ]

//   return (
//     <>
//       {/* Floating Button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 px-6 py-4 bg-black text-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300 font-bold"
//       >
//         <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
//           <Coffee className="group-hover:rotate-12 transition-transform text-white" size={18} />
//         </div>
//         <span className="hidden sm:inline tracking-tight">Support Buildrr</span>
//       </button>

//       {/* Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
//           <div 
//             className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
//             onClick={() => setIsOpen(false)}
//           />
//           <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] max-w-lg w-full overflow-hidden animate-scale-in relative z-10 flex flex-col max-h-[90vh]">
//             {/* Header */}
//             <div className="px-8 pt-8 pb-4 flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
//                   <Coffee size={24} className="text-gray-900" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Support Buildrr</h2>
//                   <p className="text-gray-500 text-sm font-medium">Enjoying the builder? Buy us a coffee! ☕</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
//               {showThankYou ? (
//                 /* Thank You Message */
//                 <div className="py-12 text-center animate-fade-in">
//                   <div className="w-24 h-24 bg-green-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
//                     <Heart className="text-green-500" size={48} fill="currentColor" />
//                   </div>
//                   <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
//                     You're the best! 🎉
//                   </h3>
//                   <p className="text-gray-600 text-lg leading-relaxed">
//                     Your contribution directly helps us keep Buildrr running and improving. We really appreciate your support!
//                   </p>
//                 </div>
//               ) : (
//                 /* Payment Form */
//                 <form onSubmit={handleSubmit} className="space-y-8 mt-4">
//                   {/* Predefined Amounts */}
//                   <div>
//                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
//                       Select Amount
//                     </label>
//                     <div className="grid grid-cols-3 gap-4">
//                       {predefinedAmounts.map((item) => (
//                         <button
//                           key={item.amount}
//                           type="button"
//                           onClick={() => {
//                             setAmount(item.amount)
//                             setCustomAmount('')
//                           }}
//                           className={`group relative p-5 rounded-[2rem] border-2 transition-all duration-300 ${
//                             amount === item.amount && !customAmount
//                               ? 'border-black bg-gray-50 scale-102 shadow-md'
//                               : 'border-gray-100 hover:border-gray-300 bg-white hover:bg-gray-50'
//                           }`}
//                         >
//                           <div className="text-3xl mb-2 transition-transform group-hover:scale-110">{item.emoji}</div>
//                           <div className="text-sm font-bold text-gray-900 mb-1">
//                             {item.label}
//                           </div>
//                           <div className="text-xs font-bold text-gray-500">
//                             GHS {(item.amount / 100).toFixed(2)}
//                           </div>
//                           {amount === item.amount && !customAmount && (
//                             <div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full" />
//                           )}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Custom Amount */}
//                   <div className="space-y-4">
//                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
//                       Custom Support
//                     </label>
//                     <div className="relative group">
//                       <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
//                         GHS
//                       </span>
//                       <input
//                         type="number"
//                         value={customAmount}
//                         onChange={(e) => {
//                           setCustomAmount(e.target.value)
//                           setAmount(parseFloat(e.target.value) * 100 || 0)
//                         }}
//                         placeholder="10.00"
//                         step="0.01"
//                         min="1"
//                         className="w-full pl-16 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl outline-none transition-all font-bold text-lg text-gray-900"
//                       />
//                     </div>
//                   </div>

//                   {/* Email */}
//                   <div className="space-y-4">
//                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
//                       Your Contact Info
//                     </label>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="alex@example.com"
//                       required
//                       className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900"
//                     />
//                   </div>

//                   {/* Submit Button */}
//                   <div className="pt-2">
//                     <button
//                       type="submit"
//                       disabled={!email || amount <= 0}
//                       className="w-full py-5 bg-black text-white rounded-[2rem] font-bold text-lg hover:bg-gray-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-xl active:scale-[0.98]"
//                     >
//                       Suppport with GHS {(amount / 100).toFixed(2)}
//                     </button>
//                     <p className="text-[10px] text-center font-bold text-gray-400 uppercase tracking-widest mt-6">
//                       Payments SECURED BY PAYSTACK
//                     </p>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes scale-in {
//           from { opacity: 0; transform: scale(0.95) translateY(10px); }
//           to { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         @keyframes fade-in {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         .animate-scale-in {
//           animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
//         }
//         .animate-fade-in {
//           animation: fade-in 0.2s ease-out;
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #f1f1f1;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #e1e1e1;
//         }
//       `}</style>
//     </>

//   )
// }