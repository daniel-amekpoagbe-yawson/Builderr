import {
  ArrowRight,
  ChevronDown,
  Download,
  Globe,
  Infinity as InfinityIcon,
  LayoutGrid,
  Link as LinkIcon,
  Palette,
  Rocket,
  Shield,
  Smartphone,
  Star,
  UserPlus,
  Zap,
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import Preview from './Preview'
import Footer from './Footer'
import Testimonials from './Testimonials'

export default function App() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - BOLD */}
      <section
        id="home"
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-50 via-white to-gray-100"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Floating Badges */}
        <div className="absolute top-20 left-10 hidden lg:block animate-bounce-slow">
          <div className="bg-black text-white px-2 py-2 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm bg-opacity-90">
            ⚡ No Code Required
          </div>
        </div>
        <div className="absolute top-32 right-20 hidden lg:block animate-bounce-slow-delayed">
          <div className="bg-black text-white px-2 py-2 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm bg-opacity-90">
            🚀 10 Min Setup
          </div>
        </div>
       

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
          <div className="text-center max-w-5xl mx-auto">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm hover:shadow-sm transition-shadow">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-linear-to-br from-gray-300 to-gray-400 border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">
                Join <span className="font-bold text-black">100+</span>{' '}
                developers
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Build a Portfolio That{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Gets You Hired</span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg  text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create stunning developer portfolios in minutes—no coding, no
              hassle. Choose from professional layouts, customize everything,
              and go live instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={() => navigate({ to: '/auth/Register' })}
                className="group px-4 py-3 bg-black text-white text-base rounded-xl hover:bg-gray-900 transition-all font-semibold shadow-xl hover:shadow-2xl hover:scale-102 flex items-center justify-center gap-2"
              >
                Start Creating
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate({ to: '/auth/Login' })}
                className="px-4  py-3 bg-white text-gray-900 text-base rounded-xl border border-black hover:bg-gray-50 transition-all font-semibold"
              >
                Sign In
              </button>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Zap className="w-5 h-5 text-black" />
                <span className="font-semibold">10 min</span> setup
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Palette className="w-5 h-5 text-black" />
                <span className="font-semibold">12+</span> layouts
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Rocket className="w-5 h-5 text-black" />
                <span className="font-semibold">Instant</span> deploy
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <InfinityIcon className="w-5 h-5 text-black" />
                <span className="font-semibold">Free</span> forever
              </div>
            </div>

            {/* Trust Indicators */}
            <p className="mt-8 text-sm text-gray-500">
              No credit card • No coding • No kidding
            </p>
          </div>
        </div>

     
      </section>

      {/* Social Proof Section */}
      <section className="py-10 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-black mb-2">
                15+
              </div>
              <div className="text-gray-600 text-xs">Portfolios Created</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-black mb-2">
                98%
              </div>
              <div className="text-gray-600 text-xs">Deployment Success</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-black mb-2">
                8 min
              </div>
              <div className="text-gray-600 text-xs">Avg. Time to Deploy</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-black mb-2">
                4.9/5
              </div>
              <div className="text-gray-600 text-xs">User Rating</div>
            </div>
          </div>

          {/* Testimonials */}
         <Testimonials/>
          {/* Company Logos (Aspirational) */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-6">Our users work at:</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {['Google', 'Meta', 'Stripe', 'Netflix', 'Airbnb'].map(
                (company) => (
                  <div
                    key={company}
                    className="text-2xl font-bold text-gray-400"
                  >
                    {company}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed for developers who want results, not
              complexity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast Setup',
                description:
                  'From signup to deployed portfolio in under 10 minutes. No technical knowledge required.',
              },
              {
                icon: Palette,
                title: '12+ Section Variants',
                description:
                  'Hero, Projects, Skills, About, Experience, Contact. Multiple layouts for each section.',
              },
              {
                icon: Globe,
                title: 'Light & Dark Themes',
                description:
                  'Professional themes that work everywhere. Customize colors and fonts to match your brand.',
              },
              {
                icon: Smartphone,
                title: 'Fully Responsive',
                description:
                  'Your portfolio looks perfect on every device. Mobile, tablet, and desktop optimized.',
              },
              {
                icon: LinkIcon,
                title: 'Custom Public URLs',
                description:
                  'Get a clean, shareable link instantly: buildrr.com/yourname. Share it anywhere.',
              },
              {
                icon: Download,
                title: 'Export HTML',
                description:
                  'Own your code. Download your portfolio as a standalone HTML file anytime.',
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description:
                  'Your data is encrypted and secure. Only you can edit your portfolios.',
              },
              {
                icon: InfinityIcon,
                title: 'Unlimited Portfolios',
                description:
                  'Create as many portfolios as you want. Experiment freely, no limits.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-black hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to your professional portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gray-200 -z-10" />

            {[
              {
                step: '01',
                icon: UserPlus,
                title: 'Sign Up Free',
                description:
                  'Create your account in 30 seconds. No credit card needed. Start building immediately.',
              },
              {
                step: '02',
                icon: LayoutGrid,
                title: 'Choose & Customize',
                description:
                  'Pick section layouts, add your content, and customize the design. Real-time preview as you build.',
              },
              {
                step: '03',
                icon: Rocket,
                title: 'Deploy & Share',
                description:
                  'Click "Publish" and get your public URL instantly. Share with recruiters and on LinkedIn.',
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-black transition-all text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-full text-white text-2xl font-bold mb-6">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Examples Section - Enhanced */}
      <section
        id="examples"
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <Preview />
      </section>

      {/* Features Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Why Choose Buildrr?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compare with other solutions and see why developers choose us
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="text-left p-4 font-bold text-gray-900">
                    Feature
                  </th>
                  <th className="text-center p-4 font-bold text-black bg-gray-50">
                    Buildrr
                  </th>
                  <th className="text-center p-4 font-bold text-gray-700">
                    WordPress
                  </th>
                  <th className="text-center p-4 font-bold text-gray-700">
                    Custom Code
                  </th>
                  <th className="text-center p-4 font-bold text-gray-700">
                    Wix
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: 'Setup Time',
                    buildrr: '10 min',
                    others: ['2+ hours', 'Days/weeks', '1 hour'],
                  },
                  {
                    feature: 'Coding Required',
                    buildrr: '❌',
                    others: ['❌', '✅', '❌'],
                  },
                  {
                    feature: 'Developer-Focused',
                    buildrr: '✅',
                    others: ['❌', '✅', '❌'],
                  },
                  {
                    feature: 'Export HTML',
                    buildrr: '✅',
                    others: ['❌', '✅', '❌'],
                  },
                  {
                    feature: 'Free Forever',
                    buildrr: '✅',
                    others: ['❌', '✅', '❌'],
                  },
                  {
                    feature: 'Section Variants',
                    buildrr: '✅',
                    others: ['❌', '🤷', '⚠️'],
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-4 font-semibold text-gray-900">
                      {row.feature}
                    </td>
                    <td className="p-4 text-center font-bold text-black bg-gray-50">
                      {row.buildrr}
                    </td>
                    {row.others.map((other, i) => (
                      <td key={i} className="p-4 text-center text-gray-600">
                        {other}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Buildrr
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Is Buildrr really free?',
                a: 'Yes! Create unlimited portfolios, deploy instantly, and export HTML—all free. No hidden charges, no credit card required.',
              },
              {
                q: 'Can I use my own domain?',
                a: 'Currently, you get a buildrr.com subdomain. Custom domains are coming soon! You can also export HTML and host anywhere.',
              },
              {
                q: 'Do I need coding skills?',
                a: 'Not at all! Buildrr is designed for everyone. Just fill in your content and choose layouts—we handle the rest.',
              },
              {
                q: 'Can I edit my portfolio after publishing?',
                a: 'Absolutely! Edit anytime, and changes go live instantly. Your public URL stays the same.',
              },
              {
                q: 'What if I want to add a blog or more features?',
                a: 'V1 focuses on portfolio essentials. Advanced features like blogs are on our roadmap. For now, you can export HTML and customize it yourself.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-black transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-black to-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Your Next Opportunity is One Portfolio Away
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join 10,000+ developers who landed their dream roles with portfolios
            built on Buildrr
          </p>

          <button
            onClick={() => navigate({ to: '/auth/Register' })}
            className="group px-10 py-5 bg-white text-black text-lg rounded-xl hover:bg-gray-100 transition-all font-bold shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center justify-center gap-2 mx-auto mb-6"
          >
            Create My Portfolio Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-gray-400 mb-8">
            No credit card • No coding • No kidding
          </p>

          {/* Testimonial Quote */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
            <div className="flex items-center gap-1 mb-3 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-white text-white" />
              ))}
            </div>
            <p className="text-lg italic text-gray-200 mb-4">
              "I got 3 interview requests within a week of sharing my Buildrr
              portfolio!"
            </p>
            <p className="text-sm text-gray-400">
              — Sarah Chen, Frontend Developer at Stripe
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
