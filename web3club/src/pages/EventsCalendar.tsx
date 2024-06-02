import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import backImage from './back.png'; // Import the back image
import bgImage from './bgcal.jpeg'; // Import the background image

const EventsCalendar: React.FC = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Audiowide';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const events = [
    {
      id: 1,
      title: "Event 1",
      imageUrl: "https://via.placeholder.com/150",
      description: "Description for Event 1",
      link: "https://example.com/event1"
    },
    {
      id: 2,
      title: "Event 2",
      imageUrl: "https://via.placeholder.com/150",
      description: "Description for Event 2",
      link: "https://example.com/event2"
    },
    {
      id: 3,
      title: "Event 3",
      imageUrl: "https://via.placeholder.com/150",
      description: "Description for Event 3",
      link: "https://example.com/event3"
    },
    {
      id: 4,
      title: "Event 4",
      imageUrl: "https://via.placeholder.com/150",
      description: "Description for Event 4",
      link: "https://example.com/event4"
    }
  ];

  const navigate = useNavigate(); // Get navigate function for navigation

  useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: 0.5
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    };

    events.forEach((event) => {
      const cardRef = document.getElementById(`card-${event.id}`);
      if (cardRef) {
        const observer = new IntersectionObserver(callback, options);
        observer.observe(cardRef);
        return () => {
          observer.unobserve(cardRef);
        };
      }
    });
  }, [events]);

  const handleGoBack = () => {
    navigate('/'); // Navigate back to home page
  };

  // State for managing hover effect on back button
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.container}>
      <img
        src={backImage}
        alt="Back"
        style={{
          ...styles.backButton,
          transform: isHovered ? 'scale(1.2)' : 'scale(1)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleGoBack}
      />
      <h1 style={styles.heading}>Events Calendar</h1>
      {events.map((event, index) => (
        <div
          key={event.id}
          id={`card-${event.id}`}
          style={{
            ...styles.event,
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
          }}
        >
          <div style={styles.imageContainer}>
            <img src={event.imageUrl} alt={event.title} style={styles.image} />
          </div>
          <div style={styles.content}>
            <h2 style={styles.eventTitle}>{event.title}</h2>
            <p style={styles.eventDescription}>{event.description}</p>
            <button
  style={styles.button}
  onClick={() => window.location.href = event.link}
  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundImage = 'linear-gradient(to right, #00c9ff 0%, #92fe9d 100%)'}
  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundImage = 'linear-gradient(to right, #b721ff 0%, #21d4fd 100%)'}
>
  View Details
</button>

          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '2rem',
    color: '#fff', // Ensure text color is white for contrast
  } as React.CSSProperties,
  backButton: {
    position: 'absolute',
    top: '70px',
    left: '70px',
    width: '70px',
    height: '70px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out', // Add transition for smooth effect
  } as React.CSSProperties,
  heading: {
    marginBottom: '20px',
    fontSize: '3cm',
    fontFamily: "'Audiowide', sans-serif",
    color: '#ffffff', // White text color
    textShadow: '0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #aa00aa, 0 0 40px #aa00aa, 0 0 50px #aa00aa, 0 0 60px #aa00aa, 0 0 70px #aa00aa', // Adjusted glowing effect
    textAlign: 'center', // Center align the text
    padding: '20px 0', // Add padding to make the title visible
  } as React.CSSProperties,
  eventTitle: {
    fontFamily: "'Audiowide', sans-serif", // Apply the same font family to event titles
    fontSize: '24px', // Adjust the font size if needed
    marginBottom: '5px', // Add some spacing between title and description
  } as React.CSSProperties,
  eventDescription: {
    fontFamily: "'Audiowide', sans-serif", // Apply the same font family to event descriptions
    fontSize: '16px', // Adjust the font size if needed
    marginBottom: '10px', // Add some spacing between description and link
  } as React.CSSProperties,
  eventsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as React.CSSProperties,
  event: {
    width: '80%',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    opacity: 0,
    transition: 'opacity 0.5s ease-in-out',
    background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    borderRadius: '10px',
    overflow: 'hidden',
  } as React.CSSProperties,
  imageContainer: {
    flex: 1,
  } as React.CSSProperties,
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  } as React.CSSProperties,
  content: {
    flex: 1,
    padding: '20px',
  } as React.CSSProperties,
  button: {
    fontFamily: "'Audiowide', sans-serif", // Apply the same font family to buttons
    color: '#fff',
    backgroundImage: 'linear-gradient(to right, #b721ff 0%, #21d4fd 100%)', // Define linear gradient background
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out', // Add transition for smooth effect
  } as React.CSSProperties,
};

export default EventsCalendar;
