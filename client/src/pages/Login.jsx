import React from "react";
// import issat img
import issat from "../assets/issat.svg";
import drapeau from "../assets/drapeau.svg";
// import form
import Form from "../components/Login/Myform";
// import connected component
import Connected from "../components/Login/Connected";
import profile from "../assets/profile.svg";
import profileZiz from "../assets/profile zizou.svg";
import profileah from "../assets/profile ah.svg";
import profilehay from "../assets/profile hay.svg";
const Login = () => {
  return (
    <div className="xl:relative">
      <div className="bg-[#3366FF] rounded-3xl h-[50vh]">
        <nav className="flex items-center justify-between px-10">
          <img src={issat} alt="issat"  />
          <img src={drapeau} alt="drapeau" />
        </nav>
        <div className="m-auto w-[70vw] lg:w-[50vw] text-center xl:text-start  text-white xl:w-[25vw] xl:ml-16 mt-8 xl:m-14 leading-4">
          <h1 className="text-white font-semibold font-sans">ISSATSO+</h1>
          <p className="font-sans leading-5 text-sm">
            Votre hub pour l'apprentissage en ligne. Connectez-vous pour
            explorer vos cours et organiser votre emploi du temps !
          </p>
        </div>
      </div>
      <div className="xl:absolute pb-10 xl:pb-0 m-auto -translate-y-20 xl:translate-y-0 w-[70vw] md:w-[50vw] xl:w-[27vw] h-[75vh] bg-white rounded-3xl shadow-2xl xl:top-20 xl:right-32 ">
        <div className="flex flex-col items-center">
          <div className="text-center mb-6 leading-4 mt-10">
            <h1 className="font-medium font-sans">Bienvenu(e)</h1>
            <p className="text-gray-600 font-sans text-sm">
              Veuillez saisir vos paramètres d'accés !
            </p>
          </div>
          <Form />
        </div>
      </div>
      <div className="sm:ml-16 xl:mt-8">
        <p className="font-semibold font-sans ml-10 sm:ml-0">Connecter en tant que: </p>
        <div className="flex flex-wrap items-center justify-evenly xl:justify-start  xl:space-x-10">
          <Connected  profile={profileah} name={"Ahmed Elghoula"}/> 
          <Connected  profile={profile} name={"Seif Khelifi"}/> 
          <Connected  profile={profileZiz} name={"Zeineb Rejeb"}/> 
          <Connected  profile={profilehay} name={"Haythem Zaaber"}/> 
          
         
        </div>
      </div>
    </div>
  );
};

export default Login;
