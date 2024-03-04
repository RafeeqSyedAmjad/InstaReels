import { Route, Routes } from "react-router"
import PrivateRoute from "./PrivateRoute"
import { Feed, Login, Profile, Signup } from "./importPages"
import { Suspense } from "react"

function AppRoutes() {
    return (
        <Routes>
            <Route path='/signup' element={<Suspense fallback={"loading.."}><Signup /></Suspense>} />
            <Route path='/login' element={< Suspense fallback={"loading.."}><Login /></Suspense>} />
            <Route
                path="/profile/:id"
                element={
                    <Suspense fallback={"loading.."}>
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    </Suspense>

                }
            />
            <Route
                path="/"
                element={
                    <Suspense fallback={"loading.."}>
                        <PrivateRoute>
                            <Feed />
                        </PrivateRoute>
                    </Suspense>

                }
            />


        </Routes>
    )
}

export default AppRoutes