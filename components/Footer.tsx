export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl">
            Book a free consultation with our expert counselors and take the first step toward your dream university.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
            />
            <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-medium hover:bg-slate-100 transition flex items-center justify-center gap-2 whitespace-nowrap">
              Get Started <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold mb-4">NEXUS</h3>
              <p className="text-slate-400 text-sm mb-4">
                Your trusted partner in international education. We guide students toward global opportunities with passion, integrity, and care.
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-slate-400 hover:text-white transition">f</a>
                <a href="#" className="text-slate-400 hover:text-white transition">𝕏</a>
                <a href="#" className="text-slate-400 hover:text-white transition">📷</a>
                <a href="#" className="text-slate-400 hover:text-white transition">in</a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Career Counseling</a></li>
                <li><a href="#" className="hover:text-white transition">University Selection</a></li>
                <li><a href="#" className="hover:text-white transition">Application Support</a></li>
                <li><a href="#" className="hover:text-white transition">Visa Assistance</a></li>
                <li><a href="#" className="hover:text-white transition">Test Preparation</a></li>
                <li><a href="#" className="hover:text-white transition">Scholarship Guidance</a></li>
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">United Kingdom</a></li>
                <li><a href="#" className="hover:text-white transition">United States</a></li>
                <li><a href="#" className="hover:text-white transition">Canada</a></li>
                <li><a href="#" className="hover:text-white transition">Australia</a></li>
                <li><a href="#" className="hover:text-white transition">New Zealand</a></li>
                <li><a href="#" className="hover:text-white transition">Europe</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Our Team</a></li>
                <li><a href="#" className="hover:text-white transition">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="font-semibold mb-4">Locations</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex gap-2">
                  <span>📍</span>
                  <span>Dillibazar (Head Office) 01XXXXXXX</span>
                </li>
                <li className="flex gap-2">
                  <span>📍</span>
                  <span>Baneshwor 01XXXXXXX</span>
                </li>
                <li className="flex gap-2">
                  <span>📍</span>
                  <span>Baneshwor 01XXXXXXX</span>
                </li>
                <li className="flex gap-2">
                  <span>📍</span>
                  <span>Baneshwor 01XXXXXXX</span>
                </li>
                <li className="flex gap-2">
                  <span>📍</span>
                  <span>Australia Granville NSW 2142</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>© 2026 NEXUS. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
