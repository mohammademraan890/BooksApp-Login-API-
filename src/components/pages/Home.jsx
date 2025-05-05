import ArticlesSec from "../pages/ArticlesSec"
import FeatureSec from "../pages/FeatureSec"
import HeroSlider from "../HeroSlider"
import React, { useEffect } from "react"

const Home = () => {
  useEffect(()=>{
    document.title="Home || BookSaw"
  },[])
  return (
    <>
      <HeroSlider/>
      <FeatureSec/>
      <ArticlesSec/>
    </>
  )
}

export default React.memo(Home);
