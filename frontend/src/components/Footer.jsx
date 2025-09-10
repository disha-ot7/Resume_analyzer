export default function Footer() {
  return (
    <footer className='bg-gray-100 dark:bg-gray-900 text-center py-6 mt-10 border-t border-gray-200 dark:border-gray-700'>
      <p className='text-sm text-gray-600 dark:text-gray-400'>
        © {new Date().getFullYear()}{" "}
        <span className='font-semibold text-blue-600'>Resume Analyzer</span> |
        Built with
      </p>
    </footer>
  );
}
