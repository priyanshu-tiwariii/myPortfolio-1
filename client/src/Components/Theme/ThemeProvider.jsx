import { useSelector } from 'react-redux';


export function ThemeProvider({ children }) {
  const {currentTheme} = useSelector((state) => state.theme);
  console.log('Current Theme:', currentTheme);
  return (
    <div className={currentTheme}>
      <div className='bg-gray-50 dark:text-neutral-200 dark:bg-neutral-900'>
        {children}
      </div>
    </div>
  );
}
