import Header from './Header';
import { Outlet } from 'react-router-dom';

function Parent() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Parent;
