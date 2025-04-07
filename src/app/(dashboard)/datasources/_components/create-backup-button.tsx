'use client'

import { DatabaseBackup } from "lucide-react"
import { toast } from "sonner"
import { createBackup } from "~/actions/backup"
import { Button } from "~/components/ui/button"

type Props = {
  datasourceId: string
}

export function CreateBackupButton({ datasourceId }: Props) {
  async function handleCreateBackup() {
    await createBackup({ datasource_id: datasourceId }).then(({ status }) => {
      toast.success(status)
    }).catch(e => {
      toast.error(e.message)
    })
  }

  return <Button onClick={handleCreateBackup}>
    <DatabaseBackup />
    Criar Backup
  </Button>
}
