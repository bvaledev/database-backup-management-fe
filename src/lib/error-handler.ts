import { z } from "zod";

export async function handleError(response: Response) {
  const data = await response.json()
  console.error(data)
  throw new Error(data.error);
}

export function handleZodError<T>({ errors }: z.ZodError<T>) {
  const message = errors[0]?.message
  const path = errors[0]?.path[0]
  console.error(path, message)
  throw new Error(`${path}: ${message}`);
}
