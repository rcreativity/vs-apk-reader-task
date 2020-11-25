import styled from 'styled-components';

const Header = styled.header`
  background-color: #505050;
  padding: 15px;
`

const NavBar = styled.nav``

const NavBarUl = styled.ul`
  list-style: none;
  display: flex;
  text-align: right;
  margin-left: auto;
`

const NavBarLi = styled.li`
  &:first-child {
    margin-left: auto;
  }
  &:last-child {
    margin-right: 50px;
  }
  margin: 5px;

  a {
    text-decoration: none;
    color: #fff;
    transition: all 500ms;

    &:hover {
      color: orange;
    }
  }
  
`

export {
  Header,
  NavBar,
  NavBarUl,
  NavBarLi
}