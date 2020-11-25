import React from 'react'
import { Link } from "react-router-dom";
import { Header, NavBar, NavBarUl, NavBarLi } from './styled'

export default function HeaderSection() {
  return (
    <Header>
      <NavBar>
        <NavBarUl>
          <NavBarLi>
            <Link to="/">Submit APK File</Link>
          </NavBarLi>
          <NavBarLi>
            <Link to="/show-all">Show All</Link>
          </NavBarLi>
        </NavBarUl>
      </NavBar>
    </Header>
  )
}
