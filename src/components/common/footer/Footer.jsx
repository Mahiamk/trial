import "./footer.css"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container'>
          <div className='box logo'>
            <img src='../images/tech-logo-footer.png' alt='' />
            <p>DP is an amazing magazine Blogger theme that is easy to customize for your needs</p>
            <i className='fa fa-envelope'></i>
            <span> <a href="amk0966@gmail.com">amk0966@gmail.com</a> </span> <br />
            <i className='fa fa-headphones'></i>
            <span> +251966007795</span>
          </div>
          <div className='box'>
            <h3>SPORT</h3>
            <div className='item'>
              <figure>
                <a href="https://www.fifa.com/en">
                <img src="./src/images/sport.png" alt='sport' />
                </a>
                <figcaption>Google To Boost Android Security In Few Days</figcaption>
              </figure>
              
            </div>
          </div>
          <div className='box'>
            <h3>TECH</h3>
            <div className='item'>
              <figcaption>
                <a href="https://www.reuters.com/technology/">
                <img src='./src/images/tech.png' alt='' />
                </a>
                <figcaption>Renewable energy dead as industry waits for Policy</figcaption>
              </figcaption>
            </div>
          </div>
          <div className='box'>
            <h3>LABELS</h3>
            {/*<i className='fa fa-chevron-right'></i>*/}
            <ul>
              <li>
                <span>Tech</span> <label>(5)</label>
              </li>
              <li>
                <span>Entertainment</span> <label>(6)</label>
              </li>
              <li>
                <span>Business</span> <label>(7)</label>
              </li>
              <li>
                <span>Sport</span> <label>(9)</label>
              </li>
              <li>
                <span>Health</span> <label>(9)</label>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal  '>
        <div className='container flexSB'>
          <p>© all rights reserved</p>
          <p>
            made with Alx<i className='fa fa-heart'></i> by amkmahi
          </p>
        </div>
      </div>
    </>
  )
}

export default Footer