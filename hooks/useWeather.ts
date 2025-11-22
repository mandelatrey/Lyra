import { useState, useEffect } from 'react';

interface WeatherData {
    temp: number;
}

export const useWeather = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [dateTime, setDateTime] = useState<{ time: string; date: string }>({ time: '', date: '' });

    useEffect(() => {
        // Function to update time
        const updateTime = () => {
            const now = new Date();
            const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
            const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

            const dayName = days[now.getDay()];
            const dayNum = now.getDate();
            const monthName = months[now.getMonth()];

            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');

            return {
                date: `${dayName} ${dayNum} ${monthName}`,
                time: `${hours}:${minutes}`
            };
        };

        // Initial time set
        setDateTime(updateTime());

        // Fetch weather
        const fetchWeather = async () => {
            try {
                // Coordinates for Kampala
                const latitude = 0.3476;
                const longitude = 32.5825;
                const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

                if (!apiKey) {
                    console.warn('OpenWeather API key not found');
                    setWeather({ temp: 21 }); // Default fallback
                    return;
                }

                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
                );

                if (res.ok) {
                    const data = await res.json();
                    setWeather({ temp: Math.round(data.main.temp) });
                } else {
                    setWeather({ temp: 21 }); // Fallback
                }
            } catch (error) {
                console.error('Error fetching weather:', error);
                setWeather({ temp: 21 }); // Fallback
            }
        };

        fetchWeather();

        // Update time every minute
        const interval = setInterval(() => {
            setDateTime(updateTime());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return {
        time: dateTime.time,
        date: dateTime.date,
        temp: weather ? weather.temp : null
    };
};
