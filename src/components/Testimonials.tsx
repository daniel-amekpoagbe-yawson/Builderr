import { Star } from 'lucide-react'
import { ProjectName } from '@/constant'
const Testimonials = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: 'Sarah Chen',
                role: 'Photographer',
                quote:
                  `I got 3 interview requests within a week of sharing my ${ProjectName} portfolio!`,
                avatar: 'SC',
              },
              {
                name: 'Marcus Johnson',
                role: 'Full-Stack Developer',
                quote:
                  "The best portfolio builder I've used. Clean, fast, and exactly what recruiters want to see.",
                avatar: 'MJ',
              },
              {
                name: 'Emily Rodriguez',
                role: 'UI/UX Designer',
                quote:
                  'Finally, a tool that lets me showcase my work without spending days coding.',
                avatar: 'ER',
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-200/10 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

  )
}

export default Testimonials