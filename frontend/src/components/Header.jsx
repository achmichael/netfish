function Header({ title, content, titleClassName, contentClassName }) {
    return (
      <div>
        <h1 className={titleClassName}>{title}</h1>
        <p className={contentClassName}>{content}</p>
      </div>
    );
  }
  
  export default Header;
  