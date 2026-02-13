import { ProjectName } from '@/constant'

const Footer = () => {
  return (
    <footer className="bg-stone-800 text-white py-8 border-t border-gray-700 flex flex-col items-center justify-center ">
      <div className="text-center text-sm text-gray-400">
        &copy; 2024 {ProjectName}. All rights reserved.
      </div>
      <div className="flex items-center justify-center mt-2">
        built by <a href="https://amekpoagbe.com" className="text-gray-400  hover:text-stone-300 transition-colors ml-2">Daniel Amekpoagbe</a>
      </div>
    </footer>
  )
}

export default Footer
