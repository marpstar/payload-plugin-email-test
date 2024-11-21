// https://payloadcms.com/docs/beta/rest-api/overview#custom-endpoints

import { Endpoint } from 'payload'
import { getDefaultFromAddress } from './email-fn'

export const EmailTestConfigEndpoint: Endpoint = {
  path: '/email-config',
  method: 'get',
  handler: async (req) => {
    const address = await getDefaultFromAddress(req.payload)
    return Response.json({
      success: true,
      defaultFromAddress: address,
    })
  },
}

export const EmailTestEndpoint: Endpoint = {
  path: '/email-test',
  method: 'post',
  handler: async (req) => {
    const payload = req.payload

    console.log()

    if (!payload) {
      return Response.json({ error: 'not found' }, { status: 404 })
    }
    const formData = await req?.formData?.()

    if (!formData) {
      return Response.json({ error: 'no data' }, { status: 400 })
    }

    const data = JSON.parse(formData.get('_payload') as string)

    if (!data.to) {
      return Response.json({ error: 'to is required' }, { status: 400 })
    }

    try {
      const response = await req.payload.sendEmail({
        to: data.to,
        subject: data.subject,
        html: data.content,
      })

      return Response.json({ success: true, details: response })
    } catch (error) {
      console.error(error)
      return Response.json({ error: 'failed to send email' }, { status: 500 })
    }
  },
}
