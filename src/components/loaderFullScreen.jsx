import {motion, AnimatePresence} from 'framer-motion';
import loader from '../images/loader/loader.gif';

export default function LoaderFullScreen({isLoading}) {
  return (
    <AnimatePresence>
        {isLoading && (
    <motion.div
    className='loader-full'
    initial={{opacity: 0, y: -100}}
    animate={{opacity: 1, y: 0}}
    exit={{
      opacity: 0, y: -100,
      display: 'none'
    }}
    >
        <div className='loader-msg'>
            <img src={loader} 
            alt='loader'
            style={{
              width: '80px',
            }}
             />
            waiting for transaction...
        </div>
    </motion.div>
        )}
    </AnimatePresence>
  )
}
