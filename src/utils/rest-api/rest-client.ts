type RestResponse<T> = {
  docs: T[]
  totalDocs: number
  page: number
  totalPages: number
}

export const restClient = (baseUrl: string) => {
  const buildUrl = (collection: string, id?: string | number): string => {
    const base = `${baseUrl}/${collection}`
    return id ? `${base}/${id}` : base
  }

  const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  return {
    find: async <T>(collection: string, query?: Record<string, any>): Promise<RestResponse<T>> => {
      const queryString = query ? `?${new URLSearchParams(query).toString()}` : ''
      const url = `${buildUrl(collection)}${queryString}`
      console.log('url', url)
      try {
        const response = await fetch(url)
        return handleResponse(response)
      } catch (error) {
        console.error('Error fetching data:', error)
        throw error
      }
    },

    findById: async <T>(collection: string, id: string | number): Promise<T> => {
      const response = await fetch(buildUrl(collection, id))
      return handleResponse(response)
    },

    create: async <T>(collection: string, data: Partial<T>): Promise<T> => {
      const response = await fetch(buildUrl(collection), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return handleResponse(response)
    },

    update: async <T>(collection: string, id: string | number, data: Partial<T>): Promise<T> => {
      const response = await fetch(buildUrl(collection, id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return handleResponse(response)
    },

    delete: async <T>(collection: string, id: string | number): Promise<T> => {
      const response = await fetch(buildUrl(collection, id), {
        method: 'DELETE',
      })
      return handleResponse(response)
    },

    endpoint: async <T>(path: string): Promise<T> => {
      const response = await fetch(buildUrl(path))
      return handleResponse(response)
    },
  }
}
