import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Movies from "./pages/movies/Movies";
import Tv from "./pages/tv/Tv";
import ShowNavbar from "./components/shownavbar/ShowNavbar";
import Authentication from "./pages/loginpage/Authentication";
import { ThemeProvider } from "./theme-context";
import { AuthContextProvider } from "./context/AuthContext";
import AccountPage from "./pages/account/AccountPage";
import PersonDetails from "./pages/person/PersonDetails";
import About from "./pages/about/About";
import ResestPassword from "./components/resetpassword/ResestPassword";
import StreamPage from "./pages/Stream/StreamMovie";

function App() {
    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {

            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };

            dispatch(getApiConfiguration(url));
        });
    };

    const themelist = ["dark",
        "light",
        "colored", "dark",
        "light", "dark",
        "light",]

    const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    };

    return (
        <ThemeProvider>
            <AuthContextProvider>
                <BrowserRouter>
                    <Header />
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        draggablePercent={60}
                        theme={themelist[(Math.floor(Math.random() * themelist.length))]}
                    />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/movie" element={<Movies />} />
                        <Route path="/tv" element={<Tv />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/:mediaType/:id" element={<Details />} />
                        <Route path="/stream/:type/:id/:season/:episode" element={<StreamPage />} />
                        <Route path="/person/:id" element={<PersonDetails />} />
                        <Route path="/search/:endpoint/:query" element={<SearchResult />} />
                        <Route path="/explore/:mediaType" element={<Explore />} />
                        <Route path="/Login" element={<Authentication />} />
                        <Route path="/forgot-password" element={<ResestPassword />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                    <ShowNavbar />
                    <Footer />
                </BrowserRouter>
            </AuthContextProvider>
        </ThemeProvider>
    );
}

export default App;
