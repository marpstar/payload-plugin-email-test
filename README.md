# Payload Email Test Plugin

A plugin for Payload CMS that allows you to test email functionality directly from the admin panel.

## Installation

Currently not on NPM, you can clone this repo.

## Usage

Add the plugin to your Payload configuration:

```typescript:payload.config.ts
import { buildConfig } from 'payload/config'
import emailTestPlugin from 'payload-email-test'

export default buildConfig({
  plugins: [
    EmailTestPlugin({
      baseUrl: 'http://localhost:3000',
      apiPath: '/api'
      // enabled: false   // disable the plugin by passing `enabled: false`
    })
  ],
  // ... rest of your payload config
})
```