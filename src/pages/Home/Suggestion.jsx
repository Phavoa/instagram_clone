import profilepic from '../../assets/lucas.png'
import profilepic5 from '../../assets/tomaska.png'
import profilepic4 from '../../assets/elrani.png'
import profilepic3 from '../../assets/rikki.png'
import profilepic2 from '../../assets/laura.png'

const Suggestion = () => {
  return (

    <div className='follows-container'>
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
        </div>
  )
}

export default Suggestion