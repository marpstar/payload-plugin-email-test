import { Button } from '@payloadcms/ui'
import Link from 'next/link'

export const EmailTestLink = () => {
  return (
    <>
      <Button el="link" Link={Link} buttonStyle="pill" to="/admin/email-tester">
        Email Test
      </Button>
    </>
  )
}

export const ToolsLink = () => {
  return (
    <>
      <Button el="link" Link={Link} buttonStyle="pill" to="/admin/loadpack-tools">
        Tools
      </Button>
    </>
  )
}
