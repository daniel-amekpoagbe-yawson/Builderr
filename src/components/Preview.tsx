import { ExternalLink, Filter } from 'lucide-react'
import { useState } from 'react'
import { ProjectName } from '@/constant'

const portfolioExamples = [
  {
    id: 1,
    title: 'Frontend Developer Portfolio',
    creator: 'Alex Morgan',
    role: 'React Developer',
    category: 'Developer',
    description: 'Clean, modern portfolio with floating navbar and project showcase',
    sections: 5,
    theme: 'Modern',
    preview: 'bg-gradient-to-br from-gray-100 to-gray-200',
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
            <Filter className="w-5 h-5 text-gray-400" />
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
              <div className={`h-48 ${example.preview} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-center z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-700">
                      {example.title.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    {example.theme} Theme
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{example.title}</h3>
                    <p className="text-sm text-gray-600">{example.creator}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{example.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span>{example.sections} sections</span>
                  <span>•</span>
                  <span>{example.theme}</span>
                </div>

                {/* View Button */}
                <button className="w-full flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-900 transition-colors font-medium text-sm group/btn">
                  View Live
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
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
