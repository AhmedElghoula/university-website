import React, { useEffect, useState } from "react";
import NewsDetails from "../StudentDashboard/NewsDetails";
import NewsCard from "../../components/StudentDashboard/News/NewsCard";
import CreateNews from "../../components/NewsAdmin/CreateNews";
import { CaretRightOutlined } from "@ant-design/icons";
import CreateNewsPopup from "../../components/NewsAdmin/CreateNewsPopup";
import { PlusOutlined } from "@ant-design/icons";
import CourseForm from "../../components/Teacher/CourseForm";
import { Collapse, Spin, theme } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import FileCard from "../../components/FileCard";
import AddCoursePopup from "../../components/Teacher/AddCoursePopup";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/Thunk/TeacherThunk";

const CourseDeposit = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    dispatch(getAllCourses(setloading));
  }, []);
  const courses = useSelector((state) => ({
    ...state.Teacher.courses,
  }));
console.log(courses)
 

  const [openCreateNews, setOpenCreateNews] = useState(false);

  const handleOkCreateNews = () => {
    setOpenCreateNews(false);
  };
  const handleCancelCreateNews = () => {
    setOpenCreateNews(false);
  };
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const items = [
    {
      key: "1",
      label: "This is panel header 1",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <p>{text}</p>,
    },
  ];
  const yourData = [
    { title: "Panel 1 Content", content: "This is the content of panel 1" },
    { title: "Panel 2 Content", content: "This is the content of panel 2" },
    { title: "Panel 3 Content", content: "This is the content of panel 2" },
  ];

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: "#E9EFFF",
    // borderRadius: token.borderRadiusLG,
    border: "none",
  };
  return (
    <div>
      <div className="flex items-center justify-between ">
        <h2 className="text-[#2f3f68]">Dépôt cours</h2>
        <button
          onClick={() => setOpenCreateNews(true)}
          className="lg:hidden border-none bg-primary-blue text-white font-sans font-semibold p-2 text-sm rounded-md  inline-block"
        >
          <PlusOutlined /> Ajouter cours
        </button>
      </div>
      <div className="flex flex-col-reverse lg:flex-row lg:flex justify-between space-x-10 font-sans ">
        <div className="lg:w-[60%]">
          <>
            {" "}
            {loading ? (
              <div className=" flex justify-center md:mt-28 md:mb-28">
                <Spin size="large" className="" />
              </div>
            ) : (
              <Collapse
                accordion
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                
                className=" bg-white border-0 flex flex-col gap-5"
              >
                {courses?.result?.map((item) =>
                  item?.subjects.map((course) => (
                    <CollapsePanel
                      className="bg-light-blue text-white  rounded-md border-primary-blue "
                      header={item.name + " / " + course?.name}
                      key={item.name}
                    >
                      <div className="flex flex-col gap-2">
                        <span className="text-[#676767] text-xs">
                          Dans cette filière :{" "}
                        </span>
                        <div className="flex   justify-items-start gap-4 flex-wrap">
                          {course?.courses?.map((card) => (
                            <FileCard key={card._id} files={card.file}  name={card.name} id={card._id}/>
                          ))}
                        </div>
                      </div>
                    </CollapsePanel>
                  ))
                )}
                
              </Collapse>
              
            )}
          </>
        </div>
        <div className="hidden lg:inline-block lg:w-[40%] ">
          <h2 className="text-[#2f3f68] ">Ajouter cours</h2>
          <CourseForm handleCancelCreateNews={handleCancelCreateNews} />
        </div>
        <div className="lg:hidden">
          <AddCoursePopup
            openCreateNews={openCreateNews}
            handleOkCreateNews={handleOkCreateNews}
            handleCancelCreateNews={handleCancelCreateNews}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDeposit;
