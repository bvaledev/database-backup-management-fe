'use server'

export async function fetchServer(input: string | URL | Request, init?: RequestInit) {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    }
  })
  return response
}
