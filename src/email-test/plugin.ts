import { Config, Plugin } from 'payload'
import { EmailTestEndpoint, EmailTestConfigEndpoint } from './endpoint'
import deepMerge from './deepMerge'

interface EmailTestPluginOptions {
  baseUrl: string
  apiPath?: string
  enabled?: boolean
}

export const EmailTestPlugin =
  ({ baseUrl, apiPath = '/api', enabled = true }: EmailTestPluginOptions): Plugin =>
  (config: Config) => {
    if (!enabled) return config

    config.endpoints = [...(config.endpoints || []), EmailTestConfigEndpoint, EmailTestEndpoint]
    config = deepMerge<Config, Partial<Config>>(config, {
      admin: {
        components: {
          actions: [
            {
              path: 'payload-plugin-email-test/client#ToolsLink',
            },
          ],
          views: {
            loadpackTools: {
              Component: 'payload-plugin-email-test/client#ToolsView',
              path: '/loadpack-tools',
            },
            emailTest: {
              Component: {
                path: 'payload-plugin-email-test/client#EmailTestView',
                serverProps: {
                  baseUrl,
                  apiPath,
                },
              },
              path: '/email-tester',
            },
          },
        },
      },
    })

    return config
  }
