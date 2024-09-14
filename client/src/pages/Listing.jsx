import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// import 'swiper/swiper-bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';

function Listing() {
  const [copied, setCopied] = useState(false);
    const [listing,setListing] =useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError]= useState(false);
    const params = useParams();
    useEffect(()=>{
      const fetchListing = async ()=>{
        try {
          // console.log('working')
          setLoading(true);
          const res = await fetch(`/api/listing/get/${params.listingId}`);
          const data =await res.json();
          // console.log(data)
          if(data.success === false){
            setError(true);
            setLoading(false);
            return;
          }
          setListing(data);
          setLoading(false);
          setError(false);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      };fetchListing();
    },[params.listingId]);

  return (
    <main>
     
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (<p className="text-center my-7 text-2xl">Something went wrong!</p>)}
      {listing && !loading && !error && (
         <div>
         <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
           {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
            <img src={url} className='w-full h-[450px] p-3' />
          </SwiperSlide>
           ))}
         </Swiper>
           <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"><FaShare className="text-slate-500" onClick={()=>{
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(()=>{
              setCopied(false)
            },2000) }} /></div>
           {copied && (<p className="fixed top-[22%] right-[2%] z-10 rounded-md bg-slate-100 p-1">Link Copied!</p>)}
           <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ${" "} {listing.offer? listing.discountPrice.toLocaleString('en-US'):listing.regularPrice.toLocaleString('en-US') }
              {listing.type === 'rent' && '/month'}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkedAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === 'rent'?'For Rent':"For Sale"}
              </p>
              {listing.offer && (<p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">${+listing.regularPrice - +listing.discountPrice}</p>)}
            </div>
            <p className="text-slate-800">
            <span className='font-semibold text-black'>Description - </span> {listing.description} 
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
           </div>
       </div>      
      )}
    </main>
  )
}

export default Listing
