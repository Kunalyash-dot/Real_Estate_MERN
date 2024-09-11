import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// import 'swiper/swiper-bundle';


function Listing() {
 
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
       </div>
            
 
       
           
       
      )}
    </main>
  )
}

export default Listing
