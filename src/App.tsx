import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { MotionConfig } from "framer-motion";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const About = lazy(() => import("./pages/About"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Careers = lazy(() => import("./pages/Careers"));
const CareersApply = lazy(() => import("./pages/CareersApply"));
const Contact = lazy(() => import("./pages/Contact"));
const BookCare = lazy(() => import("./pages/BookCare"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Resources = lazy(() => import("./pages/Resources"));
const ResourceArticle = lazy(() => import("./pages/ResourceArticle"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/apply" element={<CareersApply />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<BookCare />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<ResourceArticle />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  );
}
