import Home from './pages/Home';
import Instructor from './pages/Instructor';
import Major from './pages/Major';
import NotFound from './pages/NotFound';
import Student from './pages/Student';

export const routes = [
  { path: '', component: <Home /> },
  { path: '/home', component: <Home /> },
  { path: '/major', component: <Major /> },
  { path: '/instructor', component: <Instructor /> },
  { path: '/student', component: <Student /> },
  { path: '*', component: <NotFound /> },
];
