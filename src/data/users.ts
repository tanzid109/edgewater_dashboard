type User = {
    id: string
    photo?: string
    userId: number
    name?: string
    email: string
    date?: string
    time?: string
    status: "active" | "inactive"
}

const photos = [
    "/assets/user.jpg",
    "/assets/user1.jpg",
    "/assets/user2.jpg",
    "/assets/user3.jpg",
    "/assets/user4.jpg",
    "/assets/user5.jpg",
]

const names = [
    "Benjamin", "Alice", "Michael", "Sophia", "David",
    "Emma", "James", "Olivia", "Daniel", "Ethan",
    "Liam", "Mia", "Charlotte", "Henry", "Amelia",
    "Lucas", "Isabella", "Mason", "Harper", "Elijah"
]

export const data: User[] = Array.from({ length: 50 }, (_, i) => {
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)]
    const randomName = names[Math.floor(Math.random() * names.length)]
    const randomStatus = Math.random() > 0.5 ? "active" : "inactive"

    return {
        id: String(i + 1).padStart(2, "0"),
        photo: randomPhoto,
        userId: Math.floor(10000 + Math.random() * 90000),
        name: randomName,
        email: `${randomName.toLowerCase()}${i + 1}@gmail.com`,
        date: `${Math.floor(1 + Math.random() * 28)}th Oct, 2023`,
        time: `${Math.floor(1 + Math.random() * 12)}:${Math.floor(
            Math.random() * 60
        )
            .toString()
            .padStart(2, "0")} ${Math.random() > 0.5 ? "AM" : "PM"}`,
        status: randomStatus,
    }
})
