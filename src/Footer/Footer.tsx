import './Footer.css';

function Footer() {
  return (
    <div className="Footer_container">
      <h3>Yeahub</h3>
      <p className="Footer_subtitle">Выбери, каким будет IT завтра, вместе с нами</p>
      <p className="Footer_text">
        YeaHub — это полностью открытый проект, призванный объединить и улучшить IT-сферу.
        Наш исходный код доступен для просмотра на GitHub. Дизайн проекта также открыт для ознакомления в Figma.
      </p>

      <div className="Footer_bottom">
        <span>© 2024 YeaHub Документы</span>
        <span>Ищите нас и в других соцсетях @yeahub_it</span>
      </div>
    </div>
  );
}

export default Footer;