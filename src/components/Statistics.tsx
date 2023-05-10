import Chart from 'chart.js/auto'
import { useEffect, useRef } from 'react'

type PropsType = {
  className?: string
}

export const Statistics = ({ className }: PropsType): JSX.Element => {
  const graphCanvas = useRef(null)
  const graphInstance = useRef<Chart<'pie', number[], string> | null>(null)

  useEffect(() => {
    if (!graphCanvas.current) return

    graphInstance.current = new Chart(graphCanvas.current, {
      type: 'pie',
      data: {
        labels: ['Продукт 1', 'Продукт 2'],
        datasets: [
          {
            label: 'Фабрика А',
            data: [100, 200],
            backgroundColor: ['green', 'orange'],
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
        <div className="wfu m-auto max-w-md">
          <canvas ref={graphCanvas} />
        </div>
      </div>
    </section>
  )
}
