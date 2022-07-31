import { useRef, useState } from "react";
import styles from "./index.module.css";
import useOnClickOutside from "src/hooks/useOnClickOutside";

function PopupMenu({ children, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  const handleOptionClick = (e, callback) => {
    setIsOpen(false);
    callback(e);
  };

  return (
    <div ref={ref}>
      <div onClick={handleClick} className={styles.content}>
        {children}
      </div>
      {isOpen && (
        <div className={styles.menuContainer}>
          <ul className={styles.menu}>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={(e) => handleOptionClick(e, option.onClick)}
              >
                <span>{option.label}</span>
                <div className={styles.icon}>{option.icon && option.icon}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PopupMenu;
