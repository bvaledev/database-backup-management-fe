'use server'

import { revalidateTag } from "next/cache"
import { z } from "zod"
import { backupSchema, BackupSchema, createBackupSchema, CreateBackupSchema } from "~/app/(dashboard)/datasources/_components/backup-schema"
import { handleError, handleZodError } from "~/lib/error-handler"
import { fetchServer } from "~/lib/fetch-server"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
const BACKUPS_TAG = 'BACKUPS'

export const revalidateBackups = async () => revalidateTag(BACKUPS_TAG)
export const revalidateBackup = async (id: string) => revalidateTag(id)

export async function getBackups(datasourceId?: string): Promise<BackupSchema[]> {
  const url = new URL('/v1/backups', BASE_URL)
  if (datasourceId) {
    url.searchParams.append('datasourceId', datasourceId);
  }
  const response = await fetchServer(url, {
    method: 'GET',
    next: {
      tags: [BACKUPS_TAG]
    }
  })
  if (!response.ok) {
    handleError(response)
    return {} as any
  }
  const result = await response.json()
  const dataValidation = backupSchema.array().safeParse(result)
  if (!dataValidation.success) {
    handleZodError<BackupSchema[]>(dataValidation.error)
    return {} as any
  }
  return dataValidation.data
}

export async function getBackup(id: string): Promise<BackupSchema> {
  const url = new URL(`/v1/backups/${id}`, BASE_URL)
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
  const dataValidation = backupSchema.safeParse(result)
  if (!dataValidation.success) {
    handleZodError<BackupSchema>(dataValidation.error)
    return {} as any
  }
  return dataValidation.data
}

export async function deleteBackup(id: string): Promise<void> {
  const url = new URL(`/v1/backups/${id}`, BASE_URL)
  const response = await fetchServer(url, { method: 'DELETE' })
  if (!response.ok) {
    handleError(response)
    return
  }
  await revalidateBackup(id)
  await revalidateBackups()
}

const createOutput = z.object({ datasource_id: z.string(), status: z.string() })
type CreateOutput = z.infer<typeof createOutput>
export async function createBackup(data: CreateBackupSchema): Promise<CreateOutput> {
  const formValidation = createBackupSchema.safeParse(data)
  if (!formValidation.success) {
    handleZodError<CreateBackupSchema>(formValidation.error)
    return {} as any
  }
  const url = new URL(`/v1/backups`, BASE_URL)
  console.log(url.toString(), formValidation.data)
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
  await revalidateBackups()
  return dataValidation.data
}

const restoreOutput = z.object({ message: z.string() })
type RestoreOutput = z.infer<typeof restoreOutput>
export async function restoreBackup(backupId: string, datasourceId?: string): Promise<RestoreOutput> {
  const url = new URL(`/v1/backups/${backupId}/restore-backup`, BASE_URL)
  if (datasourceId) {
    url.searchParams.append('datasourceId', datasourceId)
  }
  console.log(url.toString())
  const response = await fetchServer(url, { method: 'POST' })
  if (!response.ok) {
    handleError(response)
    return {} as any
  }
  const result = await response.json()
  const dataValidation = restoreOutput.safeParse(result)
  if (!dataValidation.success) {
    handleZodError<RestoreOutput>(dataValidation.error)
    return {} as any
  }
  await revalidateBackups()
  return dataValidation.data
}

