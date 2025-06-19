import React from 'react';
// @ts-ignore
import PancakeIcon from "../assets/Pancake-Stack.svg?react";

type PancakeStackProps = {
    count: number; // how many pancakes to show
    max?: number; // total possible pancakes (e.g., 10)
    size?: number; // icon size
};



const PancakeStack: React.FC<PancakeStackProps> = ({ count, max = 10, size = 32 }) => {
    const filled = Array(count).fill(true);
    const empty = Array(max - count).fill(false);

    return (
        <div style={{ display: 'flex', gap: 4 }}>
            {[...filled, ...empty].map((isFilled, i) => (
                <PancakeIcon
                    key={i}
                    width={size}
                    height={size}
                    style={{
                        opacity: isFilled ? 1 : 0.2,
                        transition: 'opacity 0.3s ease-in-out',
                    }}
                />
            ))}
        </div>
    );
};

export default PancakeStack;