function Header() {
  return (
    <header>
      <div>
        <h4>영화 추천작을 소개받으세요</h4>
        <a href={`${process.env.PUBLIC_URL}/`}>King MovIe</a>
      </div>
    </header>
  );
}

export default Header;
