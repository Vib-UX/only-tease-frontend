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
          justifyContent: "space-between",
          alignItems: 'center',
          flexDirection: 'row',
          fontSize: '1.25rem',
        }}>
          <h1>Subscribe to ava adams</h1>
          &nbsp;
          <img src='https://onlytease.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmodel2.a1926d48.webp&w=1920&q=75' alt='ava adams' sizes='20' style={{
            width: 120,
            height: 120,
            borderRadius: '50%', // Make the image round
            overflow: 'hidden', // Add overflow hidden
          }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0', justifyContent: 'space-between' }}>

          <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>Autopay 🔁</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            <div
              // onClick={() => {
              //   setSelectedMonth(s);
              // }}
              style={{
                width: '60px',
                cursor: 'pointer',
                borderRadius: '0.5rem',
                padding: '0.25rem 0.5rem',
                display: 'flex',
                fontSize: '1.25rem',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: selectedMonth === s ? '#0051FE' : '',
                // color: selectedMonth === s ? 'white' : '',
                // boxShadow: selectedMonth === s ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '',
                // border: selectedMonth === s ? '1px solid #0051FE' : ''
              }}
            >
              3m
            </div>
          </div>
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
