import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import AnimatedBg from 'react-animated-bg';

export default function Navigation() {
  return (
    <>
      <AnimatedBg
        colors={[
          '#dddddd',
          '#fffebf',
          '#bef8a7',
          'rgba(3, 105, 34, 0.502)',
          '#a1fcf0',
          '#c9b3fa',
          '#f5c3ee',
          '#f5c3c3',
        ]}
        duration={2}
        delay={0}
        timingFunction="ease-out"
        className="animated-section"
      >
        <nav className={s.nav}>
          <NavLink
            exact
            to="/"
            className={s.link}
            activeClassName={s.activeLink}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={s.link}
            activeClassName={s.activeLink}
          >
            Movies
          </NavLink>
        </nav>
        <hr></hr>
      </AnimatedBg>
    </>
  );
}
