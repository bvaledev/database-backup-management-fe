'use server'

import { revalidateTag } from "next/cache"
import { z } from "zod"
import { datasourceFormSchema, DatasourceFormSchema, DatasourceSchema, datasourceSchema } from "~/app/(dashboard)/datasources/_components/datasource-schema"
import { handleError, handleZodError } from "~/lib/error-handler"
import { fetchServer } from "~/lib/fetch-server"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
const DATASOURCES_TAG = 'DATASOURCES'

export const revalidateDatasources = async () => revalidateTag(DATASOURCES_TAG)
export const revalidateDatasource = async (id: string) => revalidateTag(id)

export async function getDatasources(): Promise<DatasourceSchema[]> {
  const url = new URL('/v1/datasources', BASE_URL)
  const response = await fetchServer(url, {
    method: 'GET',
    next: {
      tags: [DATASOURCES_TAG]
    }
  })
  if (!response.ok) {
    handleError(response)
    return {} as any
  }
  const result = await response.json()
  const dataValidation = datasourceSchema.array().safeParse(result)
  if (!dataValidation.success) {
    handleZodError<DatasourceSchema[]>(dataValidation.error)
    return {} as any
  }
  return dataValidation.data
}

export async function getDatasource(id: string): Promise<DatasourceSchema> {
  const url = new URL(`/v1/datasources/${id}`, BASE_URL)
  const response = await fetchServer(url, {
    method: 'GET',
    next: {
      tags: [id]
    }
  })
  if (!response.ok) {
    handleError(response)
    return {} as any
  }
  const result = await response.json()
  const dataValidation = datasourceSchema.safeParse(result)
  if (!dataValidation.success) {
    handleZodError<DatasourceSchema>(dataValidation.error)
    return {} as any
  }
  return dataValidation.data
}

const createOutput = z.object({ id: z.string() })
type CreateOutput = z.infer<typeof createOutput>
export async function createDatasource(data: DatasourceFormSchema): Promise<CreateOutput> {
  const formValidation = datasourceFormSchema.safeParse(data)
  if (!formValidation.success) {
    handleZodError<DatasourceSchema>(formValidation.error)
    return {} as any
  }
  const url = new URL(`/v1/datasources`, BASE_URL)
  const response = await fetchServer(url, { method: 'POST', body: JSON.stringify(formValidation.data) })
  if (!response.ok) {
    handleError(response)
    return {} as any
  }
  const result = await response.json()
  const dataValidation = createOutput.safeParse(result)
  if (!dataValidation.success) {
    handleZodError<CreateOutput>(dataValidation.error)
    return {} as any
  }
  await revalidateDatasources()
  return dataValidation.data
}

export async function updateDatasource(id: string, data: DatasourceFormSchema): Promise<void> {
  const formValidation = datasourceFormSchema.safeParse(data)
  if (!formValidation.success) {
    handleZodError<DatasourceSchema>(formValidation.error)
    return
  }
  const url = new URL(`/v1/datasources/${id}`, BASE_URL)
  const response = await fetchServer(url, { method: 'PUT', body: JSON.stringify(formValidation.data) })
  if (!response.ok) {
    handleError(response)
    return
  }
  await revalidateDatasource(id)
  await revalidateDatasources()
}

export async function deleteDatasource(id: string): Promise<void> {
  const url = new URL(`/v1/datasources/${id}`, BASE_URL)
  const response = await fetchServer(url, { method: 'DELETE' })
  if (!response.ok) {
    handleError(response)
    return
  }
  await revalidateDatasource(id)
  await revalidateDatasources()
}
