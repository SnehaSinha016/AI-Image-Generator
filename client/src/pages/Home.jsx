import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import Card from '../components/Card';
import FormField from '../components/FormField';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img6 from '../assets/img6.png';
import img7 from '../assets/img7.png';
import img8 from '../assets/img8.png';
import img9 from '../assets/img9.png';
import img10 from '../assets/img10.png';

const RenderCards = ({ data, title, excludePhoto }) => {
  const filteredData = excludePhoto
    ? data.filter((post) => post.photo !== excludePhoto)
    : data;

  if (filteredData?.length > 0) {
    return (
      <>
        {filteredData.map((post) => (
          <Card key={post._id} {...post} />
        ))}
      </>
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [excludePhoto, setExcludePhoto] = useState('');
  const [currentImage, setCurrentImage] = useState('');

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  useEffect(() => {
    if (location.state?.excludePhoto) {
      setExcludePhoto(location.state.excludePhoto);
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentImage(images[0]);
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const nextIndex = (images.indexOf(prev) + 1) % images.length;
        return images[nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post');
        if (response.ok) {
          const result = await response.json();

          const uniqueMap = new Map();
          for (const post of result.data) {
            const key = `${post.prompt}-${post.photo}`;
            if (!uniqueMap.has(key)) {
              uniqueMap.set(key, post);
            }
          }

          setAllPosts(Array.from(uniqueMap.values()).reverse());
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
    if(location.state?.refresh){
      window.history.replaceState({},document.title);
    }
  }, [location.state]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchresults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.prompt.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchedResults(searchresults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto dark:bg-gray-800 dark:text-white">
      <div>
        <h1 className="font-extrabold text-[#222328] dark:text-white text-[32px]">The Community Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning images.
        </p>
      </div>

      <div
        className="w-full mt-10 rounded-xl transition-all duration-1000 dark:text-black bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${currentImage})`,
          height: '400px',
          padding: '2rem',
        }}
      >
        <div className="w-full max-w-2xl bg-white bg-opacity-80 p-6 rounded-xl dark:text-black shadow-lg">
          <FormField
            labelName="Search posts"
            type="text"
            name="text"
            placeholder="Search posts"
            value={searchText}
            handleChange={handleSearchChange}
            inputClassName="dark:text-black"
          />

          <div className="flex justify-center mt-4 animate-bounce">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              <RenderCards
                data={searchText ? searchedResults : allPosts}
                title={searchText ? 'No search results found' : 'No posts found'}
                excludePhoto={excludePhoto}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
