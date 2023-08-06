import { MagnifyingGlass } from 'react-loader-spinner';
import css from './Loader.module.css';
import PropTypes from 'prop-types';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <MagnifyingGlass
        visible={true}
        height="100"
        width="100"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#3f51b5"
      />
    </div>
  );
};

MagnifyingGlass.propTypes = {
  visible: PropTypes.bool.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  wrapperStyle: PropTypes.object.isRequired,
  wrapperClass: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  glassColor: PropTypes.string.isRequired,
};
