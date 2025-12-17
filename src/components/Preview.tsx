
const Preview = () => {
  return (
    <section id="examples" className="py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Built by Developers, For Developers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what you can build with DevFolio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-cyan-500 transition-colors">
                <div className="h-48 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 font-medium">Portfolio Preview {i}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Developer Portfolio</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Clean, modern portfolio with floating navbar and project showcase
                  </p>
                  <button className="text-cyan-600 font-medium hover:text-cyan-700">
                    View Live →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Preview