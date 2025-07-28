import { defineConfig } from 'orval'
import { CACHE_CONFIG } from './src/constants'

export default defineConfig({
  'todo-api': {
    input: {
      target: '../../apps/api/openapi/generated/openapi.yaml',
    },
    output: {
      mode: 'tags-split',
      target: 'src/generated/api.ts',
      schemas: 'src/generated/schemas',
      client: 'react-query',
      httpClient: 'axios',
      mock: false,
      override: {
        mutator: {
          path: './src/http-client.ts',
          name: 'customAxiosInstance',
        },
        query: {
          useQuery: true,
          useInfinite: false,
          signal: true,
          options: {
            staleTime: CACHE_CONFIG.STALE_TIME,
          },
        },
      },
      allParamsOptional: true,
      urlEncodeParameters: true,
    },
  },
})
