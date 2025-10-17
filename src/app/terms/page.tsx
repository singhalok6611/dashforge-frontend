import Link from 'next/link';
import { Code } from 'lucide-react';

export default function TermsOfServicePage() {
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

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: January 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing or using DashForge ("Service"), you agree to be bound by these Terms of Service ("Terms").
              If you disagree with any part of these terms, you may not access the Service.
            </p>
            <p className="text-gray-600 leading-relaxed">
              DashForge is operated by DashForge, based in Mumbai, Maharashtra, India. These Terms apply to all
              visitors, users, and others who access or use the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              DashForge is a low-code platform that enables users to build internal tools, dashboards, and applications
              by connecting to databases and APIs. The Service includes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Visual application builder with drag-and-drop functionality</li>
              <li>Database connectivity and query management</li>
              <li>Pre-built UI components and templates</li>
              <li>User authentication and authorization features</li>
              <li>Application deployment and hosting</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Registration</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              To use certain features of the Service, you must register for an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Maintain the security of your password</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Termination</h3>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to suspend or terminate your account at any time for violations of these Terms,
              illegal activity, or any conduct that we deem inappropriate.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Distribute malware, viruses, or other harmful code</li>
              <li>Attempt to gain unauthorized access to other accounts or systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Scrape, crawl, or spider any part of the Service</li>
              <li>Reverse engineer or attempt to extract source code</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Subscription and Billing</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Paid Plans</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Certain features of the Service require a paid subscription. By subscribing to a paid plan, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Pay all fees associated with your chosen plan</li>
              <li>Provide accurate billing information</li>
              <li>Authorize automatic recurring payments</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Billing Cycle</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Subscriptions are billed on a monthly or annual basis, depending on your chosen plan. You will be charged
              automatically at the beginning of each billing cycle.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Cancellation and Refunds</h3>
            <p className="text-gray-600 leading-relaxed">
              You may cancel your subscription at any time from your account settings. Cancellations take effect at the
              end of the current billing period. We do not provide refunds for partial billing periods, except as required
              by law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Content</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              The Service and its original content, features, and functionality are owned by DashForge and are protected
              by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Content</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You retain all rights to any content, applications, data, and configurations you create using the Service
              ("Your Content"). By using the Service, you grant us a limited license to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Host, store, and display Your Content</li>
              <li>Process Your Content to provide the Service</li>
              <li>Make backups of Your Content for disaster recovery</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data and Security</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We implement reasonable security measures to protect your data. However, no method of transmission over
              the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot
              guarantee absolute security.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Maintaining secure credentials for any databases or APIs you connect</li>
              <li>Complying with data protection laws applicable to your use of the Service</li>
              <li>Regularly backing up your critical data</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers and Limitations of Liability</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Service "As Is"</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE MAKE NO WARRANTIES, EXPRESS OR IMPLIED,
              REGARDING THE SERVICE, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
            <p className="text-gray-600 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, DASHFORGE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR
              INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
            <p className="text-gray-600 leading-relaxed">
              You agree to indemnify and hold harmless DashForge and its officers, directors, employees, and agents from
              any claims, damages, losses, liabilities, and expenses (including attorney's fees) arising from:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another person or entity</li>
              <li>Your Content</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Service Modifications</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time,
              with or without notice. We shall not be liable to you or any third party for any modification, suspension,
              or discontinuance of the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to
              its conflict of law provisions. Any disputes arising from these Terms or the Service shall be subject
              to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of material changes via
              email or through the Service. Your continued use of the Service after changes become effective constitutes
              acceptance of the revised Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-900 font-semibold mb-2">DashForge</p>
              <p className="text-gray-600">Mumbai, Maharashtra, India</p>
              <p className="text-gray-600 mt-2">
                Email: <a href="mailto:info@dashforge.in" className="text-blue-600 hover:text-blue-700">info@dashforge.in</a>
              </p>
              <p className="text-gray-600">
                Founder: <a href="mailto:alok.singh@dashforge.in" className="text-blue-600 hover:text-blue-700">alok.singh@dashforge.in</a>
              </p>
            </div>
          </section>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              <strong>By using DashForge, you acknowledge that you have read, understood, and agree to be bound by
              these Terms of Service.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 mt-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 DashForge. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
