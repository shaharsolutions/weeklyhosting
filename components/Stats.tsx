
import React from 'react';
import Card from './Card';

interface StatsProps {
    weeks: number;
}

const Stats: React.FC<StatsProps> = ({ weeks }) => {
    return (
        <Card>
            <div className="text-center animate-fade-in">
                <h2 className="text-xl font-bold mb-2">שבועות רצופים של אירוח</h2>
                <p className="text-6xl font-bold text-brand-primary">{weeks}</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">כל הכבוד על ההתמדה!</p>
            </div>
        </Card>
    );
};

export default Stats;
