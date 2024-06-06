import { useSelector } from 'react-redux';


export function ThemeProvider({ children }) {
  const {currentTheme} = useSelector((state) => state.theme);
  console.log('Current Theme:', currentTheme);
  return (
    <div className={currentTheme}>
      <div className='bg-gradient-to-r from-green-50 via-gray-50 to-green-100 dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900 dark:text-neutral-200'>
        {children}
      </div>
    </div>
  );
}
