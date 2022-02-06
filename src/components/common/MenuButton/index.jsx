import { useState } from "react";
import styles from "./index.module.css";
import SideBar from "@components/common/SideBar";
import MenuIcon from "@assets/icons/menu.svg";
import { motion, AnimatePresence } from "framer-motion";

function MenuButton() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <MenuIcon
        width="40px"
        height="40px"
        className={styles["menu-button"]}
        onClick={() => setMenuOpen(!isMenuOpen)}
        alt="Menu"
      />
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: "circOut" }}
            style={{ position: "absolute", top: 0, width: "100%", zIndex: 1 }}
          >
            <SideBar setMenuOpen={setMenuOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MenuButton;
