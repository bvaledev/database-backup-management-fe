import z from 'zod'

export enum SSLMode {
  DISABLE = 'disable',
  ALLOW = 'allow',
  PREFER = 'prefer',
  REQUIRE = 'require',
  VERIFY_CA = 'verify-ca',
  VERIFY_FULL = 'verify-full',
}
export const SSLModes = Object.values(SSLMode)

export const cronFormSchema = z.object({
  cron_expr: z.string(),
  description: z.string(),
  enabled: z.boolean(),
})

export type CronFormSchema = z.infer<typeof cronFormSchema>

export const datasourceFormSchema = z.object({
  host: z.string(),
  database: z.string(),
  port: z.number(),
  username: z.string(),
  password: z.string().min(4),
  ssl_mode: z.nativeEnum(SSLMode),
  cron: cronFormSchema.required()
})

export type DatasourceFormSchema = z.infer<typeof datasourceFormSchema>

export const datasourceSchema = datasourceFormSchema.omit({ password: true }).extend({
  id: z.string()
})

export type DatasourceSchema = z.infer<typeof datasourceSchema>
