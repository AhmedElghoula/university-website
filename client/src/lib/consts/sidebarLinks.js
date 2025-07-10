import React from "react";

import DashboardIcon from "../../assets/DashboardIcon";
import CourseIcon from "../../assets/CourseIcon";
import TimeTableIcon from "../../assets/TimeTableIcon";
import CalenderIcon from "../../assets/CalenderIcon";
import OffreIcon from "../../assets/OffreIcon";
import ProfileIcon from "../../assets/ProfileIcon";
import LogoutIcon from "../../assets/LogoutIcon";
import FormationsIcon from "../../assets/FormationsIcon";
import Accounts from "../../assets/AccountsIcon";

export const SUPERADMIN_DASHBOARD_LINKS = [
  {
    key: "home",
    text: "Acceuil",
    link: "/",
    icon: React.createElement(DashboardIcon, {
      link: "/",
    }),
  },
  {
    key: "accounts",
    text: "comptes",
    link: "/comptes",
    icon: React.createElement(Accounts, {
      link: "/comptes",
    }),
  },
  {
    key: "formation",
    text: "Formation",
    link: "/formation",
    icon: React.createElement(FormationsIcon, {
      link: "/formation",
    }),
  },
];

export const STUDENT_DASHBOARD_LINKS = [
  {
    key: "home",
    text: "Acceuil",
    link: "/",
    icon: React.createElement(DashboardIcon, {
      link: "/",
    }),
  },
  {
    key: "courses",
    text: "Cours",
    link: "/courses",
    icon: React.createElement(CourseIcon, {
      link: "/courses",
    }),
  },
  {
    key: "timetable",
    text: "Emploi du temps",
    link: "/timetable",
    icon: React.createElement(TimeTableIcon, {
      link: "/timetable",
    }),
  },
  {
    key: "calendar",
    text: "Calendrier",
    link: "/calendar",
    icon: React.createElement(CalenderIcon, {
      link: "/calendar",
    }),
  },
  {
    key: "offres",
    text: "Offres de Stages",
    link: "/offres",
    icon: React.createElement(OffreIcon, {
      link: "/offres",
    }),
  },
];

export const NEWSADMIN_DASHBOARD_LINKS = [
  {
    key: "home",
    text: "Acceuil",
    link: "/",
    icon: React.createElement(DashboardIcon, {
      link: "/",
    }),
  },
  {
    key: "news",
    text: "Actualités",
    link: "/news",
    icon: React.createElement(DashboardIcon, {
      link: "/news",
    }),
  },
];

export const TEACHER_DASHBOARD_LINKS = [
  {
    key: "home",
    text: "Acceuil",
    link: "/",
    icon: React.createElement(DashboardIcon, {
      link: "/",
    }),
  },
  {
    key: "depotCours",
    text: "Dépôt Cours",
    link: "/depotCours",
    icon: React.createElement(CourseIcon, {
      link: "/depotCours",
    }),
  },
  {
    key: "timetable",
    text: "Emploi du temps",
    link: "/timetable",
    icon: React.createElement(TimeTableIcon, {
      link: "/timetable",
    }),
  },  
  {
    key: "calendar",
    text: "Calendrier",
    link: "/calendar",
    icon: React.createElement(CalenderIcon, {
      link: "/calendar",
    }),
  },
];
