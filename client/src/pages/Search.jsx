import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";


export default function Search() {
  const navigate = useNavigate();

  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    offer: false,
    sort: 'created_at',
    order: 'desc',
    city:'',
  });


  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  console.log(listings)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const offerFromUrl = urlParams.get('offer');
    const cityFromUrl = urlParams.get('city');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      cityFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        city: cityFromUrl || '',
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'intercity' ||
      e.target.id === 'withincity'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === 'offer') {
      setSidebardata({ ...sidebardata, offer: e.target.checked });
    }
    
    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
     
    if (e.target.id === 'city') {
      setSidebardata({ ...sidebardata, city: e.target.value });
    }

  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('city', sidebardata.city);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className='flex flex-col md:flex-row'>
     <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8' >
        <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div> 

          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input type='checkbox' id='all' className='w-5'
               onChange={handleChange}
               checked={sidebardata.type === 'all'} />
              <span>Inter City & With In city</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='intercity' className='w-5'
              onChange={handleChange}
              checked={sidebardata.type === 'intercity'} />
              <span>Inter City</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='withincity' className='w-5'
               onChange={handleChange}
               checked={sidebardata.type === 'withincity'} />
              <span>With In City</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5'
              onChange={handleChange}
              checked={sidebardata.offer} />
              <span>Offer</span>
            </div>
          </div>
          
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>City:</label>
            <select
            onChange={handleChange}
            id='city' className='border rounded-lg p-3' placeholder="city">
              <option></option>
              <option>Jaipur</option>
              <option>Delhi</option>
              <option>Noida</option>
              <option>Delhi</option>
            </select>
          </div>
          
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select 
            onChange={handleChange}
            defaultValue={'created_at_desc'}
            id='sort_order' className='border rounded-lg p-3'>
             <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
     </div>
     <div className="">
     <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Results:</h1>
     <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  )
}
