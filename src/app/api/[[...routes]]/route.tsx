/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/middlewares'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

import { NFT_MARKETPLACE_ABI } from '@/hooks/abi/NFT_MARKETPLACE_ABI'

import { ERC20 } from '@/components/ui/ERC20ABI'


export const getSubscriptionId = () => {
  const subscriptionId = Math.floor(Math.random() * (1e12 - 1 + 1)) + 1;
  return subscriptionId;
};


const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  title: "Only tease"
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

const neynarMiddleware = neynar({
  apiKey: 'NEYNAR_FROG_FM',
  features: ['interactor', 'cast'],
})

// app.frame('/', neynarMiddleware, (c) => {
//   console.log(c.var.interactor, "sscc");
//   const { buttonValue, inputText, status } = c
//   const fruit = inputText || buttonValue
//   return c.res({
//     image: (
//       <div
//         style={{
//           alignItems: 'center',
//           background:
//             status === 'response'
//               ? 'linear-gradient(to right, #432889, #17101F)'
//               : 'black',
//           backgroundSize: '100% 100%',
//           display: 'flex',
//           flexDirection: 'column',
//           flexWrap: 'nowrap',
//           height: '100%',
//           justifyContent: 'center',
//           textAlign: 'center',
//           width: '100%',
//         }}
//       >
//         <div
//           style={{
//             color: 'white',
//             fontSize: 60,
//             fontStyle: 'normal',
//             letterSpacing: '-0.025em',
//             lineHeight: 1.4,
//             marginTop: 30,
//             padding: '0 120px',
//             whiteSpace: 'pre-wrap',
//           }}
//         >
//           {status === 'response'
//             ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
//             : 'Welcome!'}
//         </div>
//       </div>
//     ),
//     intents: [
//       <TextInput placeholder="Enter custom fruit..." />,
//       <Button value="bananas">Purchase</Button>,
//     ],
//   })
// })


const updateSubscription = async ({ email, subscriptionId, modelId }: {
  email: string, modelId: string, subscriptionId: number
}) => {
  return await fetch("https://onlytease-db-graph-backend.onrender.com/api" + "/" + "purchase-subscription-base", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      modelId: modelId,
      tokenId: (
        BigInt(1e18) * BigInt(modelId) +
        BigInt(subscriptionId)
      ).toString(),
    })
  })
}


app.frame('/', (c) => {

  console.log(c.req.query(), "cc")

  return c.res({
    action: '/finish',
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
          alignItems: "flex-start",
          flexDirection: 'row',
          fontSize: '1.25rem',
        }}>
          <h1>Subscribe to Ava adams</h1>
          &nbsp;
          <img src='https://onlytease.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmodel2.a1926d48.webp&w=1920&q=75' alt='ava adams' sizes='20' style={{
            width: 200,
            height: 200,
            borderRadius: '50%', // Make the image round
            overflow: 'hidden', // Add overflow hidden
          }} />
        </div>
        <div style={{ display: 'flex', marginTop: "50px", alignItems: 'center', padding: '0.5rem 0', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '600' }}>Autopay 🔁</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <div
              // onClick={() => {
              //   setSelectedMonth(s);
              // }}
              style={{
                width: '100px',
                height: "80px",
                cursor: 'pointer',
                borderRadius: '0.5rem',
                paddingLeft: '10px',
                paddingRight: '10px',
                display: 'flex',
                fontSize: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0051FE',
                color: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #0051FE'
              }}
            >
              3m
            </div>
            <div
              // onClick={() => {
              //   setSelectedMonth(s);
              // }}
              style={{
                width: '100px',
                height: "80px",
                cursor: 'pointer',
                borderRadius: '0.5rem',
                paddingLeft: '10px',
                paddingRight: '10px',
                display: 'flex',
                fontSize: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: selectedMonth === s ? '#0051FE' : '',
                // color: selectedMonth === s ? 'white' : '',
                // boxShadow: selectedMonth === s ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '',
                // border: selectedMonth === s ? '1px solid #0051FE' : ''
              }}
            >
              6m
            </div>
            <div
              // onClick={() => {
              //   setSelectedMonth(s);
              // }}
              style={{
                width: '100px',
                height: "80px",
                cursor: 'pointer',
                borderRadius: '0.5rem',
                paddingLeft: '10px',
                paddingRight: '10px',
                display: 'flex',
                fontSize: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: selectedMonth === s ? '#0051FE' : '',
                // color: selectedMonth === s ? 'white' : '',
                // boxShadow: selectedMonth === s ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '',
                // border: selectedMonth === s ? '1px solid #0051FE' : ''
              }}
            >
              12m
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: "50px", alignItems: 'center', padding: '0.5rem 0', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '600' }}>Subscribe for</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <div
              // onClick={() => {
              //   setSelectedMonth(s);
              // }}
              style={{
                width: '150px',
                marginLeft: "10px",
                height: "80px",
                cursor: 'pointer',
                borderRadius: '0.5rem',
                paddingLeft: '10px',
                paddingRight: '10px',
                display: 'flex',
                fontSize: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0051FE',
                color: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #0051FE'
              }}
            >
              16&nbsp;USDC
            </div>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button.Transaction target="/approve" >Purchase Subscription</Button.Transaction>,
    ]
  })
})

