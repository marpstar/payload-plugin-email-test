import type { AdminViewProps } from 'payload'

import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import React from 'react'
import { EmailTestClient } from './client'
import { EmailTestLink } from './link'

export const ToolsView: React.FC<AdminViewProps> = ({ initPageResult, params, searchParams }) => {
  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
      viewActions={['payload-plugin-email-test/client#ToolsLink']}
    >
      <Gutter>
        <EmailTestLink />
      </Gutter>
    </DefaultTemplate>
  )
}

export const EmailTestView: React.FC<AdminViewProps & { baseUrl: string; apiPath: string }> = ({
  initPageResult,
  params,
  searchParams,
  baseUrl,
  apiPath,
}) => {
  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
      viewActions={['payload-plugin-email-test/client#ToolsLink']}
    >
      <Gutter>
        <EmailTestClient baseUrl={baseUrl} apiPath={apiPath} />
      </Gutter>
    </DefaultTemplate>
  )
}
