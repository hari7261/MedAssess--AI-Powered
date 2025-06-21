import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-medical-dark text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MedAssess</h3>
            <p className="text-gray-300">
              Advanced medical assessments, expert doctors, and top hospitals - all in one place.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/overview" className="text-gray-300 hover:text-white">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-white">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Assessments</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/cancer-assessment" className="text-gray-300 hover:text-white">
                  Cancer Assessment
                </Link>
              </li>
              <li>
                <Link to="/heart-assessment" className="text-gray-300 hover:text-white">
                  Heart Assessment
                </Link>
              </li>
              <li>
                <Link to="/diabetes-assessment" className="text-gray-300 hover:text-white">
                  Diabetes Assessment
                </Link>
              </li>
              <li>
                <Link to="/tb-assessment" className="text-gray-300 hover:text-white">
                  TB Assessment
                </Link>
              </li>
              <li>
                <Link to="/malaria-assessment" className="text-gray-300 hover:text-white">
                  Malaria Assessment
                </Link>
              </li>
              <li>
                <Link to="/dengue-assessment" className="text-gray-300 hover:text-white">
                  Dengue Assessment
                </Link>
              </li>
              <li>
                <Link to="/covid-assessment" className="text-gray-300 hover:text-white">
                  COVID-19 Assessment
                </Link>
              </li>
              <li>
                <Link to="/cold-assessment" className="text-gray-300 hover:text-white">
                  Cold Assessment
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="text-gray-300 not-italic">
              <p>Email: hariompandit5556@gmail.com</p>
              <p>Phone: +91 7261033994</p>
              <p>Location: EXCEL ENGINEERING COLLEGE, Komarapalayam, Tamilnadu, India</p>
            </address>
            <div className="mt-4">
              <h5 className="text-sm font-semibold mb-2">Find Us</h5>
              <ul className="space-y-2">
                <li>
                  <Link to="/doctors" className="text-gray-300 hover:text-white">
                    Doctors
                  </Link>
                </li>
                <li>
                  <Link to="/hospitals" className="text-gray-300 hover:text-white">
                    Hospitals
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} MedAssess. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};