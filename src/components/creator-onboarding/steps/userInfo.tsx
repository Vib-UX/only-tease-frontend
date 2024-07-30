import useGlobalStore from '@/hooks/store/useGlobalStore';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';

const UserInfo = () => {
  const { userInfo, setUserInfo } = useGlobalStore();

  return (
    <>
      <div className=' py-5'>
        <label
          htmlFor='firstName'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Legal first name
        </label>
        <div className='mt-2'>
          <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
            <span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'></span>
            <input
              type='text'
              name='firstName'
              id='firstName'
              autoComplete='firstName'
              className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
              placeholder='Poonam'
              onChange={(e) => setUserInfo({ firstName: e.target.value })}
            />
          </div>
        </div>
      </div>{' '}
      <label
        htmlFor='lastName'
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        Legal last name
      </label>
      <div className='mt-2'>
        <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
          <span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'></span>
          <input
            type='text'
            name='lastName'
            id='lastName'
            autoComplete='lastName'
            className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
            placeholder='Pandey'
            onChange={(e) => setUserInfo({ lastName: e.target.value })}
          />
        </div>
      </div>
      <label
        htmlFor='lastName'
        className='block text-sm font-medium leading-6 text-gray-900 pt-5 pb-2'
      >
        Date of Birth
      </label>
      <DatePicker
        value={new Date(userInfo.dob)}
        onChange={(e: any) => {
          return setUserInfo({ dob: e });
        }}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        className='px-3 h-10 w-full rounded border border-[#d1d5db]  text-[#7E768C] outline-none focus:border-[#413055]'
      />
    </>
  );
};

export default UserInfo;
