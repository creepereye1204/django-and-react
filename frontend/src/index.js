import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h1>Welcome to My App</h1>
          <p>Your one-stop solution for everything!</p>
        </header>
        <main style={styles.content}>
          <h2>About This App</h2>
          <p>This is a simple React application designed to demonstrate basic styling and structure.</p>
        </main>
        <footer style={styles.footer}>
          <p>&copy; 2024 My App. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

// 인라인 스타일 정의
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '20px',
    borderRadius: '10px',
  },
  content: {
    margin: '20px 0',
  },
  footer: {
    marginTop: '20px',
    fontSize: '0.8em',
    color: '#555',
  },
};

export default App;
