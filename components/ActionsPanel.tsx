import React from 'react';
import Card from './Card';

interface ActionsPanelProps {
  hostingDay: { name: string; gcal: string };
}

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M-4.5 12h22.5" />
    </svg>
);

const UserGroupIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962c.513-.18-1.07-3.37-2.66-3.37-1.59 0-3.173 3.19-2.66 3.37m12.5 0c.513-.18-1.07-3.37-2.66-3.37-1.59 0-3.173 3.19-2.66 3.37m4.516-7.85c.217.629.334 1.3.334 2.003 0 1.745-.67 3.333-1.764 4.506m-.21-4.506a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-4.516-7.85a11.25 11.25 0 0 1 6.337 10.323" />
    </svg>
);

const MusicNoteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V7.5A2.25 2.25 0 0 0 16.5 5.25v1.5" />
    </svg>
);


const ActionsPanel: React.FC<ActionsPanelProps> = ({ hostingDay }) => {
    const getCalendarUrl = (): string => {
        const eventTitle = encodeURIComponent('ערב אירוח שבועי');

        // Helper to format date to YYYYMMDDTHHMMSSZ for Google Calendar
        const toGoogleCalendarFormat = (date: Date): string => {
            return date.toISOString().replace(/-|:|\.\d{3}/g, '');
        };
        
        const today = new Date();
        const dayOfWeek = today.getDay(); // Sunday = 0, Thursday = 4
        
        // Calculate days to add to get to the next Thursday.
        // If today is Thursday, it will be today. If Friday, it will be next week's Thursday.
        const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
        
        const startDate = new Date(today);
        startDate.setDate(today.getDate() + daysUntilThursday);
        startDate.setHours(19, 30, 0, 0);

        // Event is 1.5 hours long (90 minutes)
        const endDate = new Date(startDate.getTime() + 90 * 60 * 1000);

        const datesParam = `${toGoogleCalendarFormat(startDate)}/${toGoogleCalendarFormat(endDate)}`;

        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${datesParam}`;
    };

    const calendarUrl = getCalendarUrl();
    const whatsappText = encodeURIComponent('היי! מה דעתכם לקפוץ לארוחת ערב קלילה אצלנו ביום חמישי הקרוב?');
    const whatsappUrl = `https://wa.me/?text=${whatsappText}`;
    const playlistUrl = 'https://music.apple.com/il/playlist/cooking/pl.de1eec6b57a54a72a0ace7c62c5b2021'; // A generic dinner playlist

    const actions = [
        {
            label: 'הוסף ליומן',
            icon: <CalendarIcon />,
            href: calendarUrl,
            color: 'bg-blue-500',
        },
        {
            label: 'הזמן חברים',
            icon: <UserGroupIcon />,
            href: whatsappUrl,
            color: 'bg-green-500',
        },
        {
            label: 'פתח פלייליסט',
            icon: <MusicNoteIcon />,
            href: playlistUrl,
            color: 'bg-pink-500',
        },
    ];

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">קיצורי דרך</h2>
      <div className="space-y-4">
        {actions.map((action, index) => (
             <a
             key={action.label}
             href={action.href}
             target="_blank"
             rel="noopener noreferrer"
             className={`flex items-center p-4 rounded-lg text-white font-bold text-lg transition-transform hover:scale-105 animate-slide-in ${action.color}`}
             style={{ animationDelay: `${index * 150}ms` }}
           >
             {action.icon}
             <span className="ms-3">{action.label}</span>
           </a>
        ))}
      </div>
    </Card>
  );
};

export default ActionsPanel;