import '../styles/Loader.css'

//Экран загрузки
const Loader = () => {

  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <div className="loader-text">Загрузка...</div>
    </div>
  );
};

export default Loader;
