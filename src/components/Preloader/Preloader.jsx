import './Preloader.css'

function Preloader() {
  return (
    <div className="preloader" role="status" aria-live="polite">
      <div className="circle-preloader"></div>
      <p className="preloader__text">Searching for news...</p>
    </div>
  )
}

export default Preloader
