import React from 'react'
import BoardCard from '../components/boardCard/BoardCard'
import './page_css/home.css'
import { homeData } from '../staticData/homeData'

export default function Home() {

  return (
    <div>


        <h1 className='home-header-text'>
        Choose The Service
        </h1>
        <div className='home-header-underline' ></div>

        <BoardCard data={homeData} />
        
    </div>
  )
}
