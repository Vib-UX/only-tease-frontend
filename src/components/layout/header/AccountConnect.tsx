'use client'
import { useWeb3Auth } from '@web3auth/modal-react-hooks';

import useGlobalStore from '@/hooks/store/useGlobalStore';

import Button from '@/components/buttons/Button';
import AccountMenu from '@/components/layout/header/AccountMenu';

function AccountConnect() {
  const { smartAddress } = useGlobalStore();
  const {
    connect,
  } = useWeb3Auth();

  const shortAddress = smartAddress ? `${smartAddress.slice(0, 6)}...${smartAddress.slice(-4)}` : '';

  return (
    <div className='flex flex-grow'>
      {smartAddress ? (
        <div className='flex items-center'>
          <Button>
            {shortAddress}
          </Button>
          <AccountMenu />
        </div>
      ) : (
        <Button
          onClick={() => {
            connect();
          }}
        >
          Connect wallet
        </Button>
      )}
    </div>
  );
}

export default AccountConnect;
