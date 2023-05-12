import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chart } from 'chart.js'

import { IGraphData } from '@/types'

type PropsType = {
  className?: string
  data: IGraphData[]
}

export const Graph = ({ className, data }: PropsType): JSX.Element => {
  const graphCanvas = useRef(null)
  const graphInstance = useRef<Chart<'bar', number[], string> | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (!graphCanvas.current) return

    graphInstance.current = new Chart(graphCanvas.current, {
      type: 'bar',
      data: {
        labels: [
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
        ],
        datasets: data,
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
          },
          datalabels: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
        onClick: (_, elements) => {
          if (elements.length) {
            const { datasetIndex: factoryId, index: monthNumber } = elements[0]
            navigate(`/details/${factoryId + 1}/${monthNumber + 1}/`)
          }
        },
      },
    })

    return () => {
      graphInstance.current?.destroy()
    }
  }, [data])

  return (
    <>
      {data && (
        <section className={className}>
          <div className="container mx-auto px-6">
            <div className="rounded-lg border-2 border-gray-600 p-3">
              <div className="flex aspect-[16/8] justify-center">
                <canvas ref={graphCanvas} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
