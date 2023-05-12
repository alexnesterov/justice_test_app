import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useEffect, useRef } from 'react'

import type { IGraphDetail } from '@/types'

Chart.register(ChartDataLabels)

type PropsType = {
  className?: string
  data: IGraphDetail[]
}

export const Statistics = ({ className, data }: PropsType): JSX.Element => {
  const graphCanvas = useRef(null)
  const graphInstance = useRef<Chart<'pie', number[], string> | null>(null)

  useEffect(() => {
    if (!graphCanvas.current) return

    graphInstance.current = new Chart(graphCanvas.current, {
      type: 'pie',
      data: {
        labels: ['Продукт 1', 'Продукт 2'],
        datasets: data,
      },
      options: {
        layout: {
          padding: 32,
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            enabled: false,
          },
          datalabels: {
            anchor: 'end',
            align: 'end',
            color: ['green', 'orange'],
            font: {
              size: 20,
            },
          },
        },
      },
    })

    return () => {
      graphInstance.current?.destroy()
    }
  }, [data])

  return (
    <section className={className}>
      <div className="container mx-auto px-6">
        <div className="wfu m-auto max-w-lg">
          <canvas ref={graphCanvas} />
        </div>
      </div>
    </section>
  )
}
