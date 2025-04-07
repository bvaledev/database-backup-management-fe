'use client'

import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { cronstrue } from "~/lib/cronstrue";
import { DatasourceFormSchema, SSLModes } from "./datasource-schema";

export function DatasourceForm() {
  const form = useFormContext<DatasourceFormSchema>()

  function handleChangeNumber(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      form.setValue(e.target.name as any, parseInt(value))
    } else {
      form.setValue(e.target.name as any, value)
    }
  }
  const cronExpt = form.watch('cron.cron_expr')
  const cronInfo = cronExpt.length > 0 ? cronstrue.toString(cronExpt, { locale: "pt_BR" }) : ''
  return (
    <div className="flex flex-col gap-3">
      <FormField
        control={form.control}
        name="host"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Host</FormLabel>
            <FormControl>
              <Input placeholder="Host" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="database"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Database</FormLabel>
            <FormControl>
              <Input placeholder="Database" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="port"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Port</FormLabel>
            <FormControl>
              <Input placeholder="Port" type="number" {...field} onChange={handleChangeNumber} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="Username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <Input placeholder="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ssl_mode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SSL Mode</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o ssl mode" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SSLModes.map((modes) => <SelectItem key={modes} value={modes}>{modes}</SelectItem>)}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cron.cron_expr"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expressão Cron</FormLabel>
            <FormControl>
              <Input
                placeholder="expr"
                {...field}
              />
            </FormControl>
            <FormDescription>
              {cronInfo}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cron.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição Cron</FormLabel>
            <FormControl>
              <Textarea placeholder="descrição" {...field} rows={6} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cron.enabled"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center py-3">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Inativo/Ativo</FormLabel>
          </FormItem>
        )}
      />
    </div>
  )
}
