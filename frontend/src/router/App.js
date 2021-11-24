import React from 'react';
import { Switch, Route } from 'react-router-dom';

// antd
import { Layout } from 'antd';

// pages
import Main from 'pages/Main/index';
import SignUp from 'pages/SignUp/index';
import PlaceDetail from 'pages/PlaceDetail';
import MyPage from 'pages/MyPage';
import Inquery from 'pages/Inquery';
import InqueryWrite from 'pages/InqueryWrite';
import InqueryDetail from 'pages/InqueryDetail';
import InqueryEdit from 'pages/InqueryEdit';
import Schedule from 'pages/Schedule';
import Manager from 'pages/Manager';
import PlaceAdd from 'pages/PlaceAdd';
import PlaceEdit from 'pages/PlaceEdit';
import ManageOffice from 'pages/ManageOffice';
import AddOffice from 'pages/AddOffice';

// components
import Navbar from 'components/Navbar';
import Footer from 'components/Footer/index';

function App() {
  let Navigation =
    window.location.pathname === '/user/signup' ? '' : <Navbar />;
  let FooterContainer =
    window.location.pathname === '/user/signup' ? '' : <Footer />;

  return (
    <Layout style={{ width: '100vw', minWidth: '1400px' }}>
      {Navigation}
      <Switch>
        <Route path="/" exact component={Main} />

        <Route path="/user/signup" exact component={SignUp} />
        <Route path="/user/mypage/:id" exact component={MyPage} />

        <Route path="/manage/office" exact component={ManageOffice} />
        <Route path="/manage/office/add" exact component={AddOffice} />
        <Route path="/place/:id" exact component={PlaceDetail} />

        <Route path="/inquery" exact component={Inquery} />
        <Route path="/inquery/write" exact component={InqueryWrite} />
        <Route path="/inquery/edit/:id" exact component={InqueryEdit} />
        <Route path="/inquery/detail/:id" exact component={InqueryDetail} />

        <Route path="/schedule" exact component={Schedule} />
        <Route path="/manager" exact component={Manager} />
        <Route path="/manager/place/add" exact component={PlaceAdd} />
        <Route path="/manager/place/edit/:id" exact component={PlaceEdit} />
      </Switch>
      {FooterContainer}
    </Layout>
  );
}

export default App;
