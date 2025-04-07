'use client'

import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { deleteBackup } from "~/actions/backup"
import { Button } from "~/components/ui/button"

type Props = {
  backupId: string
}
export function DeleteBackupButton({ backupId }: Props) {
  async function handleDeleteBackup() {
    await deleteBackup(backupId).then(() => {
      toast.success('Backup removido')
    }).catch(e => {
      toast.error(e.message)
    })
  }
  return <Button variant="destructive" size="icon" onClick={handleDeleteBackup}>
    <Trash2 />
  </Button>
}
