'use client'

import { DatabaseBackup } from "lucide-react"
import { toast } from "sonner"
import { createBackup } from "~/actions/backup"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
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

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button >
          <DatabaseBackup />
          Criar Backup
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação seria inicializada e pode demorar alguns minutos para finalizar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleCreateBackup}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
