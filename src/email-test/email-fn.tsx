'use server'

import { Payload } from 'payload'

export async function getDefaultFromAddress(payload: Payload) {
  const email = await payload.config.email
  const address = email({ payload }).defaultFromAddress
  return address
}
