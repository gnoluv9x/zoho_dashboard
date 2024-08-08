import React from "react";
import { LoaderStyled } from "./styled";

const Loader: React.FC<any> = () => (
  <LoaderStyled>
    <div className="loader">
      <div className="circles">
        <span className="one"></span>
        <span className="two"></span>
        <span className="three"></span>
      </div>
      <div className="pacman">
        <span className="top"></span>
        <span className="bottom"></span>
        <span className="left"></span>
        <div className="eye"></div>
      </div>
    </div>
  </LoaderStyled>
);

export default Loader;
