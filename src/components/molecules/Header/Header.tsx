import React, {FC} from "react";
import {useSelector} from "react-redux";
import {Button} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {User} from "../../../domain";
import {selectUser} from "../../../store/user/selectors";
import {selectAuthState} from "../../../store/auth/selectors";
import styles from './styles.module.css';
import {useAppDispatch} from "../../../store";
import {handleLogout} from "../../../store/auth/authSlice";
import {clearUser} from "../../../store/user/userSlice";
import {Routes} from '../../../constants/routes'

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleLogin = () => {
    dispatch(handleLogout());
    dispatch(clearUser());

    history.replace(Routes.DASHBOARD);
  }

  const {isLogged} = useSelector(selectAuthState);
  const user: User | null = useSelector(selectUser);

  return (
    <div className={styles.header}>
      <div className={styles.header__group}>
        {isLogged
          ? (<h2 className={styles.header__email}>{user?.email}</h2>)
          : (<Link to={Routes.LOGIN}><Button variant="contained">Login</Button></Link>)
        }
        {isLogged && (<Button variant="contained" onClick={handleLogin}>Logout</Button>)}
      </div>
      <div className={styles.header__features}>
        <Button variant="contained" className={styles.header__email}>+</Button>
        <Button variant="contained" color="success">Scheduled</Button>
      </div>
    </div>
  );
};

export default Header;
