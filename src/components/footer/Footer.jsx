import React from 'react'
import './footer.css'

export default function Footer() {
  return (
    <div className='footer-div'>
        <div className='footer-left-div'>
            <div className='footer-left-content'>

            <div> 
                <h1 style={{color : "#1B2D55"}}>kIU</h1>
                <h1>SPACE</h1>
            </div>
            <div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur tenetur cumque sint corrupti ratione itaque velit, natus iusto ipsam soluta! Dignissimos doloribus corporis eaque enim nam autem iste qui accusamus.
                </p>
            </div>
            </div>
        </div>
        <div className='footer-cent-div'>
            <h4>contact us</h4>
            <ul>
                <li>Lorem ipsum dolor sit.</li>
                <li>Lorem ipsum dolor sit.</li>
                <li>Lorem ipsum dolor sit.</li>
                <li>Lorem ipsum dolor sit.</li>
            </ul>
        </div>
        <div className='footer-right-div'>
        <a href="https://www.facebook.com/"> facebook</a>
        <a href="https://www.x.com/"> twitter</a>
        <a href="https://www.linkedin.com/"> linkedIn</a>
        </div>
    </div>
  )
}
