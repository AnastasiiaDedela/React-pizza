import ContentLoader from 'react-content-loader';

const PizzaSkeleton = () => (
  <ContentLoader
    className="pizza-item"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="117" cy="114" r="114" />
    <rect x="5" y="252" rx="10" ry="10" width="238" height="20" />
    <rect x="5" y="287" rx="10" ry="10" width="235" height="73" />
    <rect x="8" y="376" rx="9" ry="9" width="77" height="28" />
    <rect x="99" y="376" rx="25" ry="25" width="139" height="41" />
  </ContentLoader>
);

export default PizzaSkeleton;
