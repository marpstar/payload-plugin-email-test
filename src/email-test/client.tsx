'use client'
import './email-test.scss'

import type { Data, FormState } from 'payload'
import {
  Button,
  Form,
  EmailField,
  TextField,
  TextareaField,
  useConfig,
  toast,
} from '@payloadcms/ui'
import { email } from 'payload/shared'
import { useCallback, useEffect, useState } from 'react'
import { restClient } from '../utils/rest-api/rest-client'

interface EmailTestClientProps {
  baseUrl: string
  apiPath: string
}

export const EmailTestClient: React.FC<EmailTestClientProps> = (props) => {
  const initialState = {
    value: '',
    initialValue: '',
    valid: true,
  }
  const { config } = useConfig()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [defaultFromAddress, setDefaultFromAddress] = useState<string>('')

  useEffect(() => {
    const fetchConfig = async () => {
      const { defaultFromAddress } = await restClient(props.apiPath).endpoint<{
        defaultFromAddress: string
      }>('/email-config')
      setDefaultFromAddress(defaultFromAddress || 'example@example.com')
    }
    fetchConfig()
  }, [config])
  const handleSubmit = async (fields: FormState, data: Data): Promise<void> => {
    setLoading(true)
    setError('')
  }

  const onSuccess = (data: unknown) => {
    setLoading(false)
    toast.success('Email sent successfully')
  }

  const onChange = useCallback(
    async ({ formState: prevFormState }: { formState: FormState }) => {
      console.log({ prevFormState })

      return prevFormState
    },

    [config.routes.api, config.serverURL],
  )

  return (
    <div className="EmailTestPage">
      <h2>Email Test</h2>
      {!defaultFromAddress && <div className="loading">⏳</div>}
      {defaultFromAddress && (
        <Form
          action={`/api/email-test`}
          method="POST"
          onChange={[onChange]}
          onSuccess={onSuccess}
          onSubmit={handleSubmit}
          initialState={{
            from: {
              ...initialState,
              value: defaultFromAddress,
              initialValue: defaultFromAddress,
            },
            to: {
              ...initialState,
            },
            subject: {
              ...initialState,
            },
            template: {
              ...initialState,
            },
            content: {
              ...initialState,
            },
          }}
        >
          <EmailField
            field={{
              label: 'From Email',
              name: 'from',
              required: true,
              type: 'email',
              admin: { autoComplete: 'off', placeholder: 'someone@example.com' },
            }}
            path="from"
            validate={email}
          />
          <EmailField
            field={{
              label: 'To Email',
              name: 'to',
              required: true,
              type: 'email',
              admin: { autoComplete: 'off', placeholder: 'someone@example.com' },
            }}
            path="to"
            validate={email}
          />
          <TextField
            field={{ label: 'Subject', name: 'subject', required: true }}
            path="subject"
            validate={(val) => Boolean(val) || 'This field is required'}
          />
          <TextareaField
            field={{ label: 'Email Content', name: 'content', required: true }}
            path="content"
            validate={(val) => Boolean(val) || 'This field is required'}
          />
          <Button type="submit" buttonStyle="primary" size="large" disabled={loading}>
            {loading ? 'Sending...' : 'Send Test Email'}
          </Button>
        </Form>
      )}
      <div>
        Built by <a href="https://www.sandtoken.com">Sandtoken</a>
      </div>
    </div>
  )
}
