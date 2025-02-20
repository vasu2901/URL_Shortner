# **Survey Website Analytics API** 🚀  

This project is a **Next.js API** that provides **survey analytics** using **Redis caching (Upstash)** and a **PostgreSQL database**. It enables users to track survey responses, clicks, and user interactions efficiently.

---

## **📌 Features**
- 🔐 **User Authentication** – Secured with NextAuth.
- 📊 **Survey Analytics** – Tracks **total clicks, unique users, clicks by date, OS type, and device type**.
- 🚀 **Redis Caching (Upstash)** – Improves response times and reduces DB load.
- 🛠 **Database Integration** – Uses **PostgreSQL** for user & survey data.
- 🧪 **Integration Tests** – Ensures API reliability with **Jest & Supertest**.
- 📦 **Docker Support** – Easily deployable with **Docker & Docker Compose**.

---

## **⚙️ Prerequisites**
Ensure you have the following installed before running the project:
- **Node.js (v18 or later)**
- **PostgreSQL**
- **Redis (Upstash or Local)**
- **Docker (Optional for containerized deployment)**

---

## **🚀 How to Run Locally**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo-url.git
cd your-repo-folder
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the project root and configure it:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/mydatabase
REDIS_URL=redis://default:your-upstash-redis-url
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### **4️⃣ Run Migrations (If using PostgreSQL)**
```sh
npx prisma migrate dev --name init
```

### **5️⃣ Start the Development Server**
```sh
npm run dev
```
Your **API** will be available at **`http://localhost:3000/api/analytics/overall`**.

---

## **🔍 API Usage**
### **1️⃣ Get Survey Analytics**
#### **Endpoint:**  
```http
GET /api/analytics/overall
```
#### **Headers (Required)**  
```json
{
  "Authorization": "Bearer your-access-token"
}
```
#### **Response (Example)**
```json
{
  "totalUrls": 5,
  "totalClicks": 1200,
  "uniqueUsers": 400,
  "clicksByDate": [
    { "date": "2024-02-01", "clicks": 100 },
    { "date": "2024-02-02", "clicks": 120 }
  ],
  "osType": [
    { "osName": "Windows", "uniqueClicks": 300, "uniqueUsers": 120 },
    { "osName": "MacOS", "uniqueClicks": 200, "uniqueUsers": 80 }
  ],
  "deviceType": [
    { "deviceName": "Mobile", "uniqueClicks": 800, "uniqueUsers": 300 },
    { "deviceName": "Desktop", "uniqueClicks": 400, "uniqueUsers": 100 }
  ],
  "alias": ["survey1", "survey2"]
}
```

---

## **📦 Running in Docker**
You can run this project in **Docker** for easy deployment.

### **1️⃣ Build Docker Image**
```sh
docker build -t survey-analytics .
```

### **2️⃣ Run the Container**
```sh
docker run -p 3000:3000 --env-file .env survey-analytics
```

### **3️⃣ (Optional) Run with Docker Compose**
If you want to run **PostgreSQL and Redis together**, use:

```sh
docker-compose up --build
```

---

## **🧪 Running Tests**
This project includes **integration tests** using **Jest & Supertest**.

### **Run Tests**
```sh
npm run dev
npm test
```
This will test:
- **Database retrieval**
- **API response validation**

---

## **🚀 Deployment Guide**
To deploy this project, you can use **Vercel**, **Docker**, or **a cloud provider**.

### **Vercel Deployment**
1. Install the Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy using:
   ```sh
   vercel
   ```

### **Docker Deployment on Cloud**
1. **Build & Push to Docker Hub**
   ```sh
   docker tag survey-analytics your-dockerhub-username/survey-analytics
   docker push your-dockerhub-username/survey-analytics
   ```
2. **Deploy on Cloud Server**
   ```sh
   docker run -d -p 3000:3000 --env-file .env your-dockerhub-username/survey-analytics
   ```

---

## **💡 Contributing**
We welcome contributions! Follow these steps:
1. **Fork** the repo.
2. **Create a new branch**: `git checkout -b feature-branch`
3. **Commit your changes**: `git commit -m "Added new feature"`
4. **Push to GitHub**: `git push origin feature-branch`
5. **Submit a Pull Request**

---

## **❓ FAQ**
### **1. How is caching handled?**
- **Redis (Upstash)** caches analytics data for **24 hours** to improve performance.

### **2. What happens if Redis is down?**
- The API will **fetch fresh data from the database** if Redis is unavailable.

### **3. How do I clear the cache manually?**
- You can delete the Redis key using:
  ```sh
  redis-cli DEL overall_analytics:user@example.com
  ```

---

## **📞 Support**
For any issues or feature requests, create an **issue** in the repository or reach out to **[vasu8479sharma@gmail.com](mailto:vasu8479sharma@gmail.com)**.

---

🚀 **Enjoy using the Survey Analytics API!** 🎉