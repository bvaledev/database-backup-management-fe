
import { Plus } from "lucide-react";
import Link from "next/link";
import { getDatasources } from "~/actions/datasource";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { cronstrue } from "~/lib/cronstrue";

export default async function DatasourcesPage() {
  const datasources = await getDatasources()
  return (
    <div className="container flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900">Datasources</h2>
        <div className="flex flex-row gap-2">
          <Link href="/datasources/create">
            <Button>
              <Plus />
              Novo Datasource
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Database</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Cron</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasources.map((d: any) => {
                return (
                  <TableRow key={d.id}>
                    <TableCell>{d.database}</TableCell>
                    <TableCell>{d.username}</TableCell>
                    <TableCell>{cronstrue.toString(d.cron.cron_expr, { locale: "pt_BR" })}</TableCell>
                    <TableCell>{d.cron.enabled ? 'Ativo' : 'Inativo'}</TableCell>
                    <TableCell>
                      <Link href={`/datasources/${d.id}`}>
                        <Button size="sm" variant="outline">
                          Detalhes
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
