import Chart from 'chart.js/auto'
import { useEffect, useRef } from 'react'

type PropsType = {
  className?: string
}

export const Graph = ({ className }: PropsType): JSX.Element => {
  const graphCanvas = useRef(null)
  const graphInstance = useRef<Chart<'bar', number[], string> | null>(null)

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
        datasets: [
          {
            label: 'Фабрика А',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'red',
          },
          {
            label: 'Фабрика Б',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    })

    return () => {
      graphInstance.current?.destroy()
    }
  }, [])

  return (
    <section className={className}>
      <div className="container mx-auto px-6">
        <div className="rounded-lg border-2 border-gray-600 p-3">
          <canvas ref={graphCanvas} />
        </div>
      </div>
    </section>
  )
}
