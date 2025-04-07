'use client'

import { DatabaseZap, RefreshCcw } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { restoreBackup } from "~/actions/backup"
import { getDatasources } from "~/actions/datasource"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Label } from "~/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select"
import { DatasourceSchema } from "./datasource-schema"

type Props = {
  backupId: string
  datasourceId: string
}

export function RestoreBackupButton({ datasourceId, backupId }: Props) {
  const [selectedDatasourceId, setSelectedDatasourceId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [datasources, setDatasources] = useState<DatasourceSchema[]>([])

  async function handleLoadDatasources() {
    setIsLoading(true)
    await getDatasources().then((datasources) => {
      setDatasources(datasources)
    }).catch(e => {
      toast.error(e.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  async function handleRestoreBackup() {
    setIsLoading(true)
    await restoreBackup(backupId, datasourceId).then(({ message }) => {
      toast.success(message)
    }).catch(e => {
      toast.error(e.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    if (selectedDatasourceId === '') {
      setSelectedDatasourceId(datasourceId)
    }
    handleLoadDatasources()
  }, [])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button >
            <DatabaseZap />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Restaurar banco de dados</DialogTitle>
            <DialogDescription>
              Selecione qual datasource você deseja que este backup seja restaurado.
              Por padrão, o datasource de origem é selecionado
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Datasource
              </Label>
              <Select value={selectedDatasourceId} onValueChange={(value) => setSelectedDatasourceId(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o datasource" />
                </SelectTrigger>
                <SelectContent>
                  {datasources.map((datasource) => <SelectItem key={datasource.id} value={datasource.id}>{datasource.database}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" size="sm" variant="ghost" className="px-3" onClick={handleLoadDatasources} disabled={isLoading}>
              <span className="sr-only">Atualizar datasources</span>
              <RefreshCcw />
            </Button>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleRestoreBackup} disabled={isLoading}>
              <DatabaseZap />
              Restaurar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
