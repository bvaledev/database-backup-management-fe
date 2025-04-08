'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { updateDatasource } from "~/actions/datasource"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter } from "~/components/ui/card"
import { Form } from "~/components/ui/form"
import { DatasourceForm } from "./datasource-form"
import { datasourceFormSchema, DatasourceFormSchema, DatasourceSchema } from "./datasource-schema"

type Props = {
  datasource: DatasourceSchema
}

export function DatasourceUpdateForm({ datasource }: Props) {
  const form = useForm<DatasourceFormSchema>({
    resolver: zodResolver(datasourceFormSchema),
    mode: 'all',
    defaultValues: {
      host: datasource.host,
      database: datasource.database,
      port: datasource.port,
      username: datasource.username,
      password: "",
      ssl_mode: datasource.ssl_mode,
      cron: {
        cron_expr: datasource.cron.cron_expr,
        description: datasource.cron.description,
        enabled: datasource.cron.enabled
      }
    }
  })

  async function handleUpdateDatasource(data: DatasourceFormSchema) {
    await updateDatasource(datasource.id, data).then(() => {
      toast.success('Datasource atualizado')
    }).catch(e => {
      toast.error(e.message)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateDatasource)}>
        <Card>
          <CardContent>
            <DatasourceForm />
          </CardContent>
          <CardFooter>
            <Button type="submit">Atualizar Datasource</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
