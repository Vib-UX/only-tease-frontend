/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import Big from "big.js"
import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/middlewares'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

import { NFT_MARKETPLACE_ABI } from '@/hooks/abi/NFT_MARKETPLACE_ABI'

import { ERC20 } from '@/components/ui/ERC20ABI'

import { NFT_MARKET_PLACE_ADDRESS } from '@/utils/addresses'
import { IndianModelCardData, modelCardData } from '@/utils/modelData'
import { MOCK_USD_BASE } from '@/utils/tokens'


type State = {
  modelId: string
  subscriptionId: string
}

export const getSubscriptionId = () => {
  const subscriptionId = Math.floor(Math.random() * (1e12 - 1 + 1)) + 1;
  return subscriptionId;
};

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


const app = new Frog<{ State: State }>({
  assetsPath: '/',
  basePath: '/api',
  title: "Only tease",
  initialState: {
    modelId: '',
    subscriptionId: ''
  }
})

const neynarMiddleware = neynar({
  apiKey: 'NEYNAR_FROG_FM',
  features: ['interactor', 'cast'],
})

app.frame('/', neynarMiddleware, async (c) => {
  const name = c.req.queries('name')?.[0] || '';
  console.log(name);

  const model = [...IndianModelCardData, ...modelCardData].find((s) => s.slug.toLowerCase() === name.toLowerCase())
  console.log(model, "mode");

  const modelId = model?.id?.toString() || '';
  const amount = parseInt(model?.fees?.toString() as string) * 3 || '';
  const subscriptionId = getSubscriptionId()

  const { previousState } = c

  previousState.modelId = modelId;
  previousState.subscriptionId = subscriptionId.toString();

  return c.res({
    action: "/finish",
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
          <h1>Subscribe to {model?.name}</h1>
          &nbsp;
          <img src={model?.image_url} alt='ava adams' sizes='20' style={{
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
              {model?.fees}&nbsp;USDC
            </div>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button.Transaction target={`/approve?amount=${amount}&modelId=${modelId}&subscriptionId=${subscriptionId}`} >Purchase Subscription</Button.Transaction>,
    ]
  })
})


app.frame('/finish', (c) => {
  const { previousState } = c
  const modelId = previousState.modelId
  const subscriptionId = previousState.subscriptionId
  const model = [...IndianModelCardData, ...modelCardData].find((s) => s.id?.toString() === modelId?.toLowerCase())

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
          <h1>Subscribe to {model?.name}</h1>
          &nbsp;
          <img src={model?.image_url} alt='ava adams' sizes='20' style={{
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
              {model?.fees}&nbsp;USDC
            </div>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button.Transaction action={`/final#modelId=${modelId}&subscriptionId=${subscriptionId}`} target={`/mint?&modelId=${modelId}&subscriptionId=${subscriptionId}`} >Mint</Button.Transaction>,
    ]
  })
})


app.frame('/final', async (c) => {
  const { previousState } = c
  const modelId = previousState.modelId
  const subscriptionId = previousState.subscriptionId
  const model = [...IndianModelCardData, ...modelCardData].find((s) => s.id?.toString() === modelId?.toLowerCase())
  const tokenId = Big(modelId).mul(1e18).plus(subscriptionId).toString()
  console.log("tokenId", tokenId);
  // const tokenId = (parseInt(modelId || "14") * 1e18) + parseInt(subscriptionId as string);

  // await updateSubscription({
  //   email: '',
  //   modelId: modelId,
  //   subscriptionId: parseInt(subscriptionId)
  // })

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
          <h1>You have subscribed to {model?.name}</h1>
          &nbsp;
          <img src={model?.image_url} alt='ava adams' sizes='20' style={{
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
              {model?.fees}&nbsp;USDC
            </div>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://onlytease.vercel.app/profile/${model?.slug}`}>Subscription successful</Button.Link>,
      <Button.Link href={`https://testnets.opensea.io/assets/base-sepolia/0x054ba199ef61ef15226e2ceb61138f7d5e2f8408/${tokenId}`}>View your NFT</Button.Link>,
    ]
  })
})

app.transaction('/mint', async (c) => {
  const { previousState } = c
  const modelId = previousState.modelId
  const subscriptionId = previousState.subscriptionId

  return c.contract({
    abi: NFT_MARKETPLACE_ABI,
    to: NFT_MARKET_PLACE_ADDRESS,
    chainId: 'eip155:84532',
    functionName: "purchaseSubscription",
    args: [BigInt(modelId),
    BigInt(subscriptionId),
    ]
  })
})

app.transaction('/approve', neynarMiddleware, async (c) => {
  const amount = parseFloat(c.req.queries('amount') ? c.req.queries('amount') as unknown as string : '') * Math.pow(10, 6)
  const amountToApprove = BigInt(amount);
  return c.contract({
    abi: ERC20,
    to: MOCK_USD_BASE.address,
    chainId: 'eip155:84532',
    functionName: "approve",
    args: [NFT_MARKET_PLACE_ADDRESS,
      amountToApprove
    ]
  })
})


devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
