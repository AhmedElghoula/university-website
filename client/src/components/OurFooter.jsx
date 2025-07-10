import React from 'react'
import { Layout, } from "antd";
const {  Footer } = Layout;
const OurFooter = () => {
  return (
    <Footer
    style={{
      textAlign: "center",
    }}
  >
   Fabriqué avec ❤️ {new Date().getFullYear()} Créé par SHAZ Grp
  </Footer>
  )
}

export default OurFooter