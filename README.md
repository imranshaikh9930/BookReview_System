## 📦 Project Setup Instructions (MERN)

Follow these steps to get the backend server up and running on your local machine:

### 1. Clone the repository

Open your terminal and run:

```bash
git clone https://github.com/your-username/your-backend-repo.git
cd your-backend-repo

```
### 2. Install dependencies
Make sure you have Node.js installed (v16 or later recommended).

Install all required packages using npm:

```bash
npm install
```

### 3. Setup environment variables
Create a .env file in the root directory of the project. Add configuration variables such as:
```bash

PORT 
SALT 
SECRET_KEY
MONGO_URI 
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET 
CLOUDINARY_CLOUD_NAME 

```

### 4. Start the server
For development with auto-reload (using nodemon):
``` bash
nodemon index.js
```
### 5.Schema Design

Here’s a brief overview of the key Mongoose models used in this project:

---

###  User Model

```js
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}
```
### Review Model

```js
{
  user: {
    type: ObjectId,      // Reference to User
    ref: "User",
    required: true
  },
  book: {
    type: ObjectId,      // Reference to Book
    ref: "Book",
    required: true
  },
  rating: {
    type: Number,
    default: 1,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    trim: true
  }
}
```
### Book Model

```js
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  reviews: [
    {
      type: ObjectId,     // Reference to Review
      ref: "Review"
    }
  ],
  author: {
    type: ObjectId,       // Reference to User
    ref: "User",
    required: true
  },
  genre: {
    type: String
  },
  rating: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  }
}

```
### 6.Example API requests (with curl or Postman)
![Book_Review_Systam_img](https://github.com/user-attachments/assets/886e5bf9-2b50-4a79-8cf4-9c04ff0b0e39)

```bash 
http://localhost:5001/api/books // get All Books Routes
```

##output
```bash
{
    "totalPages": 2,
    "currentPage": 1,
    "totalBooks": 8,
    "books": [
        {
            "_id": "682c23e290bfde381abc90fb",
            "name": "A Tale Of Two Cities — Charles Dickens",
            "description": "A Tale of Two Cities is a historical novel published in 1859 by English author Charles Dickens, set in London and Paris before and during the French Revolution. The novel tells the story of the French Doctor Manette, his 18-year-long imprisonment in the Bastille in Paris, and his release to live in London with his daughter Lucie whom he had never met. The story is set against the conditions that led up to the French Revolution and the Reign of Terror.",
            "image": "https://res.cloudinary.com/dq2xyb0xq/image/upload/v1747723234/BookImages/bei9ufpcgufzyog5mruy.jpg",
            "reviews": [],
            "genre": "Historical fiction\n\n",
            "rating": 0,
            "createdAt": "2025-05-20T06:40:34.089Z",
            "updatedAt": "2025-05-20T06:40:34.089Z",
            "__v": 0
        },
        {
            "_id": "682c304bd92fb15e32420836",
            "name": "A Tale Of Two Cities — Charles Dickens",
            "description": "A Tale of Two Cities is a historical novel published in 1859 by English author Charles Dickens, set in London and Paris before and during the French Revolution. The novel tells the story of the French Doctor Manette, his 18-year-long imprisonment in the Bastille in Paris, and his release to live in London with his daughter Lucie whom he had never met. The story is set against the conditions that led up to the French Revolution and the Reign of Terror.",
            "image": "https://res.cloudinary.com/dq2xyb0xq/image/upload/v1747726412/BookImages/subusi4a1uunihnekait.jpg",
            "reviews": [
                "682c46b9197dda463a4c0424"
            ],
            "author": "682c0c49756a916387bcbe90",
            "genre": "Historical fiction\n\n",
            "rating": 0,
            "createdAt": "2025-05-20T07:33:31.376Z",
            "updatedAt": "2025-05-20T12:03:37.476Z",
            "__v": 1
        },
        {
            "_id": "682c30e03f9d2728909d3b66",
            "name": "The Little Prince — Antoine de Saint-Exupéry",
            "description": "The Little Prince (French: Le Petit Prince, pronounced [lə p(ə)ti pʁɛ̃s]) is a novella written and illustrated by French writer and aviator Antoine de Saint-Exupéry. It was first published in English and French in the United States by Reynal & Hitchcock in April 1943 and was published posthumously in France following liberation; Saint-Exupéry's works had been banned by the Vichy Regime. The story follows a young prince who visits various planets, including Earth, and addresses themes of loneliness, friendship, love, and loss. Despite its style as a children's book, The Little Prince makes observations about life, adults, and human nature.",
            "image": "https://res.cloudinary.com/dq2xyb0xq/image/upload/v1747726561/BookImages/llnezxgezd6sf2aeohgf.jpg",
            "reviews": [],
            "author": "682c0c49756a916387bcbe90",
            "genre": "Adventure\n\n",
            "rating": 0,
            "createdAt": "2025-05-20T07:36:00.666Z",
            "updatedAt": "2025-05-20T07:36:00.666Z",
            "__v": 0
        },
       
    ]
}
```



