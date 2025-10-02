import ApiService from '@/service/ApiService';

export default async function AboutUs() {
  const aboutUs = await ApiService.request('GET', '/about-us');

  console.log(aboutUs);

  return (
    <div className='bg-white/50 rounded-xl py-7 px-8 overflow-hidden'>
      <h1 className='text-2xl font-bold mb-5'>About Us</h1>

      {aboutUs.data.description}
    </div>
  );
}
