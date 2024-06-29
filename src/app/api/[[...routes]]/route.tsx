/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  assetsPath: '/',
  title: "Hell",
  basePath: '/api',
  hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    image: (
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(252, 183, 255, 0.8) 100%)',
          backgroundSize: '100% 100%',
          display: 'flex',
          padding: "20px",
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <h1>Subscribe to ava adams</h1>
          &nbsp;
          <img src='https://onlytease.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmodel2.a1926d48.webp&w=1920&q=75' alt='ava adams' sizes='20' style={{
            width: 40,
            height: 40,
            borderRadius: '50%', // Make the image round
            overflow: 'hidden', // Add overflow hidden
          }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>Autopay 🔁</div>
        </div>
      </div>
    ),
    intents: [
      // eslint-disable-next-line react/jsx-key
      <TextInput placeholder="Enter custom fruit..." />,
      // eslint-disable-next-line react/jsx-key
      <Button value="apples">Apples</Button>,
      // eslint-disable-next-line react/jsx-key
      <Button value="oranges">Oranges</Button>,
      // eslint-disable-next-line react/jsx-key
      <Button value="bananas">Bananas</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
