'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { createDatasource } from "~/actions/datasource"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter } from "~/components/ui/card"
import { Form } from "~/components/ui/form"
import { DatasourceForm } from "./datasource-form"
import { datasourceFormSchema, DatasourceFormSchema, SSLMode } from "./datasource-schema"

export function DatasourceCreateForm() {
  const router = useRouter()
  const form = useForm<DatasourceFormSchema>({
    resolver: zodResolver(datasourceFormSchema),
    mode: 'all',
    defaultValues: {
      host: "",
      database: "",
      port: 5432,
      username: "",
      password: "",
      ssl_mode: SSLMode.DISABLE,
      cron: {
        cron_expr: "0 */5 * * * *",
        description: "",
        enabled: true
      }
    }
  })

  async function handleCreateDatasource(data: DatasourceFormSchema) {
    await createDatasource(data).then(({ id: newDatasourceId }) => {
      toast.success('Datasource adicionado')
      router.push(`/datasources/${newDatasourceId}`)
    }).catch(e => {
      toast.error(e.message)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateDatasource)}>
        <Card>
          <CardContent>
            <DatasourceForm />
          </CardContent>
          <CardFooter>
            <Button type="submit">Cadastrar Datasource</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
