import React from 'react'
import '../assets/css/craft.scss'
import { motion } from "framer-motion";
const Craft = () => {

    return (
        <div id="craft" className='craft-section'>

            <div className="craft-header">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.55,
                            delay: 0.1,
                            ease: [0.23, 1, 0.32, 1],
                        },
                    }}
                    viewport={{ once: true, amount: 0.3 }}
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