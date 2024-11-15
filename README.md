# Payload Email Test Plugin

A example plugin for Payload CMS that allows you to test email functionality directly from the admin panel.

## Building

Currently not on NPM, you can clone this repo.

```bash

git clone https://github.com/marpstar/payload-plugin-email-test.git
pnpm i

# to build
pnpm build:all

# to run the dev app
pnpm dev


```

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