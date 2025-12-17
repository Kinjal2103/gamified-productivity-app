import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newTime, setNewTime] = useState("");

  const [userStats, setUserStats] = useState({ xp: 0, level: 0, streak: 0 });

  const login = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setError("");
    } catch (err) {
      setError("Login failed");
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks || res.data);
      if (res.data.user) setUserStats(res.data.user);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const createTask = async () => {
    try {
      await axios.post(
        `${API}/tasks`,
        {
          title: newTitle,
          priority: Number(newPriority),
          deadline: newDeadline,
          estimatedTime: Number(newTime),
          difficulty: "medium",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTitle("");
      setNewPriority("");
      setNewDeadline("");
      setNewTime("");
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const completeTask = async (id) => {
    try {
      const res = await axios.post(
        `${API}/tasks/${id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserStats(res.data.user);
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const getNextTask = async () => {
    try {
      const res = await axios.get(`${API}/tasks/next`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Next Task: ${res.data.title} | Priority: ${res.data.priority}`);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  if (!token) {
    return (
      <div style={styles.fullScreen}>
        <div style={styles.loginCard}>
          <h2 style={styles.title}>Login</h2>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button style={{ ...styles.button, backgroundColor: "#007BFF" }} onClick={login}>
            Login
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.fullScreen}>
      <header style={styles.header}>
        <h1>Gamified Productivity App</h1>
        <div style={styles.stats}>
          <span>XP: {userStats.xp}</span>
          <span>Level: {userStats.level}</span>
          <span>Streak: {userStats.streak}</span>
        </div>
      </header>

      <div style={styles.main}>
        {/* Task Panel */}
        <div style={styles.taskPanel}>
          <h2>Tasks</h2>
          <button style={styles.nextButton} onClick={getNextTask}>
            What should I do next?
          </button>
          <div style={styles.taskList}>
            {tasks.map((task) => (
              <div key={task._id} style={styles.task}>
                <div style={{ color: "#333" }}>
                  <strong>{task.title}</strong> | Priority: {task.priority} | Deadline:{" "}
                  {task.deadline ? new Date(task.deadline).toLocaleString() : "N/A"} | Status:{" "}
                  {task.status || "pending"}
                </div>
                <button
                  style={styles.completeButton}
                  onClick={() => completeTask(task._id)}
                >
                  Complete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Create Task Panel */}
        <div style={styles.createPanel}>
          <h2>Create Task</h2>
          <input
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="Priority"
            type="number"
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="Deadline"
            type="datetime-local"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="Estimated Time (min)"
            type="number"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            style={styles.input}
          />
          <button style={{ ...styles.button, backgroundColor: "#28A745" }} onClick={createTask}>
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  fullScreen: {
    minHeight: "100vh",
    width: "100%",
    fontFamily: "Arial, sans-serif",
    background: "#e1e8f0",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#343a40",
    color: "#fff",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stats: {
    display: "flex",
    gap: "15px",
    fontWeight: "bold",
  },
  main: {
    display: "flex",
    flex: 1,
    padding: "20px",
    gap: "20px",
  },
  taskPanel: {
    flex: 2,
    backgroundColor: "#333",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    maxHeight: "70vh",
    overflowY: "auto",
  },
  createPanel: {
    flex: 1,
    backgroundColor: "#333",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    height: "fit-content",
  },
  taskList: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  task: {
    padding: "12px 15px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
  },
  completeButton: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "#fff",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #aaa",
    outline: "none",
    fontSize: "14px",
    color: "#aaa",
    
  },
  button: {
    width: "100%",
    padding: "12px",
    margin: "12px 0",
    borderRadius: "6px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  nextButton: {
    padding: "10px 16px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#17a2b8",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  loginCard: {
    background: "#fff",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontWeight: "bold",
    fontSize: "22px",
  },
  error: {
    color: "red",
    marginTop: "8px",
    fontWeight: "bold",
  },
};

export default App;
