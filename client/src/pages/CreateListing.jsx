import React from 'react';

export default function CreateListing() {
    const cities = ['Jaipur', 'Delhi', 'Mumbai', 'Chandigarh', 'Agra','Pune','Banglore'];
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
          />
          <input
            type='text'
            placeholder='Address Or Pick up Point'
            className='border p-3 rounded-lg'
            id='address'
            required
          />
          <input
                type='number'
                placeholder='Phone Number'
                id='regularPrice'
                min='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
          <input
            type='text'
            placeholder='RegistrationNumber'
            className='border p-3 rounded-lg'
            id='carNumber'
            required
          />
           <div className='mt-4 gap-2'>
            <label htmlFor='city' className='font-semibold '>
              City :
            </label>
            <select 
              id='city'
              className='border p-3 rounded-lg'
              required
            >
              <option value=''>Select a city</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
           <div className='flex flex-wrap gap-6'>
           <div className='flex gap-2'>
              <input type='checkbox' id='inter' className='w-5' />
              <span>InterCity</span>
            </div>
            </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                <span className='text-xs'>(Rs / Hours)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountPrice'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Discounted price</p>
                <span className='text-xs'>(Rs / Hours)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Images:
          <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
        <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Upload</button>
        </div>
      </form>
    </main>
  );
}