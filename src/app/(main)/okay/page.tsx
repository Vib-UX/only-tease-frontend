
const OkayPage = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(252, 183, 255, 0.8) 100%)',
        backgroundSize: '100% 100%',
        display: 'flex',
        padding: "40px",
        flexDirection: 'column',
        flexWrap: 'nowrap',
        height: '100%',
        justifyContent: 'start',
        width: '100%',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <h1 className="text-[#0051FE]">Subscribe to ava adams</h1>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
          {[3, 6, 12].map((s, index) => (
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
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: selectedMonth === s ? '#0051FE' : '',
                // color: selectedMonth === s ? 'white' : '',
                // boxShadow: selectedMonth === s ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '',
                // border: selectedMonth === s ? '1px solid #0051FE' : ''
              }}
              key={index}
            >
              {s}m
            </div>
          ))}
        </div>
      </div>
      <p className='text-[#0051FE]'>
        Subscribe to get access to exclusive content
      </p>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>Base</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
          <div
            // onClick={() => {
            //   setSelectedMonth(s);
            // }}
            style={{
              cursor: 'pointer',
              borderRadius: '0.5rem',
              padding: '0.25rem 0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: selectedMonth === s ? '#0051FE' : '',
              // color: selectedMonth === s ? 'white' : '',
              // boxShadow: selectedMonth === s ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '',
              // border: selectedMonth === s ? '1px solid #0051FE' : ''
            }}
          >
            16 USDC
          </div>
        </div>
      </div>
    </div>
  )
}

export default OkayPage