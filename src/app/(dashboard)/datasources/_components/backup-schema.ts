import { z } from "zod";

export enum BackupTrigger {
  MANUAL = "manual",
  CRON = "cron"
}

export enum BackupStatus {
  INITIALIZED = "initialized",
  FAILED = "failed",
  COMPLETED = "completed"
}

export const backupSchema = z.object({
  id: z.string(),
  datasource_id: z.string(),
  trigger: z.nativeEnum(BackupTrigger),
  status: z.nativeEnum(BackupStatus),
  file_path: z.string().nullable(),
  file_original_name: z.string().nullable(),
  file_size: z.number().nullable(),
  started_at: z.coerce.date().nullable(),
  finished_at: z.coerce.date().nullable(),
  restored_at: z.coerce.date().nullable()
})
export type BackupSchema = z.infer<typeof backupSchema>

export const createBackupSchema = z.object({
  datasource_id: z.string()
})
export type CreateBackupSchema = z.infer<typeof createBackupSchema>
