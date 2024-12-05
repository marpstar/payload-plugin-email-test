# Payload Email Test Plugin

A example plugin for Payload CMS that allows you to test email functionality directly from the admin panel.

<img width="630" alt="image" src="https://github.com/user-attachments/assets/f80c0064-7e8d-47d0-8ef3-69c718457837">


## Building

Install the plugin from NPM:

```bash
npm install payload-plugin-email-test

# or with yarn
yarn add payload-plugin-email-test

# or with pnpm
pnpm add payload-plugin-email-test

```


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
