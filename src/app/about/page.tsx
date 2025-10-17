import Link from 'next/link';
import { ArrowRight, Code, Users, Heart, Target, Zap, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DashForge</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            About DashForge
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            We're on a mission to empower developers and teams to build internal tools faster,
            without compromising on quality or security.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  DashForge was founded in Mumbai, Maharashtra, India with a simple vision:
                  make building internal tools as easy as possible for developers and businesses.
                </p>
                <p>
                  We saw teams spending weeks building basic admin panels and dashboards,
                  taking valuable time away from their core product. We knew there had to be a better way.
                </p>
                <p>
                  Today, DashForge helps thousands of teams build, deploy, and manage internal tools
                  in minutes instead of weeks. We're proud to be at the forefront of the low-code revolution,
                  making powerful development tools accessible to everyone.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <StatsCard number="10K+" label="Active Users" />
              <StatsCard number="50K+" label="Apps Built" />
              <StatsCard number="99.9%" label="Uptime" />
              <StatsCard number="24/7" label="Support" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Target className="w-6 h-6" />}
              title="Our Mission"
              description="To democratize software development by providing powerful, easy-to-use tools that let anyone build internal applications."
            />
            <ValueCard
              icon={<Heart className="w-6 h-6" />}
              title="Our Values"
              description="We believe in simplicity, security, and speed. Every feature we build is designed with these core principles in mind."
            />
            <ValueCard
              icon={<Users className="w-6 h-6" />}
              title="Our Team"
              description="We're a passionate team of developers, designers, and product enthusiasts dedicated to making your workflow better."
            />
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                AS
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Alok Singh</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              "At DashForge, we're not just building software—we're building a platform that empowers
              developers to focus on what matters most: creating value for their users. Every line of code
              we write is driven by our commitment to making development faster, simpler, and more accessible."
            </p>
            <p className="text-gray-600 leading-relaxed">
              "Based in Mumbai, we're proud to be part of India's thriving tech ecosystem and to serve
              teams around the world."
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DashForge?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just another low-code platform. Here's what makes us different.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Lightning Fast"
              description="Build and deploy internal tools in minutes, not weeks. Our intuitive interface and pre-built components accelerate your development."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Enterprise Security"
              description="Bank-grade encryption, role-based access control, and compliance certifications. Your data security is our top priority."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Built for Teams"
              description="Seamless collaboration features, version control, and shared resources. Build better tools together."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to start building?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Join thousands of teams using DashForge to build internal tools faster.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Building Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">© 2025 DashForge. Built with ❤️ for developers.</p>
            <p>Mumbai, Maharashtra, India</p>
            <div className="mt-4 space-x-4">
              <a href="mailto:info@dashforge.in" className="hover:text-gray-900 transition-colors">
                info@dashforge.in
              </a>
              <span>•</span>
              <a href="mailto:alok.singh@dashforge.in" className="hover:text-gray-900 transition-colors">
                alok.singh@dashforge.in
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatsCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-all">
      <div className="text-3xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all">
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
