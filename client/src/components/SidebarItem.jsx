import React from "react";
import { Link } from "react-router-dom";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from  "../redux/Slicer/AuthSlice";

const SidebarItem = ({ icon, link, text, active, alert, collapsed,onclick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleclick=() => {
    dispatch(logout()) 
    navigate("/login")
  }
  return (
    <>
      <Link to={link}>
        <li
        onClick={ text =='Déconnecter'? handleclick: undefined}
          className={`relative flex items-center py-2 pr-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${

            location.pathname == link
              ? " from-indigo-200 to-indigo-100 text-primary-blue"
              : "hover:bg-indigo-50 text-primary-gray"
          }
          ${text =='Déconnecter'?" from-indigo-200 to-indigo-100 text-primary-red":"hover:bg-indigo-50 text-primary-gray"}
          
          `}
        >
          <div
            className={` ${
             
              location.pathname == link
                ? "border h-10 w-1 bg-primary-blue rounded-sm"
                : ""
            } `}
          ></div>
          <div
            className={`  p-2 ${
              location.pathname == link
                ? " bg-primary-blue bg-opacity-20  rounded-lg  "
                : "hover:bg-indigo-50 text-primary-gray "
            }
            ${
              collapsed ? "ml-5 " : " ml-6 "
            }  
            
            `
          
          }
          >
            {icon}
          </div>

          <span
            className={`overflow-hidden transition-all ${
              collapsed ? "w-0" : "ml-3"
            }`}
          >
            {text}
          </span>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                collapsed ? "top-2" : ""
              }`}
            ></div>
          )}

          {/* {!collapsed && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )} */}
        </li>
      </Link>
    </>
  );
};

export default SidebarItem;
