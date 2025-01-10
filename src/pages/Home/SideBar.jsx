import logo from '../../assets/igm-logo.png'
import './styles/SideBar.css'
// import profilepic from '../../assets/lucas.png'
// import profilepic5 from '../../assets/tomaska.png'
// import profilepic4 from '../../assets/elrani.png'
// import profilepic3 from '../../assets/rikki.png'
// import profilepic2 from '../../assets/laura.png'
import Suggestion from './Suggestion'





const SideBar = () => {
  return (
    <div className='sidebar-container'>
        <header className='header-container'>
            <div className='header-logo-wrapper'>
            <img className='header-logo' src={logo} alt="logo" />
            </div>

            <div className='header-content'>
                <p className='header-p1'>mediamodifier</p>
                <p className='header-p2'>Mediamodifier.Building Brands</p>
            </div>

            <div className='header-switch'>
                <p className='switch'>Switch</p>
            </div>
        </header>



        <div className='sugg-container'>
            <p className='sugg-p1'>Suggestions For You</p>
            <p className='sugg-p2'>See All</p>
        </div>

        <Suggestion/>

        {/* <div className='follows-container'>
            <div className='follower-profile-container'>
                <div className='pp-container'>
                    <img src={profilepic} alt="profilepic" className='pp' />
                </div>

                <div className='profile-content-container'>
                    <p className='profile-content1'>lucas</p>
                    <p className='profile-content2'>Followed by mark + 2 more</p>
                </div>

                <div className='follow'>
                    <a className='follow-text'>Follow</a>
                </div>
            </div>

            <div className='follower-profile-container'>
                <div className='pp-container'>
                    <img src={profilepic2} alt="profilepic2" className='pp' />
                </div>

                <div className='profile-content-container'>
                    <p className='profile-content1'>laura</p>
                    <p className='profile-content2'>Followed by bradon + 6 more</p>
                </div>

                <div className='follow'>
                    <a className='follow-text'>Follow</a>
                </div>
            </div>

            <div className='follower-profile-container'>
                <div className='pp-container'>
                    <img src={profilepic3} alt="profilepic3" className='pp' />
                </div>

                <div className='profile-content-container'>
                    <p className='profile-content1'>rikki</p>
                    <p className='profile-content2'>Followed by mik + 1 more</p>
                </div>

                <div className='follow'>
                    <a className='follow-text'>Follow</a>
                </div>
            </div>

            <div className='follower-profile-container'>
                <div className='pp-container'>
                    <img src={profilepic4} alt="profilepic4" className='pp' />
                </div>

                <div className='profile-content-container'>
                    <p className='profile-content1'>elrani</p>
                    <p className='profile-content2'>Followed by ednamanz + 1 more</p>
                </div>

                <div className='follow'>
                    <a className='follow-text'>Follow</a>
                </div>
            </div>

            <div className='follower-profile-container'>
                <div className='pp-container'>
                    <img src={profilepic5} alt="profilepic5" className='pp' />
                </div>

                <div className='profile-content-container'>
                    <p className='profile-content1'>tomaska</p>
                    <p className='profile-content2'>Followed by katarinasterling + 2 m...</p>
                </div>

                <div className='follow'>
                    <a className='follow-text'>Follow</a>
                </div>
            </div>
        </div> */}


        <div className='footer-container'>
            <div className='footer-content-container'>
                <p>About</p>
                <p>Press</p>
                <p>API</p>
                <p>Jobs</p>
                <p>Privacy</p>
                <p>Terms</p>
                <p>Locations</p>
                <p>Top Accounts</p>
                <p>Hashtags</p>
                <p>Language</p>
            </div>

            <div className='last-footer'>
                <p className='last-footer-text'>© 2021 INSTAGRAM FROM META</p>
            </div>
        </div>

    </div>
  )
}

export default SideBar
