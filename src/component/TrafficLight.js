import './TrafficLight.css';
import { useEffect, useRef } from 'react';

const TrafficLight = () => {
    const activeLightIndex = useRef(0);
    const timerRef = useRef(null);

    const greenTime = 3000;
    const yellowTime = 500;
    const redTime = 4000;

    useEffect(() => {
        const lightElements = document.querySelectorAll("#traffic .light");

        const updateActiveLight = () => {
            console.log(lightElements);
            if (lightElements.length > 0) {
                lightElements.forEach(light => light.classList.remove('active'));

                const currentLight = lightElements[activeLightIndex.current];
                currentLight.classList.add('active');

                console.log(`Current Light ID: ${currentLight.id}`);

                let nextInterval;
                if (currentLight.id === "red") {
                    nextInterval = redTime;
                } else if (currentLight.id === "yellow") {
                    nextInterval = yellowTime;
                } else {
                    nextInterval = greenTime;
                }

                activeLightIndex.current = (activeLightIndex.current + 1) % lightElements.length;

                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                timerRef.current = setTimeout(updateActiveLight, nextInterval);
            }
        };

        updateActiveLight();

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <>
            <header>Header</header>
            <div className="container">
                <nav>Navigation</nav>
                <main>
                    <div>Traffic Light:
                        <div className="traffic-light" id="traffic">
                            <li className="light" id="green" key={1}></li>
                            <li className="light" id="yellow" key={2}></li>
                            <li className="light" id="red" key={3}></li>
                        </div>
                    </div>
                </main>
                <aside>Sidebar</aside>
            </div>
            <footer>Footer</footer>
        </>
    );
}

export default TrafficLight;