app.frame('/final', neynarMiddleware, (c) => {
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
          alignItems: "flex-start",
          flexDirection: 'row',
          fontSize: '1.25rem',
        }}>
          <h1>You have subscribed to &nbsp; <strong>Ava adams</strong></h1>
          &nbsp;
          <img src='https://onlytease.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmodel2.a1926d48.webp&w=1920&q=75' alt='ava adams' sizes='20' style={{
            width: 200,
            height: 200,
            borderRadius: '50%', // Make the image round
            overflow: 'hidden', // Add overflow hidden
          }} />
        </div>
        <div style={{ display: 'flex', marginTop: "50px", alignItems: 'center', padding: '0.5rem 0', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '600' }}>Autopay 🔁</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <div
              // onClick={() => {
              //   setSelectedMonth(s);
              // }}
              style={{
                width: '100px',
                height: "80px",
                cursor: 'pointer',
                borderRadius: '0.5rem',
                paddingLeft: '10px',
                paddingRight: '10px',
                display: 'flex',
                fontSize: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0051FE',
                color: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #0051FE'
              }}
            >
              3m
            </div>
            <div
              // onClick={() => {
              //   setSelectedMonth(s);
              // }}
              style={{
                width: '100px',
                height: "80px",
                cursor: 'pointer',
                borderRadius: '0.5rem',
                paddingLeft: '10px',
                paddingRight: '10px',
                display: 'flex',
                fontSize: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: selectedMonth === s ? '#0051FE' : '',
                // color: selectedMonth === s ? 'white' : '',
                // boxShadow: selectedMonth === s ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '',
                // border: selectedMonth === s ? '1px solid #0051FE' : ''
              }}
            >
              6m
            </div>
            <div
              // onClick={() => {
              //   setSelectedMonth(s);
              // }}
              style={{
                width: '100px',
                height: "80px",
                cursor: 'pointer',
                borderRadius: '0.5rem',
                paddingLeft: '10px',
                paddingRight: '10px',
                display: 'flex',
                fontSize: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: selectedMonth === s ? '#0051FE' : '',
                // color: selectedMonth === s ? 'white' : '',
                // boxShadow: selectedMonth === s ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '',
                // border: selectedMonth === s ? '1px solid #0051FE' : ''
              }}
            >
              12m
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: "50px", alignItems: 'center', padding: '0.5rem 0', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '600' }}>Subscribe for</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <div
              // onClick={() => {
              //   setSelectedMonth(s);
              // }}
              style={{
                width: '150px',
                marginLeft: "10px",
                height: "80px",
                cursor: 'pointer',
                borderRadius: '0.5rem',
                paddingLeft: '10px',
                paddingRight: '10px',
                display: 'flex',
                fontSize: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0051FE',
                color: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #0051FE'
              }}
            >
              16&nbsp;USDC
            </div>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://google.com">Subscription successful</Button.Link>,
      <Button.Link href="https://google.com">View your NFT</Button.Link>,
    ]
  })
})

