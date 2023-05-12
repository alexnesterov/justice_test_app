import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IProduct } from '@/types'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_ENDPOINT}`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], string>({
      query: () => 'products',
    }),
  }),
})

export const { useGetProductsQuery } = api
