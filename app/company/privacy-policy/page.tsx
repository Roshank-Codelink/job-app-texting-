"use client";

import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 border-b pb-4">
          Privacy Policy 
        </h1>

        {/* Introduction */}
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-slate-600 mb-12">
          <p>
            This Privacy Policy ("<strong>Privacy Policy</strong>") applies to your
            use of the Jobito website and services ("<strong>Platform</strong>"),
            owned and operated by Jobito Technologies Private Limited ("Jobito",
            "we", "us", or "our"), a company incorporated under the laws of India.
          </p>

          <p>
            This Privacy Policy describes how we collect, use, store, process,
            and protect your Personal Data when you access or use our Platform.
            By accessing or using Jobito, you agree to the terms of this Privacy
            Policy.
          </p>

          <p>
            This Privacy Policy should be read together with our Terms and
            Conditions. Capitalized terms not defined herein shall have the
            meaning assigned to them in the Terms and Conditions.
          </p>

          <p className="font-bold text-slate-900 uppercase text-sm tracking-wide">
            BY USING THE PLATFORM, YOU EXPRESSLY CONSENT TO THE COLLECTION AND USE
            OF YOUR PERSONAL DATA AS DESCRIBED IN THIS PRIVACY POLICY.
          </p>
        </div>

        {/* 1. Objective & Scope */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            1. Objective & Scope
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Jobito is committed to protecting user privacy. This Privacy Policy
            applies to all users of the Platform and covers the collection,
            processing, storage, and disclosure of Personal Data in accordance
            with applicable data protection laws.
          </p>
        </section>

        {/* 2. Data Collected */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            2. Data Collected
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Personal Data includes information that identifies or can be used
              to identify an individual, either directly or indirectly.
            </p>

            <ul className="list-decimal pl-6 space-y-3">
              <li>
                Information provided during registration such as name, email
                address, phone number, location, and profile details.
              </li>
              <li>
                Information submitted while using the Platform, including job
                applications, resumes, messages, and uploads.
              </li>
              <li>
                Automatically collected data such as IP address, browser type,
                device information, cookies, usage logs, and interaction data.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Method of Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            3. Method and Manner of Use of Personal Data
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We use the Personal Data we collect for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-slate-600 leading-relaxed">
            <li>
              To provide and improve our Platform and Services, including matching candidates with potential employers and vice versa.
            </li>
            <li>
              To verify your identity and ensure the security of our Platform.
            </li>
            <li>
              To communicate with you regarding your account, job applications, or platform updates.
            </li>
            <li>
              To analyze usage trends and enhance user experience through personalized recommendations.
            </li>
            <li>
              To comply with legal obligations and enforce our Terms and Conditions.
            </li>
          </ul>
        </section>

        {/* 4. Access & Update */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            4. Access and Updation of Personal Data
          </h2>
          <p className="text-slate-600 leading-relaxed">
            You have the right to access, review, and update your Personal Data at any time by logging into your account settings on the Platform. 
            If you wish to delete your account or request the removal of specific data, please contact our support team. 
            Please note that we may retain certain information as required by law or for legitimate business purposes.
          </p>
        </section>

        {/* 5. Sharing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            5. Sharing of Data
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Jobito respects your privacy and does not sell your Personal Data to third parties. However, we may share your data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-slate-600 leading-relaxed">
            <li>
              With potential employers or candidates as part of the job application process.
            </li>
            <li>
              With third-party service providers who assist us in operating the Platform (e.g., cloud hosting, payment processing, analytics).
            </li>
            <li>
              With law enforcement or regulatory authorities if required by applicable law or legal process.
            </li>
            <li>
              In the event of a merger, acquisition, or sale of assets, where user data may be transferred as part of the transaction.
            </li>
          </ul>
        </section>

        {/* 6. Retention */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            6. Data Retention and Erasure
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We retain your Personal Data for as long as your account is active or as needed to provide you with our Services. 
            We may also retain and use your information to comply with our legal obligations, resolve disputes, and enforce our agreements. 
            If you wish to request the erasure of your data, please contact us at support@jobito.com.
          </p>
        </section>

        {/* 7. Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            7. Data Security
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Jobito employs industry-standard security measures, including encryption, firewalls, and secure socket layer (SSL) technology, to protect your Personal Data from unauthorized access, alteration, disclosure, or destruction. 
            However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
          </p>
        </section>

        {/* 8. Children */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            8. Children’s Data
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Our Platform is not intended for use by individuals under the age of 18. We do not knowingly collect Personal Data from children. 
            If we become aware that we have collected Personal Data from a child under 18, we will take steps to delete such information from our records.
          </p>
        </section>

        {/* 9. Updates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            9. Privacy Policy Updates
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
            We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. 
            We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        {/* 10. Cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            10. Cookie Policy
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Jobito uses cookies and similar tracking technologies to enhance your experience on our Platform. 
            Cookies help us remember your preferences, analyze site traffic, and deliver personalized content. 
            You can control the use of cookies through your browser settings, but please note that disabling cookies may limit your use of certain features.
          </p>
        </section>

        {/* 11. AI */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            11. Use of Artificial Intelligence (AI)
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Jobito leverages advanced Artificial Intelligence (AI) and Machine Learning (ML) algorithms to improve the job matching process. 
            Our AI analyzes job descriptions and candidate profiles to provide relevant recommendations. 
            However, all final hiring decisions are made by the employers, and Jobito does not use AI to make automated decisions that significantly affect users without human intervention.
          </p>
        </section>

        {/* 12. Platform Usage */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            12. Platform Usage
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Users agree to use the Platform exclusively for lawful purposes related to job searching and recruitment. 
            Prohibited activities include posting fake jobs, spamming, scraping data, or uploading malicious content. 
            Jobito reserves the right to suspend or terminate accounts found in violation of these usage policies without prior notice.
          </p>
        </section>

        {/* 13. Plan Limitations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            13. Plan Limitations
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Access to certain features on Jobito is determined by your subscription plan. 
            Free accounts may have limits on the number of active job postings, candidate profile views, or direct messages. 
            Premium plans offer extended capabilities as detailed on our pricing page. 
            We reserve the right to modify plan features and limitations at any time.
          </p>
        </section>

        {/* 14. Job Lifecycle Rules */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            14. Job Lifecycle Rules
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Each job posting on Jobito remains active for a standard duration of 30 days. 
            Employers may choose to renew or repost jobs upon expiration. 
            Expired jobs are automatically moved to the archive and are no longer visible to candidates in search results. 
            Jobito may also remove job postings that remain inactive or unverified for extended periods to ensure platform quality.
          </p>
        </section>

        {/* 15. Contact */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            15. Contact Us
          </h2>
          <p className="text-slate-600 leading-relaxed">
            For questions regarding this Privacy Policy, contact us at:
          </p>
          <p className="font-semibold text-slate-900 mt-2">
            support@jobito.com
          </p>
        </section>

      </div>
    </div>
  );
}