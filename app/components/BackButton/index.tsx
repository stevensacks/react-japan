import type {FC} from 'react';
import {faLeftLong} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useLocation, useNavigate} from '@remix-run/react';

const BackButton: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const back = location.pathname.startsWith('/en') ? 'Back' : '戻る';

    return (
        <button
            className="plain-link hover:text-red-600 hover:underline dark:hover:text-red-500"
            onClick={() => navigate(-1)}
            type="button"
        >
            <FontAwesomeIcon icon={faLeftLong} />
            &nbsp; {back}
        </button>
    );
};

export default BackButton;
