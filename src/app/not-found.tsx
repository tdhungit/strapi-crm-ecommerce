export default function NotFound() {
  return (
    <div className='container mx-auto p-6 text-center'>
      <h1 className='text-3xl font-bold'>404 - Page Not Found</h1>
      <p className='mt-4'>
        Sorry, the page you are looking for does not exist.
      </p>
      <a href='/' className='text-primary underline mt-4 inline-block'>
        Go back to Home
      </a>
    </div>
  );
}
