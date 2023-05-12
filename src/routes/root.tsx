import { useEffect, useMemo } from 'react'
import localforage from 'localforage'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectFilterProductType,
  setProductType,
} from '@/store/slices/filterSlice'
import { useGetProductsQuery } from '@/store/slices/apiSlice'

import { Graph, ProductFilter } from '@/components'
import { IGraphData } from '@/types'

const FACTORY: {
  [key: number]: {
    label: string
    backgroundColor: string
  }
} = {
  1: {
    label: 'Фабрика А',
    backgroundColor: 'red',
  },
  2: {
    label: 'Фабрика Б',
    backgroundColor: 'blue',
  },
}

export default function Root() {
  const { data } = useGetProductsQuery('')
  const productType = useAppSelector(selectFilterProductType)

  const dispatch = useAppDispatch()

  const computedData = useMemo(
    () =>
      Object.values(
        (data || []).reduce(
          (
            accData: {
              [key: string]: IGraphData
            },
            item
          ) => {
            const { factory_id, date, product1, product2 } = item

            const monthNumber = Number(date?.split('/')[1]) - 1
            let amount

            switch (productType) {
              case 'product1':
                amount = Number(product1)
                break
              case 'product2':
                amount = Number(product2)
                break
              default:
                amount = Number(product1) + Number(product2)
                break
            }

            if (!accData[factory_id]) {
              accData[factory_id] = {
                label: FACTORY[factory_id].label,
                backgroundColor: FACTORY[factory_id].backgroundColor,
                data: new Array(12).fill(0),
              }
            }

            if (monthNumber >= 0) {
              accData[factory_id].data[monthNumber] += Math.floor(amount / 1000)
            }

            return accData
          },
          {}
        )
      ),
    [data, productType]
  )

  useEffect(() => {
    localforage.getItem<string>('productType').then((value) => {
      if (value) {
        dispatch(setProductType(value))
      } else {
        localforage.setItem('productType', 'all').then(() => {
          dispatch(setProductType('all'))
        })
      }
    })
  }, [dispatch])

  return (
    <div className="py-12">
      <ProductFilter />
      <Graph data={computedData} className="mt-6" />
    </div>
  )
}
