
const SpinnerMini = () => {
  return (
        <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
                <p className="text-gray-500">Loading portfolio.....</p>
              </div>
  </div>
  )
}

export default SpinnerMini