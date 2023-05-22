import '../style/style_loader.css';
import FadeLoader from 'react-spinners/FadeLoader';
import { BsCheckCircle } from 'react-icons/bs';
import { motion, AnimatePresence } from "framer-motion";
import { BiErrorAlt } from 'react-icons/bi';
import { useEffect } from 'react';


export default function ExchangeLoading(props) {



    useEffect(() => {
        if (props.success) {
            setTimeout(() => {
                props.setLoader(false);
            }, 2000);
        }
    }, [props.success])

    useEffect(() => {
        if (props.success|| props.error) {
            setTimeout(() => {
                props.setLoader(false);
            }, 2000);
        }
    }, [props.success, props.error])



    return (
        <>
            <AnimatePresence>
                {props.loader && (
                    <motion.div
                        className="exchange-loader"
                        initial={{ x: '100px' }}
                        animate={{ x: 0 }}
                        exit={{ x: '500px' }}
                    >
                        {props.success ?
                            <>
                                <BsCheckCircle className="exchange-loader-icon" />
                                <p>transacción exitosa</p>
                            </>
                            :
                            <>
                                {props.error ?
                                    <>
                                        <BiErrorAlt className="exchange-loader-icon" /><p>error de transacción</p>
                                    </>
                                    :
                                    <>
                                        <FadeLoader color="#ffffff" speedMultiplier={1} size={100} /> <p>efectuando transacción</p>
                                    </>
                                }
                            </>
                        }

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
