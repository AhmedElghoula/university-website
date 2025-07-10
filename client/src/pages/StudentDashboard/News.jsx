import React, { useEffect, useState } from "react";
import NewsCard from "../../components/StudentDashboard/News/NewsCard";
import NewsDetails from "./NewsDetails";
import { useDispatch, useSelector } from "react-redux";
import { getNews, updateNews } from "../../redux/Thunk/NewsThunk";

const News = () => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [detailsId, setDetailsId] = useState();
  const [updatedNews, setUpdatedNews] = useState()
  const news = useSelector((state) => state.News.allNews);
 

  useEffect(() => {
    dispatch(getNews());
    
  }, []);

  useEffect(()=>{
    dispatch(updateNews({new:false, _id:updatedNews}))
  },[updatedNews])


  return (
    <>
      {showDetails ? (
        <div>
          <NewsDetails
            news={news}
            setShowDetails={setShowDetails}
            detailsId={detailsId}
          />
        </div>
      ) : (
        <>
          <h2 className="px-3 text-[#2f3f68]">Actualités</h2>
          {news.map((newsItem, index) => {
            console.log(newsItem);
            return (
              <div>
                <NewsCard
                  key={index}
                  id={index}
                  user="student"
                  setShowDetails={setShowDetails}
                  newsItem={newsItem}
                  setDetailsId={setDetailsId}
                  setUpdatedNews={setUpdatedNews}
                />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default News;
