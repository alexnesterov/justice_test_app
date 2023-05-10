import { Graph, ProductFilter } from '@/components'

export default function Root() {
  return (
    <div className="py-12">
      <ProductFilter />
      <Graph className="mt-6" />
    </div>
  )
}
