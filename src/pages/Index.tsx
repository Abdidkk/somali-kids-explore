
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, Calendar, Coffee, GraduationCap, Languages, Palette, Play, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-100 to-white py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900">
                <span className="text-orange-500">Dugsi</span> Learning Platform
              </h1>
              <p className="text-xl text-gray-700">
                A fun and interactive way for children to learn Somali language and culture through engaging activities, games, and lessons.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                24-hour free trial. No credit card required.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-orange-200 rounded-lg"></div>
                <div className="relative bg-white p-3 border-2 border-purple-300 rounded-lg shadow-lg">
                  <img 
                    src="/placeholder.svg" 
                    alt="Dugsi Learning" 
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Learning Made Fun</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our interactive learning content designed specifically for children
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Languages className="h-10 w-10 text-purple-500" />}
              title="Alphabet Learning"
              description="Learn Somali letters with visual aids, audio pronunciation, and interactive tracing activities"
            />
            <FeatureCard 
              icon={<GraduationCap className="h-10 w-10 text-blue-500" />}
              title="Numbers & Counting"
              description="Master counting, addition, and subtraction basics in Somali for foundational math skills"
            />
            <FeatureCard 
              icon={<Palette className="h-10 w-10 text-pink-500" />}
              title="Colors & Shapes"
              description="Recognize and name colors and shapes using visual examples to build vocabulary"
            />
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-yellow-500" />}
              title="Family & Relationships"
              description="Learn Somali terms for family members and understand relationship dynamics"
            />
            <FeatureCard 
              icon={<Calendar className="h-10 w-10 text-green-500" />}
              title="Calendar & Time"
              description="Understand Somali terminology for days, months, seasons, and telling time"
            />
            <FeatureCard 
              icon={<BookOpen className="h-10 w-10 text-orange-500" />}
              title="Cultural Lessons"
              description="Explore Somali proverbs, traditional songs, and cultural storytelling"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-purple-50 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center items-center w-20 h-20 mx-auto mb-4 rounded-full bg-orange-100 text-orange-500">
                <Coffee className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Create an Account</h3>
              <p className="text-gray-600">Sign up and create parent and child profiles</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center w-20 h-20 mx-auto mb-4 rounded-full bg-purple-100 text-purple-500">
                <Play className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Start Learning</h3>
              <p className="text-gray-600">Access interactive lessons, games, and quizzes</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 text-blue-500">
                <Brain className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Track Progress</h3>
              <p className="text-gray-600">Monitor achievements and learning milestones</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 px-4 bg-white md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscription Plans</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that works best for your family
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 hover:border-purple-300 transition-all">
              <CardHeader>
                <CardTitle className="text-2xl">Monthly Plan</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$9.99</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <CardDescription className="mt-2">Perfect for short-term learning</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="mr-2 h-5 w-5 text-green-500">✓</div>
                    <span>Full access to all learning content</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-5 w-5 text-green-500">✓</div>
                    <span>Interactive games and quizzes</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-5 w-5 text-green-500">✓</div>
                    <span>Progress tracking</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-5 w-5 text-green-500">✓</div>
                    <span>Cancel anytime</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Subscribe Now</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-300 shadow-lg">
              <CardHeader>
                <div className="bg-orange-500 text-white text-sm font-semibold py-1 px-3 rounded-full w-fit mb-2">BEST VALUE</div>
                <CardTitle className="text-2xl">Annual Plan</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$89.99</span>
                  <span className="text-gray-500 ml-2">/year</span>
                </div>
                <CardDescription className="mt-2">Save 25% compared to monthly</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="mr-2 h-5 w-5 text-green-500">✓</div>
                    <span>All monthly plan features</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-5 w-5 text-green-500">✓</div>
                    <span>Priority customer support</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-5 w-5 text-green-500">✓</div>
                    <span>Early access to new content</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-5 w-5 text-green-500">✓</div>
                    <span>25% savings on yearly plan</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">Subscribe Now</Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 text-gray-600">
            <p>All plans start with a 24-hour free trial. No credit card required.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-4 md:px-8 lg:px-16 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Dugsi Learning</h3>
              <p className="text-gray-600">Making Somali language learning fun and accessible for children worldwide.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-purple-600">Features</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-purple-600">Pricing</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-purple-600">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-purple-600">FAQ</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-purple-600">Contact Us</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-purple-600">Privacy Policy</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-purple-600">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 5.16c-.94.42-1.95.7-3 .82 1.08-.65 1.9-1.68 2.3-2.9-1.03.61-2.17 1.06-3.38 1.3C16.95 3.2 15.8 2.75 14.5 2.75c-2.45 0-4.44 1.99-4.44 4.44 0 .35.04.69.12 1.02-3.7-.18-6.98-1.96-9.18-4.66-.38.66-.6 1.43-.6 2.25 0 1.54.78 2.9 1.97 3.7-.73-.02-1.42-.22-2.02-.55v.06c0 2.15 1.53 3.94 3.56 4.35-.37.1-.76.15-1.16.15-.28 0-.56-.03-.83-.08.56 1.76 2.2 3.04 4.15 3.08-1.52 1.2-3.44 1.9-5.52 1.9-.36 0-.71-.02-1.06-.06 1.97 1.26 4.3 2 6.8 2 8.16 0 12.6-6.76 12.6-12.6 0-.19 0-.38-.01-.57.87-.63 1.62-1.42 2.22-2.32z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.672.01 2.988.058 4.042.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.672 0 2.988-.01 4.042-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.054.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.041-.058zm0 3.064a5.136 5.136 0 110 10.27 5.136 5.136 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.693a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-6.7c-.66 0-1.2-.54-1.2-1.2 0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2 0 .66-.54 1.2-1.2 1.2zM17 17h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.1c.52-.7 1.37-1.1 2.25-1.1 1.65 0 2.99 1.34 2.99 2.99V17z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500">&copy; {new Date().getFullYear()} Dugsi Learning Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper component for feature cards
const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-all">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;
