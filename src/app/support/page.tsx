import Link from 'next/link';
import { Code, Mail, MessageCircle, HelpCircle, FileText, Zap, Phone, MapPin } from 'lucide-react';

export default function SupportPage() {
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
            How can we help you?
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
            Get in touch with our support team. We're here to help you build amazing internal tools.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <ContactCard
              icon={<Mail className="w-6 h-6" />}
              title="Email Support"
              description="Send us an email and we'll get back to you within 24 hours."
              action="info@dashforge.in"
              href="mailto:info@dashforge.in"
            />
            <ContactCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="Live Chat"
              description="Chat with our support team in real-time during business hours."
              action="Start Chat"
              href="#"
            />
            <ContactCard
              icon={<FileText className="w-6 h-6" />}
              title="Documentation"
              description="Browse our comprehensive docs and guides to find answers quickly."
              action="View Docs"
              href="/docs"
            />
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <InfoItem
                    icon={<Mail className="w-5 h-5" />}
                    label="General Inquiries"
                    value="info@dashforge.in"
                    href="mailto:info@dashforge.in"
                  />
                  <InfoItem
                    icon={<Mail className="w-5 h-5" />}
                    label="Founder Contact"
                    value="alok.singh@dashforge.in"
                    href="mailto:alok.singh@dashforge.in"
                  />
                  <InfoItem
                    icon={<MapPin className="w-5 h-5" />}
                    label="Location"
                    value="Mumbai, Maharashtra, India"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Support Hours</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM IST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 4:00 PM IST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <FAQItem
                question="How quickly will I receive support?"
                answer="We aim to respond to all support requests within 24 hours on business days. Priority support customers receive responses within 4 hours."
              />
              <FAQItem
                question="Do you offer phone support?"
                answer="Phone support is available for Enterprise plan customers. Please contact us at info@dashforge.in to schedule a call."
              />
              <FAQItem
                question="Can I request a feature?"
                answer="Absolutely! We love hearing from our users. Send us your feature requests at info@dashforge.in and we'll consider them for future releases."
              />
              <FAQItem
                question="Is there a community forum?"
                answer="Yes! Join our community forum to connect with other DashForge users, share tips, and get help from the community."
              />
              <FAQItem
                question="Do you provide onboarding assistance?"
                answer="Yes, we offer personalized onboarding sessions for Professional and Enterprise plans. Contact us to schedule your session."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Enterprise Support?
          </h2>
          <p className="text-lg text-blue-100 mb-10">
            Get dedicated support, custom SLAs, and priority assistance for your team.
          </p>
          <a
            href="mailto:alok.singh@dashforge.in?subject=Enterprise Support Inquiry"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Sales
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">© 2025 DashForge. Built with ❤️ for developers.</p>
            <p>Mumbai, Maharashtra, India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  description,
  action,
  href
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href: string;
}) {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <a
        href={href}
        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
      >
        {action}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  href
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex items-center text-gray-900 font-medium mb-2">
        <span className="text-blue-600 mr-2">{icon}</span>
        {label}
      </div>
      <div className="ml-7 text-gray-600">{value}</div>
    </>
  );

  if (href) {
    return (
      <a href={href} className="block hover:text-blue-600 transition-colors">
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start">
        <HelpCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{question}</h3>
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}
