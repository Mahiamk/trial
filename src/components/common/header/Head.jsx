import newsApi from "../../../api/newsApi";
const Head = () => {
  const news = newsApi.fetchNews();
  console.log("news", news);
  return (
    <>
      <section className='head'>
        <div className='container flexSB paddingTB'>
          <div className='logo'>
            <img src='/src/images/logo.png' alt='logo' />
          </div>
          <div className='ad'>
            <h1>DAILY-PULSE</h1>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head;