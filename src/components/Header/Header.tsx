import React, { type FC } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/hooks/hooks';
import { COLORS } from '@/constants/styles';

const Wrapper = styled.header`
  padding: 1rem;
  border-bottom: solid 1px ${COLORS.HeaderBorder};
`;

const Nav = styled.nav`
  color: ${COLORS.HeaderText};
`;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
`;

const Li = styled.li`
  list-style: none;
  transition: all 0.3s ease-out;

  &:hover {
    transform: scale(1.01);
    opacity: 0.95;
  }

  &:has(a.active) {
    transform: scale(1);
    opacity: 1;
  }

  & a {
    font-size: 1.25rem;
    font-weight: bold;
  }

  & a.active {
    color: ${COLORS.HeaderTextActive};
    cursor: default;
  }
`;

const Header: FC = () => {
  const { navPaths } = useAppSelector((state) => state.app);

  return (
    <Wrapper>
      <Nav>
        <Ul>
          {navPaths.map((pathEl, ind) => (
            <Li key={ind}>
              <NavLink
                to={pathEl.path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {pathEl.name}
              </NavLink>
            </Li>
          ))}
        </Ul>
      </Nav>
    </Wrapper>
  );
};

export default Header;
