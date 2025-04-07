import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { DatasourceCreateForm } from "../_components/datasource-create-form";

export default async function CreateDatasourcesPage() {

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
        <h2 className="text-3xl font-bold text-slate-900">Datasources</h2>
      </div>
      <div className="w-full max-w-[600px]">
        <DatasourceCreateForm />
      </div>
    </div>
  );
}
