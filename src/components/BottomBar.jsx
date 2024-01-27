import React from 'react'
import { Link, useLocation  } from 'react-router-dom';
import home from '../images/home.png'
import profile from '../images/profile.png'
import host_stack from '../images/stack-host-unclicked.png'
import help_stack from '../images/stack-help-unclicked.png'
import bbadd from '../images/bbadd.png'


function BBHomeButton (){

    return(
        <div>
            <Link className='bottom-bar-link' to='/'>
                <img src={home} alt="" className='bottom-bar-img' style={{width: "21.8px", height: "20px"}}  />
                <p className='bottom-bar-p' >Home</p>
            </Link>
        </div>
    )
} 
function BBLoginButton (){

    return(
        <div>
            <Link className='bottom-bar-link' to='/login'>
                <img src={profile} alt="" className='bottom-bar-img' style={{width: "21.8px", height: "20px"}}  />
                <p className='bottom-bar-p' >Log in</p>
            </Link>
        </div>
    )
} 
function BBProfile (){
    const nickName = localStorage.getItem('nickname');

    return(
        <div>
            <Link className='bottom-bar-link' to={`/profile/${nickName}`}>
                <img src={profile} alt="" className='bottom-bar-img' style={{width: "17px", height: "19px"}}  />
                <p className='bottom-bar-p' >Profile</p>
            </Link>
        </div>
    )
} 
function BBStack (){
    const currentUrl = window.location.href;
    const isKiuHost = currentUrl.endsWith('/kiuHost');
    const isKiuHelp = currentUrl.endsWith('/kiuHelp');
    return(
        <div>
            {isKiuHelp? (
                <Link className='bottom-bar-link' to='/kiuHost'>
                    <img src={help_stack} alt="" className='bottom-bar-img' style={{width: "21.8px", height: "20px"}}  />
                    <p className='bottom-bar-p' >BBStack</p>
                </Link>
            ) :  (
                <Link className='bottom-bar-link' to='/kiuHelp'>
                    <img src={host_stack} alt="" className='bottom-bar-img' style={{width: "21.8px", height: "20px"}}  />
                    <p className='bottom-bar-p' >BBStack</p>
                </Link>   
            )}

        </div>
    )
} 
function BBAdd (){

    const currentUrl = window.location.href;
    const isKiuHost = currentUrl.endsWith('/kiuHost');
    const isKiuHelp = currentUrl.endsWith('/kiuHelp');
    return(
        <div>
            {isKiuHelp? (
                <Link className='bottom-bar-link' to='/addPost'>
                    <img src={bbadd} alt="" className='bottom-bar-img' style={{width: "21.8px", height: "20px"}}  />
                    <p className='bottom-bar-p' >Add</p>
                </Link>
            ) :  (
                <Link className='bottom-bar-link' to='/addProduct'>
                    <img src={bbadd} alt="" className='bottom-bar-img' style={{width: "21.8px", height: "20px"}}  />
                    <p className='bottom-bar-p' >Add</p>
                </Link>   
            )}

        </div>
    )
} 

function BottomBar() {
    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('nickname');
    const isHome = location.pathname === '/';
  
    let buttons;
  
    if (!isLoggedIn && isHome) {
      buttons = [<BBHomeButton />, <BBLoginButton />];
    } else if (isLoggedIn && isHome) {
      buttons = [<BBHomeButton />, <BBProfile />];
    } else if (isLoggedIn && !isHome) {
      buttons = [<BBHomeButton />, <BBStack />, <BBAdd />, <BBProfile />];
    } else {
      buttons = null; // Or any default buttons if needed
    }
  
    return <div className='bottom-bar-subdiv'>{buttons && buttons.map((component, index) => (
      <React.Fragment key={index}>{component}</React.Fragment>
    ))}</div>;
  }
  
  export default BottomBar;