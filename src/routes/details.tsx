import { useParams } from 'react-router-dom'

import { Statistics } from '@/components'

export default function Details() {
  const { factoryId, monthNumber } = useParams()

  return (
    <div className="py-12">
      <div className="container mx-auto mb-6 px-6">
        Details Page - {factoryId}, {monthNumber}
        <div className="text-center text-4xl font-bold">
          Статистика по продукции фабрики Б за Сен
        </div>
        <br />
      </div>
      <div className="mt-16">
        <Statistics />
      </div>
    </div>
  )
}
