import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import Notify from './Notify';
import Modal from './Modal'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { DataContext } from '../store/GlobalState'

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`

function Layout({children}) {
  const { state, dispatch } = useContext(DataContext)

  const { scrollScreen } = state
  
  // const isSrollScreen = () => {
  //   if(scrollScreen) setScroll('hidden')
  //   setScroll('visible')
  // }

  return (
    <Container>
        <Navbar/>
        <Notify/>
        <Modal/>
        {
          scrollScreen && <Sidebar/>
        } 
        {children}
        <Footer/>
    </Container>
  );
}

export default Layout;
