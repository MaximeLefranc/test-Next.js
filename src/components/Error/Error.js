// PropTypes
import PropTypes from 'prop-types';

// Styles
import style from './Error.module.scss';

export default function Error({ message }) {
  return <div className={style.error}>{message}</div>;
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
