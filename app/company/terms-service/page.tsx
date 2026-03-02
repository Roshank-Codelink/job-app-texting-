"use client";

import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 border-b pb-4">
          Terms & Conditions
        </h1>

        {/* Introduction */}
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-slate-600 mb-12">
          <p>
            These Terms & Conditions ("<strong>Terms</strong>") govern your access
            to and use of the Jobito platform, including all related websites,
            applications, and services ("<strong>Platform</strong>"). By
            accessing or using Jobito, you agree to be bound by these Terms.
          </p>

          <p>
            If you do not agree with any part of these Terms, you must not access
            or use the Platform.
          </p>
        </div>

        {/* 1. Platform Usage */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            1. Platform Usage
          </h2>

          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Jobito is intended to be used solely for lawful hiring and
              job-seeking purposes. Users agree to use the Platform responsibly
              and in compliance with applicable laws and regulations.
            </p>

            <p>Users agree that they will:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Use the Platform only for legitimate recruitment or job search</li>
              <li>Maintain the confidentiality of account credentials</li>
              <li>Comply with all applicable laws and platform policies</li>
            </ul>

            <p>Users must not:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Post fake, misleading, or fraudulent job listings</li>
              <li>Impersonate any person or organization</li>
              <li>Misuse the Platform for spam, scraping, or data harvesting</li>
              <li>Attempt unauthorized access or disrupt Platform operations</li>
            </ul>

            <p>
              Jobito reserves the right to suspend or terminate accounts that
              violate these usage rules.
            </p>
          </div>
        </section>

        {/* 2. Plan Limitations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            2. Plan Limitations
          </h2>

          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Jobito offers multiple subscription plans with defined features and
              usage limits. These limits vary based on the selected plan.
            </p>

            <p>Plan limitations may include:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Number of active job postings</li>
              <li>Duration of job visibility</li>
              <li>Access to AI validation and premium features</li>
              <li>Candidate search or outreach limits</li>
            </ul>

            <p>
              Users acknowledge that unused features or credits may not roll
              over unless explicitly stated. Attempting to bypass plan
              limitations may result in account restrictions.
            </p>

            <p>
              Jobito reserves the right to modify plan features, limits, or
              pricing with reasonable notice.
            </p>
          </div>
        </section>

        {/* 3. Job Lifecycle Rules */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            3. Job Lifecycle Rules
          </h2>

          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              All job postings on Jobito follow a defined lifecycle to ensure
              relevance, quality, and platform integrity.
            </p>

            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Submission:</strong> Employers submit job details for
                review and validation.
              </li>
              <li>
                <strong>Approval & Activation:</strong> Approved jobs become
                visible on the Platform.
              </li>
              <li>
                <strong>Active Period:</strong> Jobs remain live based on the
                employer’s plan duration.
              </li>
              <li>
                <strong>Expiration or Closure:</strong> Jobs expire
                automatically or may be closed manually.
              </li>
              <li>
                <strong>Archival or Removal:</strong> Expired jobs may be
                archived or removed.
              </li>
            </ol>

            <p>
              Jobito reserves the right to reject, remove, or modify job listings
              that violate Platform policies or fail validation checks.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}