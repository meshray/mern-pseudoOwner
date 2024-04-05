import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaShare ,FaUser} from "react-icons/fa";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
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
    };
    fetchListing();
  }, [params.listingId]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjust this value to control how many images are shown at once
    slidesToScroll: 1,
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          {listing.imageUrls.length === 1 ? (
            <div>
              <img
                src={listing.imageUrls[0]}
                alt={`listing-image`}
                className="h-[550px] w-full object-cover"
              />
            </div>
          ) : (
            <Slider {...sliderSettings}>
              {listing.imageUrls.map((url, index) => (
                <div key={index}>
                  <img
                    src={url}
                    alt={`slide-${index}`}
                    className="h-[550px] w-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          )}
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-2">
            <p className="text-2xl font-semibold">
              {listing.name} - Rs{" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              /Day
            </p>

            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "intercity"
                  ? "Allowed intercity"
                  : "Not Allowed intercity"}
              </p>
              {listing.offer && (
                <p className=" bg-green-900 w-full max-w-[200px]  text-white text-center p-1 rounded-md line-through">
                  Rs{listing.regularPrice}/Day
                </p>
              )}
              {listing.available && (
                <p className=" bg-green-600 w-full max-w-[200px]  text-white text-center p-1 rounded-md ">
                  Driver Available
                </p>
              )}
            </div>

            <p className="flex items-center mt-2 gap-0.5 text-slate-800  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              <span className="font-semibold text-black">Pick Up :</span>
              {listing.address}
              <text>,</text>
              {listing.city}
            </p>
            <p className="flex items-center gap-2 text-slate-800  text-sm">
              <FaPhoneAlt className="text-green-700" />
              <span className="font-semibold text-black">Phone Number :</span>
              {listing.phoneNumber}
            </p>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description : </span>
              {listing.description}
            </p>

            <p className="text-slate-800">
              <span className="font-semibold text-black">Car Number : </span>
              {listing.CarNumber}
            </p>

            {listing.available && (
              <div>
                <p className="text-slate-800">
                  <span className="font-semibold text-black">
                    Driver Name :{" "}
                  </span>
                  {listing.DriverName}
                </p>

                <p className="text-slate-800">
                  <span className="font-semibold text-black">Experience: </span>
                  {listing.experience} Year
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
    </main>
  );
}
