import React from "react"
import { HomeSlider, HomeCategories, HomeFeaturedProducts } from "../components/index"

function Home() {

  return (
    <div>
      <HomeSlider />
      <HomeCategories />
      <HomeFeaturedProducts />
    </div>
  )
}

export default Home