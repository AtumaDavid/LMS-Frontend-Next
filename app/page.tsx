"use client";

import Heading from "./utils/Heading";
import Header from "./components/Header";
import { useState } from "react";
import Hero from "./components/Home/Hero";

// interface Props {}

export default function Page() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  console.log(setActiveItem);

  return (
    <div>
      <Heading
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prrogramming, MERN, Redux, Machine Learning"
      />
      <Header
        open={open}
        activeItem={activeItem}
        setOpen={setOpen}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
    </div>
  );
}
