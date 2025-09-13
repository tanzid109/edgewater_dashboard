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
    "Lucas", "Isabella", "Mason", "Harper", "Elijah",
]

export const data: User[] = Array.from({ length: 50 }, (_, i) => {
    const photo = photos[i % photos.length]        // cycle photos
    const name = names[i % names.length]           // cycle names
    const status = i % 2 === 0 ? "active" : "inactive" // alternate status

    return {
        id: String(i + 1).padStart(2, "0"),
        photo,
        userId: 10000 + i, // deterministic user ID
        name,
        email: `${name.toLowerCase()}${i + 1}@gmail.com`,
        date: `${(i % 28) + 1}th Oct, 2023`, // cycle 1–28
        time: `${(i % 12) + 1}:${(i * 7 % 60).toString().padStart(2, "0")} ${i % 2 === 0 ? "AM" : "PM"
            }`, // stable pseudo-random
        status,
    }
})
