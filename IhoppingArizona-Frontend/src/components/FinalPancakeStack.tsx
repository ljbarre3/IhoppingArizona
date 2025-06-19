import { motion } from "framer-motion";
// @ts-ignore
import PancakeIcon from '/Pancake-Stack.svg?react';

type FinalPancakeStackProps = {
    finalScore: number; // e.g. 37 out of 43
    maxScore?: number;
};

export function FinalPancakeStack({ finalScore, maxScore = 43 }: FinalPancakeStackProps) {
    const pancakes = Math.round((finalScore / maxScore) * 10);
    return (
        <div style={{ display: "flex", flexDirection: "column-reverse", alignItems: "center" }}>
            {Array.from({ length: pancakes }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * .5 }}
                    style={ {marginTop: -30}}
                >
                    <PancakeIcon width={40} height={40} />
                </motion.div>
            ))}
        </div>
    );
}