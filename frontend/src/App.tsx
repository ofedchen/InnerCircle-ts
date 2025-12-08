import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./routes/Home_Route";
import About from "./routes/About_Route";
import Faq from "./routes/FAQ_Route";
import Profile from "./routes/Profile_Route";
import Categories from "./routes/Categories_Route";
import Feed from "./routes/Feed_Route";
import CirclePage from "./routes/Circle_Route";
import PrivacyPolicy from "./routes/PrivacyPolicy";
import Terms from "./routes/Terms";
import Category from "./routes/Category_Route";
import "./App.css";

function App() {
	return (
		<div>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="*" element={<div>404 Not Found</div>} />
					<Route path="/feed" element={<Feed />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/categories/:categoryName" element={<Category />} />
					<Route path="/about" element={<About />} />
					<Route path="/faq" element={<Faq />} />
					<Route
						path="/circle/:circleId/:circleSlug"
						element={<CirclePage />}
					/>
					<Route path="/privacy" element={<PrivacyPolicy />} />
					<Route path="/terms" element={<Terms />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
