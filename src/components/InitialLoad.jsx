import logo from '../images/logo/logo.png';
import { motion, AnimatePresence } from "framer-motion";

export default function InitialLoad(props) {
  return (
    <AnimatePresence>
        {props.loading && (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} 
    className="initialLoad">
        <img src={logo} alt="logo" />
    </motion.div>
        )}
    </AnimatePresence>
  )
}
