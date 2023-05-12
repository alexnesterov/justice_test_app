import { useParams } from 'react-router-dom'

import { Statistics } from '@/components'
import { useGetProductsQuery } from '@/store/slices/apiSlice'
import { IDetailsParams, IGraphDetail } from '@/types'

const FACTORY: {
  [key: number]: {
    label: string
    shortLabel: string
  }
} = {
  1: {
    label: 'Фабрика А',
    shortLabel: 'A',
  },
  2: {
    label: 'Фабрика Б',
    shortLabel: 'Б',
  },
}

const MONTHS = [
  'Янв',
  'Фев',
  'Мар',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сен',
  'Окт',
  'Ноя',
  'Дек',
]

export default function Details() {
  const { data } = useGetProductsQuery('')
  const { factoryId, monthNumber } = useParams<IDetailsParams>()

  const computedData = Object.values(
    (data || []).reduce((accData: { [key: string]: IGraphDetail }, item) => {
      const { factory_id, date, product1, product2 } = item
      const monthIndex = Number(date?.split('/')[1])

      if (
        factory_id === Number(factoryId) &&
        monthIndex === Number(monthNumber)
      ) {
        if (!accData[factory_id]) {
          accData[factory_id] = {
            label: FACTORY[factory_id].label,
            backgroundColor: ['green', 'orange'],
            data: new Array(2).fill(0),
          }
        }

        accData[factory_id].data[0] += Math.floor(Number(product1) / 1000)
        accData[factory_id].data[1] += Math.floor(Number(product2) / 1000)
      }

      return accData
    }, {})
  )

  return (
    <>
      {data && (
        <div className="py-12">
          <div className="container mx-auto mb-6 px-6">
            <div className="text-center text-4xl font-bold">
              Статистика по продукции фабрики{' '}
              {FACTORY[Number(factoryId)].shortLabel} за{' '}
              {MONTHS[Number(monthNumber) - 1]}
            </div>
            <br />
          </div>
          <div className="mt-16">
            <Statistics data={computedData} />
          </div>
        </div>
      )}
    </>
  )
}
