import React, { useEffect, useState } from "react";
import NewsDetails from "../StudentDashboard/NewsDetails";
import NewsCard from "../../components/StudentDashboard/News/NewsCard";
import CreateNews from "../../components/NewsAdmin/CreateNews";
import CreateNewsPopup from "../../components/NewsAdmin/CreateNewsPopup";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getNews, updateNews, updateNewsSuccess } from "../../redux/Thunk/NewsThunk";
import { useWindowSize } from "react-use";

const NewsAdmin = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailsId, setDetailsId] = useState();
  const [openCreateNews, setOpenCreateNews] = useState(false);
  const [updatedNews, setUpdatedNews] = useState();
  const [editNews, setEditNews] = useState();
   const { width } = useWindowSize();

  const dispatch = useDispatch();

  const news = useSelector((state) => state.News.allNews);

  useEffect(() => {
    dispatch(getNews());
  }, []);
  useEffect(() => {
    if(updatedNews){
      dispatch(updateNews({new: false, _id: updatedNews}));
    }
      
  }, [updatedNews]);

  useEffect(() => {
    if (width > 1024) {
      setOpenCreateNews(false); // Close the modal if screen size is greater than 1024px
    }
  }, [width]);

  // useEffect(()=>{
  //   if((editNews || editNews==0) && width < 1024){
  //     setOpenCreateNews(true);
  //   }
  // },[editNews]);
 

  const handleOkCreateNews = () => {
    setOpenCreateNews(false);
  };
  const handleCancelCreateNews = () => {
    setOpenCreateNews(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between ">
        {showDetails ? "" : <h2 className="mb-7 text-[#2f3f68]">Actualités</h2>}
        {!showDetails && (
          <button
            onClick={() => setOpenCreateNews(true)}
            className="lg:hidden border-none bg-primary-blue text-white font-sans font-semibold p-2 text-sm rounded-md  inline-block"
          >
            <PlusOutlined /> Créer une actualité
          </button>
        )}
      </div>
      <div className="flex-row flex justify-between space-x-5 ">
        <div className="w-[100%] lg:w-[60%]">
          {/* <> */}
          {showDetails ? (
            <div>
              <NewsDetails
                news={news}
                setShowDetails={setShowDetails}
                detailsId={detailsId}
                user="admin"
                setEditNews={setEditNews}
                setOpenCreateNews={setOpenCreateNews}
                width={width}
              />
            </div>
          ) : (
            <>
              {news.map((newsItem, index) => (
                <div key={index}>
                  <NewsCard
                    id={index}
                    user="admin"
                    setShowDetails={setShowDetails}
                    newsItem={newsItem}
                    setDetailsId={setDetailsId}
                    setUpdatedNews={setUpdatedNews}
                    setEditNews={setEditNews}
                    setOpenCreateNews={setOpenCreateNews}
                    width={width}
                  />
                </div>
              ))}
            </>
          )}
          {/* </> */}
        </div>
        <div className="hidden lg:inline-block lg: flex-1 shadow-[1px_1px_30px_-15px_rgba(0,0,0,0.6)] rounded-xl p-6 h-fit">
          <h2 className="text-[#2f3f68] ">Créer une actualité</h2>
          <CreateNews
            setEditNews={setEditNews}
            editNews={editNews}
            news={news[editNews]}
            handleCancelCreateNews={handleCancelCreateNews}
          />
        </div>
        <div className="lg:hidden">
          <CreateNewsPopup
            openCreateNews={openCreateNews}
            handleOkCreateNews={handleOkCreateNews}
            handleCancelCreateNews={handleCancelCreateNews}
            setEditNews={setEditNews}
            editNews={editNews}
            news={news[editNews]}
            setOpenCreateNews={setOpenCreateNews}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsAdmin;
