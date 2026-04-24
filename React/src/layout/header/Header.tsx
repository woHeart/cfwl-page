import styles from './Header.module.css';
import { Button } from 'antd';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const { username, isLogin, logout } = useUserStore();
    const toLogin = () => {
        navigate('/login');
    }

    return (
        <div className={styles.header}>
            {isLogin ? (
                <>
                    <span>{username}</span>
                    <Button
                        color="default"
                        variant="link"
                        size="small"
                        className={styles.btn}
                        onClick={logout}
                    >
                        退出
                    </Button>
                </>
            ) : (
                <Button
                    color="default"
                    variant="link"
                    size="small"
                    className={styles.btn}
                    onClick={toLogin}
                >
                    登录
                </Button>
            )}
        </div>
    );
}

export default Header;