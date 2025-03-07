import { useState } from "react";

const LayoutContainer = () => {
  const [activeItem, setActiveItem] = useState("");
  const [activeSubItem, setActiveSubItem] = useState("");

  const SetActiveItem= (text)=>{
    setActiveItem(text);
    setActiveSubItem(null);
  }
  const SetActiveSubItem= (text)=>{
    setActiveSubItem(text);
  }
  return {
    activeItem,
    SetActiveItem,
    activeSubItem,
    SetActiveSubItem,
  };
};

export default LayoutContainer;
