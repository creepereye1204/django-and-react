import React from 'react';
import Navbar from './components/App'; // Navbar 컴포넌트 경로 확인

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Welcome to the Home Page</h1>
        <p>This is a basic React home page.</p>
        <a href="#">Some Link</a>
      </main>
    </div>
  );
}

export default App;