'use client'

import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteDatasource } from "~/actions/datasource"
import { Button } from "~/components/ui/button"

type Props = {
  datasourceId: string
}
export function DeleteDatasourceButton({ datasourceId }: Props) {
  const router = useRouter()

  async function handleDeleteDatasource() {
    await deleteDatasource(datasourceId).then(() => {
      toast.success('Datasource removido')
      router.push('/datasources')
    }).catch(e => {
      toast.error(e.message)
    })
  }

  return <Button variant="destructive" size="icon" onClick={handleDeleteDatasource}>
    <Trash2 />
  </Button>
}
