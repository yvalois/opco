import React from 'react'
import { useEffect } from 'react'
import {motion, AnimatePresence} from 'framer-motion'

export default function ErrorMsg({error, setError, errorMsg}) {
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false);
            }
            , 5000);
        }
    }, [error]);

    const onClick = () => {
        setError(false);
    }



  return (
    <AnimatePresence>
        {error && (
    <motion.div 
    className='alertModal'
    initial={{opacity: 0, y: -100}}
    animate={{opacity: 1, y: 0}}
    exit={{opacity: 0, y: -100}}
    >

        <div className='alert-msg'>
            <p>{errorMsg.replace("execution reverted: BEP20:", "")}</p>
        </div>

    </motion.div>
        )}
    </AnimatePresence>
  )
}
