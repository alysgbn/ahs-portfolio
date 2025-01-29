import React from 'react'
import '../assets/css/craft.scss'
import { motion } from "framer-motion";
const Craft = () => {

    return (
        <div className='craft-section'>

            <div className="craft-header">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.6,
                            delay: 0.2,
                            ease: "easeInOut",
                        },
                    }}
                >
                    <div className="journey-header">
                        <p>CRAFTS</p>
                        <h1>Data Science test</h1>

                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Craft;