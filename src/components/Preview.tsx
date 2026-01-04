import { ExternalLink} from 'lucide-react'
import { useState } from 'react'
import { ProjectName } from '@/constant'

const portfolioExamples = [
  {
    id: 1,
    title: 'Frontend Developer',
    creator: 'Daniel Yawson',
    role: 'React Developer',
    category: 'Developer',
    description: 'Clean, modern portfolio with floating navbar and project showcase',
    sections: 5,
    theme: 'Modern',
    preview: 'bg-gradient-to-br from-gray-100 to-gray-200',
    imageUrl: '/showcase/image-01.png',
    liveLink: 'https://www.builderr.site/daniel-amekpoagbe'
  },
  {
    id: 2,
    title: 'Full-Stack Developer',
    creator: 'Jordan Lee',
    role: 'Full-Stack Engineer',
    category: 'Developer',
    description: 'Comprehensive portfolio featuring projects, skills, and experience',
    sections: 6,
    theme: 'Dark',
    preview: 'bg-gradient-to-br from-gray-800 to-gray-900',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
    liveLink: '#'
  },
  {
    id: 3,
    title: 'UI/UX Designer Portfolio',
    creator: 'Sam Taylor',
    role: 'Product Designer',
    category: 'Designer',
    description: 'Beautiful design portfolio with gallery and case studies',
    sections: 4,
    theme: 'Minimal',
    preview: 'bg-gradient-to-br from-gray-50 to-white',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    liveLink: '#'
  },
  {
    id: 4,
    title: 'Student Portfolio',
    creator: 'Casey Kim',
    role: 'Computer Science Student',
    category: 'Student',
    description: 'Academic portfolio showcasing projects and achievements',
    sections: 5,
    theme: 'Academic',
    preview: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    liveLink: '#'
  },
]

const categories = ['All', 'Developer', 'Designer', 'Student']

const Preview = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredExamples =
    selectedCategory === 'All'
      ? portfolioExamples
      : portfolioExamples.filter((ex) => ex.category === selectedCategory)

  return (
    <section id="examples" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Built by Developers, For Everyone!
          </h2>
          <p className="text-xs sm:text-base text-gray-600 max-w-2xl mx-auto mb-8">
            See what you can build with {ProjectName}. Real portfolios from real developers.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExamples.map((example) => (
            <div
              key={example.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-black/40 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              {/* Preview Image */}
              <div className="h-48 relative overflow-hidden bg-gray-100">
                {example.imageUrl ? (
                  <img 
                    src={example.imageUrl} 
                    alt={example.title}
                    className="w-full h-full object-fit transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className={`w-full h-full ${example.preview} flex items-center justify-center`}>
                    <div className="text-center z-10">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl mx-auto mb-3 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-700">
                          {example.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/50 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                    {example.theme} Theme
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-black transition-colors">{example.title}</h3>
                    <p className="text-sm text-gray-600 font-medium">Built by {example.creator}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{example.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-6">
                  <span className="flex items-center gap-1">{example.sections} sections</span>
                  <span>•</span>
                  <span>{example.category}</span>
                </div>

                {/* View Button */}
                <a 
                  href={example.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-all font-bold text-sm group/btn shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  View Live Site
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        {/* <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Want to see your portfolio here?</p>
          <button className="text-black font-semibold hover:underline flex items-center gap-2 mx-auto">
            Create Your Portfolio
            <ExternalLink className="w-4 h-4" />
          </button>
        </div> */}
      </div>
    </section>
  )
}

export default Preview
