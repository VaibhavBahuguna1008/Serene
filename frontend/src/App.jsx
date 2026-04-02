import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import About from './pages/About';
import MoodTracker from './pages/MoodTracker';
import Journal from './pages/Journal';
import AiChat from './pages/AiChat';
import ThoughtReframing from './pages/ThoughtReframing';
import TherapyToolkit from './pages/TherapyToolkit';
import Assessments from './pages/Assessments';
import TherapyTypes from './pages/TherapyTypes';
import NaturalTreatments from './pages/NaturalTreatments';
import LearningHub from './pages/LearningHub';
import Dashboard from './pages/Dashboard';
import CrisisSupport from './pages/CrisisSupport';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          } />

          <Route path="/mood" element={
            <PrivateRoute>
              <Layout>
                <MoodTracker />
              </Layout>
            </PrivateRoute>
          } />

          <Route path="/journal" element={
            <PrivateRoute>
              <Layout>
                <Journal />
              </Layout>
            </PrivateRoute>
          } />

          <Route path="/chat" element={
            <PrivateRoute>
              <Layout>
                <AiChat />
              </Layout>
            </PrivateRoute>
          } />

          <Route path="/reframe" element={
            <PrivateRoute>
              <Layout>
                <ThoughtReframing />
              </Layout>
            </PrivateRoute>
          } />

          <Route path="/toolkit" element={
            <PrivateRoute>
              <Layout>
                <TherapyToolkit />
              </Layout>
            </PrivateRoute>
          } />

          <Route path="/assessments" element={
            <PrivateRoute>
              <Layout>
                <Assessments />
              </Layout>
            </PrivateRoute>
          } />

          <Route path="/therapy" element={
            <PrivateRoute>
              <Layout>
                <TherapyTypes />
              </Layout>
            </PrivateRoute>
          } />

          <Route path="/natural-treatments" element={
            <PrivateRoute>
              <Layout>
                <NaturalTreatments />
              </Layout>
            </PrivateRoute>
          } />

          <Route path="/learning" element={
            <PrivateRoute>
              <Layout>
                <LearningHub />
              </Layout>
            </PrivateRoute>
          } />

          <Route path="/crisis" element={
            <PrivateRoute>
              <Layout>
                <CrisisSupport />
              </Layout>
            </PrivateRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
