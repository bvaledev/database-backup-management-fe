import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getBackups } from "~/actions/backup";
import { getDatasource } from "~/actions/datasource";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { CreateBackupButton } from "../_components/create-backup-button";
import { DatasourceUpdateForm } from "../_components/datasource-update-form";
import { DeleteBackupButton } from "../_components/delete-backup-button";
import { DeleteDatasourceButton } from "../_components/delete-datasource-button";
import { RestoreBackupButton } from "../_components/restore-backup-button";

export default async function UpdateDatasourcesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: datasourceId } = await params
  const datasource = await getDatasource(datasourceId)
  const backups = await getBackups(datasource.id)

  function formatDate(date?: Date | null){
    if(!date) return '-'
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date)
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row gap-2">
          <Link href="/datasources">
            <Button variant="outline" size="icon">
              <ChevronLeft />
            </Button>
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">{datasource.database}</h2>
        <div className="ml-auto flex flex-row gap-2">
          <DeleteDatasourceButton datasourceId={datasource.id} />
        </div>
      </div>
      <div className="grid gap-2 items-start grid-cols-1 sm:grid-cols-2">
        <DatasourceUpdateForm datasource={datasource} />
        <Card className="pb-0">
          <CardHeader>
            <CardTitle>Backups</CardTitle>
            <CardDescription>
              <CreateBackupButton datasourceId={datasource.id} />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Backup Date</TableHead>
                  <TableHead>Restaurado em</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell>{backup.trigger}</TableCell>
                    <TableCell>{backup.status}</TableCell>
                    <TableCell>{formatDate(backup.finished_at)}</TableCell>
                    <TableCell>{formatDate(backup.restored_at)}</TableCell>
                    <TableCell>
                      <div className="flex flex-row items-center gap-2">
                        {backup.status === 'completed' && <RestoreBackupButton backupId={backup.id} datasourceId={datasource.id} />}
                        <DeleteBackupButton backupId={backup.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
