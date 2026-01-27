
import { Link } from "react-router-dom";

const Footer = () => {
  return <footer className="py-12 px-4 md:px-8 lg:px-16 mt-auto bg-blue-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-slate-50">
          <div>
            <h3 className="text-lg font-semibold mb-4">Dugsi Læring</h3>
            <p className="text-gray-100">Gør somalisk sproglæring sjovt og tilgængeligt for danske-somaliske børn.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Hurtige Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-100 hover:text-white hover:underline">Hjem</Link></li>
              <li><Link to="/priser" className="text-gray-100 hover:text-white hover:underline">Priser</Link></li>
              <li><Link to="/om-os" className="text-gray-100 hover:text-white hover:underline">Om Os</Link></li>
              <li><Link to="/kontakt" className="text-gray-100 hover:text-white hover:underline">Kontakt os</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/kontakt" className="text-gray-100 hover:text-white hover:underline">FAQ</Link></li>
              <li><Link to="/privatlivspolitik" className="text-gray-100 hover:text-white hover:underline">Privatlivspolitik</Link></li>
              <li><Link to="/servicevilkaar" className="text-gray-100 hover:text-white hover:underline">Servicevilkår</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Sig endelig til</h3>
            <p className="text-lg mb-4">Feedback er velkommen. Oplever du fejl i lyd, test eller funktioner, så kontakt os, så vi kan forbedre platformen løbend.</p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-100">&copy; {new Date().getFullYear()} Dugsi Læringsplatform. Alle rettigheder forbeholdes.</p>
        </div>
      </div>
    </footer>;
};

export default Footer;
