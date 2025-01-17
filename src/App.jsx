import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Questions from "./components/Questions/Questions";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Questions />
      </main>
      <Footer />
    </>
  );
}

export default App;
