'use client';

interface StaticPageProps {
  page: {
    title: string;
    description: string;
    content: string;
  };
}

export default function StaticPage({ page }: StaticPageProps) {
  return (
    <div className='bg-white/50 rounded-xl py-7 px-8 overflow-hidden'>
      <h1 className='text-2xl font-bold'>{page.title || 'Page Title'}</h1>
      {page.description && (
        <p className='mt-1 text-md text-gray-400'>
          {page.description || 'Page Description'}
        </p>
      )}
      <div
        className='mt-5'
        dangerouslySetInnerHTML={{
          __html: page.content || 'Please contact us for more information.',
        }}
      ></div>
    </div>
  );
}
