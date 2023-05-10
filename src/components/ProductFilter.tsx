type PropsType = {
  className?: string
}

export const ProductFilter = ({ className }: PropsType): JSX.Element => {
  return (
    <section className={className}>
      <div className="container mx-auto px-6">
        <div className="flex rounded-lg border-2 border-gray-600 p-3">
          <div className="ml-auto flex">
            <div className="text-lg">Фильтр по типу продукции</div>
            <select
              className="ml-3 rounded-sm border border-gray-400 outline-none"
              name="product-type"
              id="product-type"
              defaultValue="all"
            >
              <option value="all">Вся продукция</option>
              <option value="product1">Продукт 1</option>
              <option value="product2">Продукт 2</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}