app.frame('/finish', (c) => {
  return c.res({
    action: "/final",
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
          alignItems: "flex-start",
          flexDirection: 'row',
          fontSize: '1.25rem',
        }}>
          <h1>Subscribe to &nbsp; <strong>Ava adams</strong></h1>
          &nbsp;
          <img src='https://onlytease.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmodel2.a1926d48.webp&w=1920&q=75' alt='ava adams' sizes='20' style={{
            width: 200,
            height: 200,
            borderRadius: '50%', // Make the image round
            overflow: 'hidden', // Add overflow hidden
          }} />
        </div>
        <div style={{ display: 'flex', marginTop: "50px", alignItems: 'center', padding: '0.5rem 0', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '600' }}>Autopay 🔁</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <div
              // onClick={() => {
              //   setSelectedMonth(s);
              // }}
              style={{
                width: '100px',
                height: "80px",
                cursor: 'pointer',
                borderRadius: '0.5rem',
                paddingLeft: '10px',
                paddingRight: '10px',
                display: 'flex',
                fontSize: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0051FE',
                color: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #0051FE'
              }}
            >
              3m
            </div>
            <div
              // onClick={() => {
              //   setSelectedMonth(s);
              // }}
              style={{
                width: '100px',
                height: "80px",
                cursor: 'pointer',
                borderRadius: '0.5rem',
                paddingLeft: '10px',
                paddingRight: '10px',
                display: 'flex',
                fontSize: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: selectedMonth === s ? '#0051FE' : '',
                // color: selectedMonth === s ? 'white' : '',
                // boxShadow: selectedMonth === s ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '',
                // border: selectedMonth === s ? '1px solid #0051FE' : ''
              }}
            >
              6m
            </div>
            <div
              // onClick={() => {
              //   setSelectedMonth(s);
              // }}
              style={{
                width: '100px',
                height: "80px",
                cursor: 'pointer',
                borderRadius: '0.5rem',
                paddingLeft: '10px',
                paddingRight: '10px',
                display: 'flex',
                fontSize: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: selectedMonth === s ? '#0051FE' : '',
                // color: selectedMonth === s ? 'white' : '',
                // boxShadow: selectedMonth === s ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '',
                // border: selectedMonth === s ? '1px solid #0051FE' : ''
              }}
            >
              12m
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: "50px", alignItems: 'center', padding: '0.5rem 0', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '600' }}>Subscribe for</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <div
              // onClick={() => {
              //   setSelectedMonth(s);
              // }}
              style={{
                width: '150px',
                marginLeft: "10px",
                height: "80px",
                cursor: 'pointer',
                borderRadius: '0.5rem',
                paddingLeft: '10px',
                paddingRight: '10px',
                display: 'flex',
                fontSize: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0051FE',
                color: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #0051FE'
              }}
            >
              16&nbsp;USDC
            </div>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button.Transaction target="/mint" >Mint</Button.Transaction>,
    ]
  })
})

app.transaction('/mint', async (c) => {
  const subscriptionId = getSubscriptionId()
  return c.contract({
    abi: NFT_MARKETPLACE_ABI,
    to: "0xD55E9250959D8689819015e24761eCB3891126dc",
    chainId: 'eip155:84532',
    functionName: "purchaseSubscription",
    args: [BigInt(10),
    BigInt(subscriptionId),
    ]
  })
})

app.transaction('/approve', async (c) => {
  const amountToApprove = BigInt(1e8);
  return c.contract({
    abi: ERC20,
    to: "0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA",
    chainId: 'eip155:84532',
    functionName: "approve",
    args: ["0xD55E9250959D8689819015e24761eCB3891126dc",
      amountToApprove
    ]
  })
})


devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
