
import { ProjectName } from "@/constant"
import {
  Check,
  X,
  AlertTriangle,
  HelpCircle,
} from "lucide-react"

const iconMap = {
  yes: <Check className="w-5 h-5 text-black/80 mx-auto" />,
  no: <X className="w-5 h-5 text-black/60 mx-auto" />,
  maybe: <HelpCircle className="w-5 h-5 text-black/80 mx-auto" />,
  warning: <AlertTriangle className="w-5 h-5 text-black/80 mx-auto" />,
}

const renderCell = (value: string) => {
  if (value in iconMap) {
    return iconMap[value as keyof typeof iconMap]
  }
  return value
}

const Tabble = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-4xl lg:text-3xl font-bold text-gray-900 mb-4">
            Why Choose {ProjectName}?
          </h2>
          <p className="text-xs sm:text-base text-gray-600 max-w-2xl mx-auto">
            Compare with other solutions and see why developers choose us
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-black/40">
                <th className="text-left p-4 font-bold text-gray-900">
                  Feature
                </th>
                <th className="text-center p-4 font-bold text-black bg-gray-50">
                  {ProjectName}
                </th>
                <th className="text-center p-4 font-bold text-gray-500">
                  WordPress
                </th>
                <th className="text-center p-4 font-bold text-gray-500">
                  Custom Code
                </th>
                <th className="text-center p-4 font-bold text-gray-500">
                  Wix
                </th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  feature: "Setup Time",
                  buildrr: "10 min",
                  others: ["3+ hours", "Days/weeks", "2+ hours"],
                },
                {
                  feature: "Coding Required",
                  buildrr: "no",
                  others: ["no", "yes", "no"],
                },
                {
                  feature: "Developer-Focused",
                  buildrr: "yes",
                  others: ["no", "yes", "no"],
                },
                {
                  feature: "Export HTML",
                  buildrr: "yes",
                  others: ["no", "yes", "no"],
                },
                {
                  feature: "Free Forever",
                  buildrr: "yes",
                  others: ["no", "yes", "no"],
                },
                {
                  feature: "Section Variants",
                  buildrr: "yes",
                  others: ["no", "maybe", "warning"],
                },
              ].map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4 font-semibold text-sm sm:text-base text-gray-900">
                    {row.feature}
                  </td>

                  <td className="p-4 text-center font-bold bg-gray-50">
                    {renderCell(row.buildrr)}
                  </td>

                  {row.others.map((other, i) => (
                    <td key={i} className="p-4 text-center">
                      {renderCell(other)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Tabble
