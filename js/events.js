const eventsData = [
    {
        id: 1,
        title: "Book Signing: Emily Richards",
        date: "June 15, 2025",
        time: "3:00 PM - 5:00 PM",
        location: "Main Street Bookstore, New York",
        image: "img/home-book-3.png",
        description: "Meet bestselling author Emily Richards as she signs copies of her new thriller 'The Silent Echo'."
    },
    {
        id: 2,
        title: "Author Interview: Michael Chen",
        date: "June 20, 2025",
        time: "7:00 PM - 8:30 PM",
        location: "Virtual Event (Zoom)",
        image: "img/home-book-1.png",
        description: "Join us for a live interview with science fiction author Michael Chen about his creative process."
    },
    {
        id: 3,
        title: "Book Club Discussion: Whispers in the Wind",
        date: "June 25, 2025",
        time: "6:00 PM - 7:30 PM",
        location: "City Library, Boston",
        image: "img/home-book-2.png",
        description: "Our monthly book club will be discussing Sophia Johnson's award-winning novel."
    }
];

function loadUpcomingEvents() {
    const eventsContainer = document.getElementById('events-container');

    eventsData.forEach(event => {
        const eventCard = createEventCard(event);
        eventsContainer.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
    <div class="event-image">
        <img src="${event.image}" alt="${event.title}">
    </div>
    <div class="event-info">
        <p class="event-date">${event.date} • ${event.time}</p>
        <h3>${event.title}</h3>
        <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
        <p>${event.description}</p>
        <a href="event-details.html?id=${event.id}" class="btn">Learn More</a>
    </div>
    `;
    return card;
}
