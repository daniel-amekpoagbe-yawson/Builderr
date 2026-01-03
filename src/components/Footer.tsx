import { ProjectName } from '@/constant'

const Footer = () => {
  return (
    <footer className="bg-stone-800 text-white py-8 border-t border-gray-700 ">
      <div className="text-center text-sm text-gray-400">
        &copy; 2024 {ProjectName}. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
